import { IRawMaterialProductRelations } from '../../../database/models/RawMaterialProductRelationsInterface';
import { calculateProductPrice } from './CalculateProductPrice';

export const FinalProductPriceCalculator = async (
  rawMaterialProductRelation: IRawMaterialProductRelations[],
  profitMargin?: number
) => {
  const sumAllRawMaterialValue = await calculateProductPrice(
    rawMaterialProductRelation
  );

  if (sumAllRawMaterialValue instanceof Error)
    return new Error(sumAllRawMaterialValue.message);

  if (profitMargin === undefined) {
    const finalPrice = sumAllRawMaterialValue * 1.7;
    return finalPrice;
  }

  const finalPrice = sumAllRawMaterialValue * (1 + profitMargin / 100);

  return finalPrice;
};
