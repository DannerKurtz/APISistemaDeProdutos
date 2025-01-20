// Necessary imports
import { crudService } from '../CRUD';
import { errorsCrudService } from '../../messageErrors';

// Exports the function responsible for deleting the relations
export const relationDelete = async (id: string, modelName: string) => {
  // Calls the crud service to delete the relations
  const deletedRelations = await crudService.deleteInDatabase(
    id,
    modelName,
    errorsCrudService.deleteMessage(modelName)
  );

  // Validates if it's an error, and returns the message
  if (deletedRelations instanceof Error) {
    return new Error(deletedRelations.message);
  }

  // Returns if the relation was deleted
  return deletedRelations;
};
