import { ISales } from '../../database/models/SalesInterface';
import { prisma } from '../../database/prisma';
import { crudService } from './prismaHelpers/CRUD';

export const generateSaleNumber = async (
  status?: string
): Promise<String | Error> => {
  let order = '';
  console.log(status);
  if (status === 'QUOTE' || !status) {
    order = 'ORÇ';
  } else if (status === 'ORDER') {
    order = 'PED';
  } else if (status === 'FINALIZED') {
    order = 'FIN';
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

export const updateSaleNumber = async (id: string, status: string) => {
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

  let updatedSaleNumber;

  if (status === 'QUOTE') {
    updatedSaleNumber = 'ORÇ' + saleNumber?.toString().slice(3);
  } else if (status === 'ORDER') {
    updatedSaleNumber = 'PED' + saleNumber?.toString().slice(3);
  } else if (status === 'FINALIZED') {
    updatedSaleNumber = 'FIN' + saleNumber?.toString().slice(3);
  } else {
    updatedSaleNumber = 'N/A' + saleNumber?.toString().slice(3);
  }

  return updatedSaleNumber;
};
