import { IRawMaterialProductRelations } from '../../../src/server/database/models/RawMaterialProductRelationsInterface';
import { prisma } from '../../../src/server/database/prisma';
import { productProvider } from '../../../src/server/database/providers/ProductProvier';
import { errorsCrudService } from '../../../src/server/shared/services/messageErrors';
import { crudService } from '../../../src/server/shared/services/prismaHelpers/CRUD';
import { relationDelete } from '../../../src/server/shared/services/prismaHelpers/relationsManager/RelationDelete';

jest.mock('../../../src/server/database/prisma', () => ({
  prisma: {
    rawMaterialProductRelations: {
      findMany: jest.fn(),
    },
  },
}));

jest.mock(
  '../../../src/server/shared/services/prismaHelpers/relationsManager/RelationDelete',
  () => ({
    relationDelete: jest.fn(),
  })
);

jest.mock('../../../src/server/shared/services/prismaHelpers/CRUD', () => ({
  crudService: {
    deleteInDatabase: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const rawMaterialProductRelationExemple: IRawMaterialProductRelations[] = [
  {
    id: '123456',
    productId: '654321',
    rawMaterialId: '456123',
    rawMaterialQuantity: 130,
  },
];

describe('Create Product Provider', () => {
  test('Test 1 -> successful', async () => {
    const id = '123';

    (
      prisma.rawMaterialProductRelations.findMany as jest.Mock
    ).mockResolvedValue(rawMaterialProductRelationExemple);
    (relationDelete as jest.Mock).mockResolvedValue(true);
    (crudService.deleteInDatabase as jest.Mock).mockResolvedValue(true);

    const result = await productProvider.deleteProduct(id);

    expect(result).toEqual(true);
    expect(prisma.rawMaterialProductRelations.findMany).toHaveBeenCalledTimes(
      1
    );
    expect(crudService.deleteInDatabase).toHaveBeenCalledTimes(1);
  });

  test('Test 2 -> failed', async () => {
    const id = '123';

    (
      prisma.rawMaterialProductRelations.findMany as jest.Mock
    ).mockResolvedValue(rawMaterialProductRelationExemple);
    (relationDelete as jest.Mock).mockResolvedValue(true);
    (crudService.deleteInDatabase as jest.Mock).mockResolvedValue(
      Error(errorsCrudService.deleteMessage('Products'))
    );

    const result = await productProvider.deleteProduct(id);

    expect(result).toEqual(Error(errorsCrudService.deleteMessage('Products')));
    expect(prisma.rawMaterialProductRelations.findMany).toHaveBeenCalledTimes(
      1
    );
    expect(crudService.deleteInDatabase).toHaveBeenCalledTimes(1);
  });
});
