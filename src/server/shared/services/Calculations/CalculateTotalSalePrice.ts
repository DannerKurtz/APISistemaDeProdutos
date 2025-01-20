// Necessary imports
import { prisma } from '../../../database/prisma';
import { IProductSaleRelations } from '../../../database/models/ProductSaleRelationsInterface';
import { ISalesWithoutId } from '../../../database/models/SalesInterface';

// Exporting the function that calculates the total sale price
export const calculateTotalSalePrice = async (
  data: ISalesWithoutId,
  productSaleRelations: IProductSaleRelations[]
) => {
  // Definition of the variable that will store the products' prices
  let priceOfProducts: number = 0;

  // Iterates through the productSaleRelations array
  for (let i = 0; i < productSaleRelations.length; i++) {
    // Calls prisma to find the product based on the current index in the array
    const getProductPrice = await prisma.products.findUnique({
      where: { id: productSaleRelations[i].productId },
    });

    // Multiplies the product's price by its quantity and adds it to the variable
    priceOfProducts +=
      (getProductPrice?.price as number) * productSaleRelations[i].quantity;
  }

  // Checks if data.discount exists and data.totalPrice does not
  // Calculates the final price based on the applied discount
  if (data.discount && !data.totalPrice) {
    const finalPrice =
      priceOfProducts - priceOfProducts * (data.discount / 100);

    data.totalPrice = parseFloat(finalPrice.toFixed(2));
  }
  // Checks if data.totalPrice exists and data.discount does not
  // Calculates the discount based on the suggested price
  else if (data.totalPrice && !data.discount) {
    const finalDiscount =
      ((priceOfProducts - data.totalPrice) / priceOfProducts) * 100;
    if (finalDiscount < 0) {
      data.discount = 0;
    }
    data.discount = parseFloat(finalDiscount.toFixed(2));
  }
  // If neither data.totalPrice nor data.discount exists,
  // it only returns the final price without discounts
  else {
    data.totalPrice = parseFloat(priceOfProducts.toFixed(2));
    data.discount = 0;
  }

  // Returns data with the total price and discount
  return data;
};
