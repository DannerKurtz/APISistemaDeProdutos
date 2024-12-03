import { crudService } from '../../../shared/services/CRUD';
import { relation } from '../../../shared/services/CRUD/createRelation';
import { ProductModel } from '../../models/ProductModel';
import { RawMaterialAndProductsRelationModel } from '../../models/RawMaterialAndProductsRelationModel';
import { prisma } from '../../prisma';

type BodyWithoutId = Omit<ProductModel, 'id'> & {
  materiaPrima: [{ id: string; quantidade: number }];
  senha: undefined;
  novaSenha: undefined;
};

export const update = async (id: string, body: BodyWithoutId) => {
  const { materiaPrima, ...data } = body;
  const product: ProductModel = await crudService.updateInDatabase(
    id,
    data,
    'Produtos',
    'Erro ao atualizar o produto'
  );

  const deleteRelation = await prisma.relacaoMateriaPrimaEProdutos.deleteMany({
    where: { produtoId: id },
  });

  if (!deleteRelation) return new Error('não foi possível deletar');

  const newRelation = await relation(materiaPrima, id);

  if (newRelation instanceof Error)
    return new Error('Erro ao atualizar a nova relação');

  const newData = { ...product, materiaPrima };

  return newData;
};
