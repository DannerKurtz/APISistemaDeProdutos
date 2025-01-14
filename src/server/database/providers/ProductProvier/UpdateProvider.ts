import { FinalProductPriceCalculator } from '../../../shared/services/Calculations/FinalProductPriceCalculator';
import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { updateRelations } from '../../../shared/services/relationsManager/RelationUpdate';
import { IProducts, IProductsWithoutId } from '../../models/ProductsInterface';
import { IRawMaterialProductRelations } from '../../models/RawMaterialProductRelationsInterface';

export const update = async (
  id: string,
  body: IProductsWithoutId
): Promise<IProducts | Error> => {
  try {
    console.log('Data recebido no Body: ', body);
    const { rawMaterialProductRelation, ...data }: IProductsWithoutId = body;

    const productUpdate: IProducts | Error = await crudService.updateInDatabase(
      id,
      data,
      'Products',
      errorsCrudService.updateMessage('Products')
    );

    console.log('Resultado de updateInDatabase: ', productUpdate);

    if (productUpdate instanceof Error) {
      console.log('Erro ao atualizar produto: ', productUpdate.message);
      return new Error(productUpdate.message);
    }
    if (!rawMaterialProductRelation) {
      console.log(
        'Sem relação de matéria-prima, retornando produto atualizado.'
      );
      return productUpdate;
    }

    const rawMaterialProductRelationList: IRawMaterialProductRelations[] =
      await updateRelations<IRawMaterialProductRelations>(
        'rawMaterialProductRelations',
        { productId: productUpdate.id },
        rawMaterialProductRelation
      );

    console.log(
      'Relações de matéria-prima atualizadas:',
      rawMaterialProductRelationList
    );

    productUpdate.rawMaterialProductRelation = rawMaterialProductRelationList;

    console.log(
      'Relação de matéria-prima no produto atualizado:',
      productUpdate.rawMaterialProductRelation
    );

    if (productUpdate.rawMaterialProductRelation) {
      const calculateRawMaterialTotals = await FinalProductPriceCalculator(
        productUpdate.rawMaterialProductRelation
      );

      console.log(
        'Resultado do cálculo de preço e peso:',
        calculateRawMaterialTotals
      );

      if (calculateRawMaterialTotals instanceof Error) {
        console.error(
          'Erro no cálculo do preço:',
          calculateRawMaterialTotals.message
        );
        return new Error(calculateRawMaterialTotals.message);
      }

      productUpdate.price = calculateRawMaterialTotals.finalPrice;
      productUpdate.weight = calculateRawMaterialTotals.finalWeight;
    }

    console.log('Produto final atualizado:', productUpdate);
    return productUpdate;
  } catch (error) {
    console.error('Erro desconhecido no update:', error);
    return new Error(errorsProvider.updateMessage('Products'));
  }
};
