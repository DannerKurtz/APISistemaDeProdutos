import { rawMaterialProductRelationProvider } from '../../../src/server/database/providers/RawMaterialProductRelation';

rawMaterialProductRelationProvider;
jest.mock(
  '../../../src/server/database/providers/RawMaterialProductRelation',
  () => ({
    rawMaterialProductRelationProvider: {
      create: jest.fn(),
    },
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Create RawMaterialProductRelation Test', () => {
  test('Test 01 -> successful', async () => {
    const data = {
      materiaPrimaId: '321asd1f23a3df21',
      produtoId: '321asd1f23a3df21',
      quantidadeMateriaPrima: 10,
    };
    (rawMaterialProductRelationProvider.create as jest.Mock).mockReturnValue({
      id: '321asd1f23a3df21',
      materiaPrimaId: '321asd1f23a3df21',
      produtoId: '321asd1f23a3df21',
      quantidadeMateriaPrima: 10,
    });

    const result = await rawMaterialProductRelationProvider.create(data);

    expect(rawMaterialProductRelationProvider.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      id: '321asd1f23a3df21',
      materiaPrimaId: '321asd1f23a3df21',
      produtoId: '321asd1f23a3df21',
      quantidadeMateriaPrima: 10,
    });
  });
});
