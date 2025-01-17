// Necessary import
import { crudService } from '../../../shared/services/CRUD';
import { errorsCrudService } from '../../../shared/services/messageErrors';
import { relationsGet } from '../../../shared/services/relationsManager/RelationsGet';
import { IProducts } from '../../models/ProductsInterface';

// Declaration of the query interface
interface IQuery {
  id?: string;
  nome?: string | object;
}

// Exporting the function that fetches the products
export const get = async (query: IQuery): Promise<IProducts[] | Error> => {
  try {
    // Calling the crudService function responsible for querying the database
    const getProduct: IProducts[] | Error = await crudService.getInDatabase(
      query,
      'Products',
      errorsCrudService.getMessage('Products')
    );

    // Checks and returns if it's an error
    if (getProduct instanceof Error) {
      return new Error(getProduct.message);
    }

    // Iterates through the product array and adds the raw materials
    for (let i = 0; i < getProduct.length; i++) {
      getProduct[i].rawMaterials = await relationsGet(
        'rawMaterialProductRelations',
        {
          where: { productId: getProduct[i].id },
          include: { rawMaterial: true },
        }
      );
    }

    // Returns the fetched products
    return getProduct;
  } catch (error) {
    console.error(error);
    // Returns the error if an exception occurs
    return new Error('Erro ao consultar a base de dados de produtos');
  }
};
