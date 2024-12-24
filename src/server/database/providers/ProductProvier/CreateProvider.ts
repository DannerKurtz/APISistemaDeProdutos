import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { relationCreator } from '../../../shared/services/relationsManager/RelationCreator';
import { IProducts, IProductsWithoutId } from '../../models/ProductsInterface';
import {
  IRawMaterialProductRelations,
  IRawMaterialProductRelationsWithoutId,
} from '../../models/RawMaterialProductRelationsInterface';
import { IRawMaterials } from '../../models/RawMaterialsInterface';

export const create = async (
  data: IProductsWithoutId
): Promise<IProducts | Error> => {
  try {
    const { rawMaterialProductRelation, ...productWithoutRawMaterial } = data;
    const listProductRawMaterialRelations: string[] = [];
    const newProduct: IProducts | Error = await crudService.createInDatabase(
      productWithoutRawMaterial,
      'Products',
      errorsCrudService.createMessage('Products')
    );
    if (newProduct instanceof Error) return new Error(newProduct.message);
    if (rawMaterialProductRelation instanceof Array) {
      for (let i = 0; i < rawMaterialProductRelation.length; i++) {
        const createProductRawMaterialRelations = await relationCreator(
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

        if (createProductRawMaterialRelations instanceof Error)
          return new Error(createProductRawMaterialRelations.message);
        listProductRawMaterialRelations.push(createProductRawMaterialRelations);
      }
    }
    const createdNewProduct = {
      ...newProduct,
      listProductRawMaterialRelations,
    };

    return createdNewProduct;
  } catch (error) {
    return new Error(errorsProvider.createMessage('Products'));
  }
};
