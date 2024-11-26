import { getRelationById } from './getRelation';

type queryOptions = {
  id: string;
  modelName: string;
  conditionKey: string;
  selectKey: string;
  message: string;
};

export const joinItems = async <T>(
  item: [T] | T,
  queryOptions: queryOptions
): Promise<any | Error> => {
  try {
    if (Array.isArray(item)) {
      const length = item.length;
      const itemWithRelation = [];

      for (let index = 0; index < length; index++) {
        const relation: [] | Error = await getRelationById(queryOptions);
        if (relation instanceof Error) return new Error(relation.message);
        const relationArrayNameAndQuantity = relation.map(
          (rel) => rel[queryOptions.selectKey]
        );
        itemWithRelation.push({
          ...item[index],
          [queryOptions.selectKey]: relationArrayNameAndQuantity,
        });
        console.log(`relação ${relation}, item ${item[index]}`);
      }

      return itemWithRelation;
    }

    const relation: [] | Error = await getRelationById(queryOptions);

    if (relation instanceof Error) return new Error(relation.message);

    const relationArrayNameAndQuantity = relation.map(
      (rel) => rel[queryOptions.selectKey]
    );
    const itemWithRelation = {
      ...item,
      [queryOptions.selectKey]: relationArrayNameAndQuantity,
    };
    console.log(itemWithRelation);
    return itemWithRelation;
  } catch (error) {
    return new Error('Erro ao juntar os dados');
  }
};
