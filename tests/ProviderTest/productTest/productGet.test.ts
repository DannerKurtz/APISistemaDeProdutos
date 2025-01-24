import { productProvider } from '../../../src/server/database/providers/ProductProvier';
import { errorsCrudService } from '../../../src/server/shared/services/messageErrors';
import { crudService } from '../../../src/server/shared/services/prismaHelpers/CRUD';
import { relationsGet } from '../../../src/server/shared/services/prismaHelpers/relationsManager/RelationsGet';

jest.mock('../../../src/server/shared/services/prismaHelpers/CRUD', () => ({
  crudService: {
    getInDatabase: jest.fn(),
  },
}));

jest.mock(
  '../../../src/server/shared/services/prismaHelpers/relationsManager/RelationsGet',
  () => ({
    relationsGet: jest.fn(),
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

const dataExemple = [
  {
    id: '654321',
    name: 'Exemple',
    percentage: 70,
    price: 170,
    quantity: 1,
    weight: 10,
    rawMaterialProductRelation: [
      {
        id: '123456',
        productId: '654321',
        rawMaterialId: '456123',
        rawMaterialQuantity: 130,
      },
    ],
  },
  {
    id: '654322',
    name: 'Exemple 2',
    percentage: 70,
    price: 170,
    quantity: 1,
    weight: 10,
    rawMaterialProductRelation: [
      {
        id: '123456',
        productId: '654321',
        rawMaterialId: '456123',
        rawMaterialQuantity: 130,
      },
      {
        id: '123457',
        productId: '654321',
        rawMaterialId: '456123',
        rawMaterialQuantity: 130,
      },
    ],
  },
];

describe('Create Product Provider', () => {
  test('Test 1 -> successful', async () => {
    const query = {
      id: '654322',
      nome: undefined,
    };
    const { rawMaterialProductRelation, ...data } = dataExemple[1];
    (crudService.getInDatabase as jest.Mock).mockResolvedValue([
      dataExemple[1],
    ]);
    (relationsGet as jest.Mock).mockResolvedValue(rawMaterialProductRelation);

    const result = await productProvider.get(query);

    expect(result).toEqual([dataExemple[1]]);
    expect(crudService.getInDatabase).toHaveBeenCalledTimes(1);
    expect(relationsGet).toHaveBeenCalledTimes(1);
  });

  test('Test 2 -> failed', async () => {
    const query = {
      id: '654322',
      nome: undefined,
    };
    const { rawMaterialProductRelation, ...data } = dataExemple[0];
    (crudService.getInDatabase as jest.Mock).mockResolvedValue(
      Error(errorsCrudService.getMessage('Products'))
    );
    (relationsGet as jest.Mock).mockResolvedValue(rawMaterialProductRelation);

    const result = await productProvider.get(query);

    expect(result).toEqual(Error(errorsCrudService.getMessage('Products')));
    expect(crudService.getInDatabase).toHaveBeenCalledTimes(1);
    expect(relationsGet).toHaveBeenCalledTimes(0);
  });
});
