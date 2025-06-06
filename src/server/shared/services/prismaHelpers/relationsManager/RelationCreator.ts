// Necessary imports
import { crudService } from '../CRUD';
import { errorsCrudService } from '../../messageErrors';

// Definition of generic types omitting the id and relations
type TWithoutID<T> = Omit<T, 'id'> & {
  productId?: string;
  saleId?: string;
  rawMaterialId?: string;
  color?: string;
  customEngraving?: string;
  productNote?: string;
};
type Relations<T> = Partial<{
  rawMaterialQuantity?: number;
  quantity?: number;
  productId?: string;
  saleId?: string;
  rawMaterialId?: string;
}>;

// Exports the function responsible for creating relations in the database
export const relationCreator = async <
  T extends { id?: string; rawMaterialQuantity?: number; quantity?: number }
>(
  relations: Relations<T>,
  objDataRelation: TWithoutID<T>,
  objNameRelation: string,
  itemName: string
) => {
  // Calls the crudService to create the relation
  const createInDatabaseRelations: T | Error =
    await crudService.createInDatabase(
      objDataRelation,
      objNameRelation,
      errorsCrudService.createMessage(objNameRelation)
    );
  // Validates if it is an error, and returns the error message
  if (createInDatabaseRelations instanceof Error)
    return new Error(createInDatabaseRelations.message);

  // Retrieves the items, which could return either raw material or product, validates if it's an error, and returns it
  const getItem: T | Error = await crudService.getInDatabase(
    {
      id: relations.rawMaterialId || relations.productId,
    },
    itemName,
    errorsCrudService.getMessage(itemName)
  );
  if (getItem instanceof Error) return new Error(getItem.message);

  // Defines the relation id variable and returns it
  const createAllRelations: string = createInDatabaseRelations.id as string;
  return createAllRelations;
};
