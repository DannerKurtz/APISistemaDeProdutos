import { calculateProductPrice } from '../../../shared/services/Calculations/CalculateProductPrice';
import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { relationCreator } from '../../../shared/services/relationsManager/RelationCreator';
import { IProducts, IProductsWithoutId } from '../../models/ProductsInterface';
import { IRawMaterialProductRelations } from '../../models/RawMaterialProductRelationsInterface';
import { prisma } from '../../prisma';

export const create = async (
  data: IProductsWithoutId
): Promise<IProducts | Error> => {
  try {
    const { rawMaterialProductRelation, ...productWithoutRawMaterial } = data;
    const listProductRawMaterialRelations: IRawMaterialProductRelations[] = [];
    const newProduct: IProducts | Error = await crudService.createInDatabase(
      productWithoutRawMaterial,
      'Products',
      errorsCrudService.createMessage('Products')
    );
    if (newProduct instanceof Error) return new Error(newProduct.message);
    console.log(newProduct);

    if (rawMaterialProductRelation instanceof Array) {
      for (let i = 0; i < rawMaterialProductRelation.length; i++) {
        console.log('entrou no loop', [i]);

        const createProductRawMaterialRelation = await relationCreator(
          rawMaterialProductRelation[i],
          {
            productId: newProduct.id as string,
            rawMaterialId: rawMaterialProductRelation[i].rawMaterialId,
            rawMaterialQuantity:
              rawMaterialProductRelation[i].rawMaterialQuantity,
          },
          'RawMaterialProductRelations',
          'RawMaterials'
        );

        if (createProductRawMaterialRelation instanceof Error)
          return new Error(createProductRawMaterialRelation.message);

        const getRawMaterialProductRelation =
          await prisma.rawMaterialProductRelations.findFirst({
            where: {
              rawMaterialId: rawMaterialProductRelation[i].rawMaterialId,
              productId: newProduct.id,
            },
          });

        listProductRawMaterialRelations.push(
          getRawMaterialProductRelation as IRawMaterialProductRelations
        );
      }
    }
    const createdNewProduct: IProducts = {
      ...newProduct,
      rawMaterialProductRelation: listProductRawMaterialRelations,
    };

    if (createdNewProduct.rawMaterialProductRelation) {
      const calcPrice = await calculateProductPrice(
        createdNewProduct.rawMaterialProductRelation
      );

      if (calcPrice instanceof Error) return new Error(calcPrice.message);

      createdNewProduct.price = calcPrice;
    }

    return createdNewProduct;
  } catch (error) {
    return new Error(errorsProvider.createMessage('Products'));
  }
};
