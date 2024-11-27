import { crudService } from '../../../shared/services/CRUD';
import { ProductModel } from '../../models/ProductModel';
import { RawMaterialAndProductsRelationModel } from '../../models/RawMaterialAndProductsRelationModel';

type BodyWithoutId = Omit<ProductModel, 'id'> & {
  materiaPrima: [RawMaterialAndProductsRelationModel & { senha: undefined }];
  senha: undefined;
  novaSenha: undefined;
};

export const update = async (id: string, body: BodyWithoutId) => {
  const { materiaPrima, ...data } = body;
  const newRelation: [] = [];
  const product: ProductModel = await crudService.updateInDatabase(
    id,
    data,
    'Produtos',
    'Erro ao atualizar o produto'
  );
  const length = materiaPrima.length;
  for (let index = 0; index < length; index++) {
    const { id, ...dataRelation } = materiaPrima[index];

    newRelation.push = await crudService.updateInDatabase(
      id,
      dataRelation,
      'RelacaoMateriaPrimaEProdutos',
      'Erro ao alterar a Relação'
    );
  }

  const newData = { ...product, ...newRelation };

  return newData;
};
