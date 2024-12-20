// no complete


// import { crudService } from '../CRUD';
// import { errorsCrudService, errorsProvider } from '../messageErrors';

// type TWithoutID<T> = Omit<T, 'id'>;

// export const relationCreator = async <T>(
//   itens: T,
//   secondItemId: string,
//   relations: T[],
//   objectRelation: TWithoutID<T>,
//   itemId: string,
//   relationItemId: string,
//   relationQuantity: number,
//   relationDatabaseName: string,
//   itemSecondaryDatabaseName: string
// ) => {

//   const createAllRelations: string[];

//   for (let i = 0; i < relations.length; i++) {
//     const createRelationInDatabase: T | Error =
//       await crudService.createInDatabase(
//         objectRelation,
//         relationDatabaseName,
//         errorsCrudService.createMessage(relationDatabaseName)
//       );

//     if (createRelationInDatabase instanceof Error)
//       return new Error(createRelationInDatabase.message);

//     const getItemSecondary = await crudService.getInDatabase(
//       {id: relations[i][secondItemId]}, 
//       itemSecondaryDatabaseName, 
//       errorsCrudService.getMessage(itemSecondaryDatabaseName)
//     )

//     getItemSecondary.quantity -= relations[i].quantity;

//     const {id, ...data} = getItemSecondary;

//     const updateQuantitySecondaryItem = await crudService.updateInDatabase(id, data, itemSecondaryDatabaseName, errorsCrudService.updateMessage(itemSecondaryDatabaseName))

//     if(updateQuantitySecondaryItem instanceof Error) return new Error(updateQuantitySecondaryItem.message)

//       createAllRelations.push(createRelationInDatabase.id)
//   }
// };
