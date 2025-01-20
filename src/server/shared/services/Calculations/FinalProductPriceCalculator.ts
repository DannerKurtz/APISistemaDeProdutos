// Necessary imports
import { IRawMaterialProductRelations } from '../../../database/models/RawMaterialProductRelationsInterface';
import { calculateProductPrice } from './CalculateProductPrice';

// Exporting the function responsible for calculating the product's final price
export const FinalProductPriceCalculator = async (
  rawMaterialProductRelation: IRawMaterialProductRelations[],
  profitMargin?: number
): Promise<{ finalPrice: number; finalWeight: number } | Error> => {
  // Calls the function that calculates the total price and weight of the products
  const sumRawMaterialMetrics = await calculateProductPrice(
    rawMaterialProductRelation
  );

  // Checks if an error occurred and displays the error message
  if (sumRawMaterialMetrics instanceof Error)
    return new Error(sumRawMaterialMetrics.message);

  // If no profit margin is provided, sets it to 70% by default and returns the result
  if (profitMargin === undefined) {
    const finalPrice = sumRawMaterialMetrics.sumRawMaterialsValue * 1.7;
    const result = {
      finalPrice,
      finalWeight: sumRawMaterialMetrics.finalWeight,
    };
    return result;
  }

  // Calculates the final price as the total price multiplied by the profit margin (percentage / 100 + 1)
  const finalPrice =
    sumRawMaterialMetrics.sumRawMaterialsValue * (1 + profitMargin / 100);

  // Combines the final weight and the calculated final price with the profit margin, then returns the result
  const result = {
    finalPrice,
    finalWeight: sumRawMaterialMetrics.finalWeight,
  };
  return result;
};
