import { ISales } from '../../database/models/SalesInterface';
import { prisma } from '../../database/prisma';
import { crudService } from './prismaHelpers/CRUD';

export const generateSaleNumber = async (
  status?: string
): Promise<String | Error> => {
  let order = '';

  if (status === 'Orçamento') {
    order = 'ORÇ';
  } else if (status === 'Pedido') {
    order = 'PED';
  } else {
    order = 'N/A';
  }

  try {
    const number = await prisma.sales.count();
    const saleNumber = order + '-' + (number + 1).toString().padStart(6, '0');

    return saleNumber;
  } catch (error) {
    return new Error('Generated sale number error');
  }
};

export const updateSaleNumber = async (id: string) => {
  console.log(id);
  const getSale: ISales | Error = await crudService.getInDatabase(
    { id },
    'Sales',
    'Sale not found'
  );

  if (getSale instanceof Error) {
    return new Error(getSale.message);
  }

  const { saleNumber } = getSale;

  const variavelTemporaria = 'Orçamento';

  const status = variavelTemporaria;
  let updatedSaleNumber;

  if (status === 'Orçamento') {
    updatedSaleNumber = 'ORÇ' + saleNumber?.toString().slice(3);
  } else if (status === 'Pedido') {
    updatedSaleNumber = 'PED' + saleNumber?.toString().slice(3);
  } else {
    updatedSaleNumber = 'N/A' + saleNumber?.toString().slice(3);
  }

  return updatedSaleNumber;
};
