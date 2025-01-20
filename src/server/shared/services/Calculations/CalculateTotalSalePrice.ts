import { IProductSaleRelations } from '../../../database/models/ProductSaleRelationsInterface';
import { ISalesWithoutId } from '../../../database/models/SalesInterface';
import { prisma } from '../../../database/prisma';

export const calculateTotalSalePrice = async (
  data: ISalesWithoutId,
  productSaleRelations: IProductSaleRelations[]
) => {
  let priceOfProducts: number = 0;
  for (let i = 0; i < productSaleRelations.length; i++) {
    const getProductPrice = await prisma.products.findUnique({
      where: { id: productSaleRelations[i].productId },
    });
    console.log('produtos: ', getProductPrice);
    priceOfProducts +=
      (getProductPrice?.price as number) * productSaleRelations[i].quantity;
  }
  if (data.discount && !data.totalPrice) {
    console.log('entrou aqui');
    const finalPrice =
      priceOfProducts - priceOfProducts * (data.discount / 100);

    data.totalPrice = parseFloat(finalPrice.toFixed(2));
    console.log('preço total: ', data.totalPrice);
  } else if (data.totalPrice && !data.discount) {
    const finalDiscount =
      ((priceOfProducts - data.totalPrice) / priceOfProducts) * 100;
    if (finalDiscount < 0) {
      data.discount = 0;
    }
    data.discount = parseFloat(finalDiscount.toFixed(2));
  } else {
    data.totalPrice = parseFloat(priceOfProducts.toFixed(2));
    data.discount = 0;
  }
  return data;
};
