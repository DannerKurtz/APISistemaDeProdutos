import { productProvider } from '../../../src/server/database/providers/ProductProvier';
import { FinalProductPriceCalculator } from '../../../src/server/shared/services/Calculations/FinalProductPriceCalculator';
import { errorsCrudService } from '../../../src/server/shared/services/messageErrors';
import { crudService } from '../../../src/server/shared/services/prismaHelpers/CRUD';
import { updateRelations } from '../../../src/server/shared/services/prismaHelpers/relationsManager/RelationUpdate';

jest.mock(
  '../../../src/server/shared/services/Calculations/FinalProductPriceCalculator',
  () => ({
    FinalProductPriceCalculator: jest.fn(),
  })
);

jest.mock('../../../src/server/shared/services/prismaHelpers/CRUD', () => ({
  crudService: {
    updateInDatabase: jest.fn(),
  },
}));

jest.mock(
  '../../../src/server/shared/services/prismaHelpers/relationsManager/RelationUpdate',
  () => ({
    updateRelations: jest.fn(),
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

const dataExemple = {
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
};

describe('Create Product Provider', () => {
  test('Test 1 -> successful', async () => {
    const { rawMaterialProductRelation, ...product } = dataExemple;
    const { id, price, weight, ...data } = dataExemple;
    (FinalProductPriceCalculator as jest.Mock).mockResolvedValue({
      finalPrice: 10,
      finalWeight: 5,
    });
    (crudService.updateInDatabase as jest.Mock).mockResolvedValue(product);
    (updateRelations as jest.Mock).mockReturnValue(rawMaterialProductRelation);

    const result = await productProvider.update(id, data);

    expect(result).toEqual(dataExemple);
    expect(FinalProductPriceCalculator).toHaveBeenCalledTimes(1);
    expect(crudService.updateInDatabase).toHaveBeenCalledTimes(1);
    expect(updateRelations).toHaveBeenCalledTimes(1);
  });

  test('Test 2 -> failed', async () => {
    const { id, rawMaterialProductRelation, ...product } = dataExemple;
    const { id: destruct, price, weight, ...data } = dataExemple;
    (FinalProductPriceCalculator as jest.Mock).mockResolvedValue({
      finalPrice: 10,
      finalWeight: 5,
    });
    (crudService.updateInDatabase as jest.Mock).mockResolvedValue(
      Error(errorsCrudService.updateMessage('Products'))
    );
    (updateRelations as jest.Mock).mockReturnValue(rawMaterialProductRelation);

    const result = await productProvider.update(id, data);

    expect(result).toEqual(Error(errorsCrudService.updateMessage('Products')));
    expect(FinalProductPriceCalculator).toHaveBeenCalledTimes(1);
    expect(crudService.updateInDatabase).toHaveBeenCalledTimes(1);
    expect(updateRelations).toHaveBeenCalledTimes(0);
  });
});
