import { IRawMaterialProductRelations } from '../../../database/models/RawMaterialProductRelationsInterface';
import { calculateProductPrice } from './CalculateProductPrice';

export const FinalProductPriceCalculator = async (
  rawMaterialProductRelation: IRawMaterialProductRelations[],
  profitMargin?: number
): Promise<{ finalPrice: number; finalWeight: number } | Error> => {
  const sumRawMaterialMetrics = await calculateProductPrice(
    rawMaterialProductRelation
  );

  if (sumRawMaterialMetrics instanceof Error)
    return new Error(sumRawMaterialMetrics.message);

  if (profitMargin === undefined) {
    const finalPrice = sumRawMaterialMetrics.sumRawMaterialsValue * 1.7;
    const result = {
      finalPrice,
      finalWeight: sumRawMaterialMetrics.finalWeight,
    };
    return result;
  }

  const finalPrice =
    sumRawMaterialMetrics.sumRawMaterialsValue * (1 + profitMargin / 100);

  const result = {
    finalPrice,
    finalWeight: sumRawMaterialMetrics.finalWeight,
  };
  return result;
};
