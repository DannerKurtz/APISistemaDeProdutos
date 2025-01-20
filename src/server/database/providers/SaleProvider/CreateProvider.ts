import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { relationCreator } from '../../../shared/services/relationsManager/RelationCreator';
import { ISalesWithoutId, ISales } from '../../models/SalesInterface';
import { prisma } from '../../prisma';

export const create = async (
  data: ISalesWithoutId
): Promise<ISales | Error> => {
  try {
    const { userId, customerId } = data;
    const { productSaleRelations, ...newData } = data;
    const listSaleProductRelations: string[] = [];

    // nova função
    let priceOfProducts: number = 0;
    if (data.productSaleRelations) {
      for (let i = 0; i < data.productSaleRelations.length; i++) {
        const getProductPrice = await prisma.products.findUnique({
          where: { id: data.productSaleRelations[i].productId },
        });
        console.log('produtos: ', getProductPrice);
        priceOfProducts +=
          (getProductPrice?.price as number) *
          data.productSaleRelations[i].quantity;
      }
      if (data.discount && !data.totalPrice) {
        console.log('entrou aqui');
        const finalPrice =
          priceOfProducts - priceOfProducts * (data.discount / 100);

        data.totalPrice = finalPrice;
        console.log('preço total: ', data.totalPrice);
      } else if (data.totalPrice && !data.discount) {
        const finalDiscount =
          ((priceOfProducts - data.totalPrice) / priceOfProducts) * 100;
        if (finalDiscount < 0) {
          data.discount = 0;
        }
        data.discount = finalDiscount;
      } else {
        data.totalPrice = priceOfProducts;
        data.discount = 0;
      }
    }

    const validateUserIdExists = await crudService.getInDatabase(
      { id: userId, name: undefined },
      'Users',
      errorsCrudService.getMessage('Users')
    );
    const validateClientIdExists = await crudService.getInDatabase(
      { id: customerId, name: undefined },
      'Customers',
      errorsCrudService.getMessage('Customers')
    );

    if (validateUserIdExists === null) return new Error('User not exists');
    if (validateClientIdExists === null)
      return new Error('Customer not exists');

    const newSale: ISales | Error = await crudService.createInDatabase(
      newData,
      'Sales',
      errorsCrudService.createMessage('Sales')
    );

    if (newSale instanceof Error) return new Error(newSale.message);

    if (productSaleRelations) {
      for (let i = 0; i < productSaleRelations.length; i++) {
        const createSaleProductRelations = await relationCreator(
          productSaleRelations[i],
          {
            saleId: newSale.id as string,
            productId: productSaleRelations[i].productId,
            quantity: productSaleRelations[i].quantity,
          },
          'ProductSaleRelations',
          'Products'
        );

        if (createSaleProductRelations instanceof Error)
          return new Error(createSaleProductRelations.message);
        listSaleProductRelations.push(createSaleProductRelations);
      }
    }

    return newSale;
  } catch (error) {
    return new Error(errorsProvider.createMessage('Sales'));
  }
};
