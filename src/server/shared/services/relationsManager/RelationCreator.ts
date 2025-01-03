import { create } from 'domain';
import { crudService } from '../CRUD';
import { errorsCrudService, errorsProvider } from '../messageErrors';
import { error } from 'console';

type TWithoutID<T> = Omit<T, 'id'> & {
  productId?: string;
  saleId?: string;
  rawMaterialId?: string;
};
type Relations<T> = Partial<{
  rawMaterialQuantity?: number;
  quantity?: number;
  productId?: string;
  saleId?: string;
  rawMaterialId?: string;
}>;

export const relationCreator = async <
  T extends { id?: string; rawMaterialQuantity?: number; quantity?: number }
>(
  relations: Relations<T>,
  objDataRelation: TWithoutID<T>,
  objNameRelation: string,
  itemName: string
) => {
  const createInDatabaseRelations: T | Error =
    await crudService.createInDatabase(
      objDataRelation,
      objNameRelation,
      errorsCrudService.createMessage(objNameRelation)
    );

  if (createInDatabaseRelations instanceof Error)
    return new Error(createInDatabaseRelations.message);

  const getItem: T | Error = await crudService.getInDatabase(
    {
      id: relations.rawMaterialId || relations.productId,
    },
    itemName,
    errorsCrudService.getMessage(itemName)
  );

  if (getItem instanceof Error) return new Error(getItem.message);

  if (
    getItem.quantity !== undefined &&
    relations.rawMaterialQuantity !== undefined
  ) {
    (getItem.quantity as number) -= relations.rawMaterialQuantity as number;
  }

  if (getItem.quantity !== undefined && relations.quantity !== undefined) {
    (getItem.quantity as number) -= relations.quantity as number;
  }

  const { id, ...data } = getItem;

  const updateItem = await crudService.updateInDatabase(
    id as string,
    data,
    itemName,
    errorsCrudService.updateMessage(itemName)
  );

  if (updateItem instanceof Error) return new Error(updateItem.message);

  const createAllRelations: string = createInDatabaseRelations.id as string;

  return createAllRelations;
};
