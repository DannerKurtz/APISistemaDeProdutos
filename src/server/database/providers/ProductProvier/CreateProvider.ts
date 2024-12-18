import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
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
    const createProductRawMaterialRelations: string[] = [];
    const newProduct: IProducts | Error = await crudService.createInDatabase(
      productWithoutRawMaterial,
      'Products',
      errorsCrudService.createMessage('Products')
    );
    if (newProduct instanceof Error) return new Error(newProduct.message);
    if (rawMaterialProductRelation instanceof Array) {
      for (let i = 0; i < rawMaterialProductRelation.length; i++) {
        const createInDatabaseRelation: IRawMaterialProductRelations | Error =
          await crudService.createInDatabase(
            {
              productId: newProduct.id,
              rawMaterialId: rawMaterialProductRelation[i].rawMaterialId,
              rawMaterialQuantity:
                rawMaterialProductRelation[i].rawMaterialQuantity,
            } as IRawMaterialProductRelationsWithoutId,
            'RawMaterialProductRelations',
            errorsCrudService.createMessage('RawMaterialProductRelations')
          );

        if (createInDatabaseRelation instanceof Error)
          return new Error(
            errorsProvider.createMessage('RawMaterialProductRelations')
          );
        const getRawMaterials: IRawMaterials | Error =
          await crudService.getInDatabase(
            { id: rawMaterialProductRelation[i].rawMaterialId },
            'RawMaterials',
            errorsCrudService.getMessage('RawMaterials')
          );

        if (getRawMaterials instanceof Error)
          return new Error(errorsProvider.getMessage('RawMaterials'));

        getRawMaterials.quantity -=
          rawMaterialProductRelation[i].rawMaterialQuantity;
        const { id, ...data } = getRawMaterials;
        const updateQuantityRawMaterial = await crudService.updateInDatabase(
          id,
          data,
          'RawMaterials',
          errorsCrudService.updateMessage('RawMaterials')
        );

        if (updateQuantityRawMaterial instanceof Error)
          return new Error(errorsProvider.updateMessage('RawMaterials'));

        createProductRawMaterialRelations.push(createInDatabaseRelation.id);
      }
    }
    const createdNewProduct = {
      ...newProduct,
      createProductRawMaterialRelations,
    };

    return createdNewProduct;
  } catch (error) {
    return new Error(errorsProvider.createMessage('Products'));
  }
};
