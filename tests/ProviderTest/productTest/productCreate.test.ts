import { productProvider } from '../../../src/server/database/providers/ProductProvier';
import { FinalProductPriceCalculator } from '../../../src/server/shared/services/Calculations/FinalProductPriceCalculator';
import { errorsCrudService } from '../../../src/server/shared/services/messageErrors';
import { crudService } from '../../../src/server/shared/services/prismaHelpers/CRUD';
import { processProductMaterialRelations } from '../../../src/server/shared/services/prismaHelpers/ProcessProductMaterialRelations';

jest.mock(
  '../../../src/server/shared/services/Calculations/FinalProductPriceCalculator',
  () => ({
    FinalProductPriceCalculator: jest.fn(),
  })
);

jest.mock('../../../src/server/shared/services/prismaHelpers/CRUD', () => ({
  crudService: {
    createInDatabase: jest.fn(),
  },
}));

jest.mock(
  '../../../src/server/shared/services/prismaHelpers/ProcessProductMaterialRelations',
  () => ({
    processProductMaterialRelations: jest.fn(),
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
    const { rawMaterialProductRelation, ...data } = dataExemple;
    const { price, weight, id, ...product } = dataExemple;

    (FinalProductPriceCalculator as jest.Mock).mockReturnValue({
      finalPrice: 10,
      finalWeight: 5,
    });
    (crudService.createInDatabase as jest.Mock).mockResolvedValue(data);
    (processProductMaterialRelations as jest.Mock).mockReturnValue(
      rawMaterialProductRelation
    );

    const result = await productProvider.create(product);

    expect(result).toEqual(dataExemple);
    expect(FinalProductPriceCalculator).toHaveBeenCalledTimes(1);
    expect(crudService.createInDatabase).toHaveBeenCalledTimes(1);
    expect(processProductMaterialRelations).toHaveBeenCalledTimes(1);
  });

  test('Test 2 -> failed', async () => {
    const { rawMaterialProductRelation, ...data } = dataExemple;
    const { price, weight, id, ...product } = dataExemple;

    (FinalProductPriceCalculator as jest.Mock).mockReturnValue({
      finalPrice: 10,
      finalWeight: 5,
    });
    (crudService.createInDatabase as jest.Mock).mockResolvedValue(
      Error(errorsCrudService.createMessage('Products'))
    );
    (processProductMaterialRelations as jest.Mock).mockReturnValue(
      rawMaterialProductRelation
    );

    const result = await productProvider.create(product);

    expect(result).toEqual(Error(errorsCrudService.createMessage('Products')));
    expect(FinalProductPriceCalculator).toHaveBeenCalledTimes(1);
    expect(crudService.createInDatabase).toHaveBeenCalledTimes(1);
  });
});
