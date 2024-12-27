import { crudService } from '../CRUD';
import { errorsCrudService } from '../messageErrors';

export const relationDelete = async (id: string, modelName: string) => {
  const deletedRelations = await crudService.deleteInDatabase(
    id,
    modelName,
    errorsCrudService.deleteMessage(modelName)
  );
  if (deletedRelations instanceof Error) {
    return new Error(deletedRelations.message);
  }
  return deletedRelations;
};
