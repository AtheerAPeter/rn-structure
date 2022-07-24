import {useQuery} from '@tanstack/react-query';
import {httpClinet} from '../Api';

export const useFoodById = (id: number) => {
  const {data: food, ...foodQuery} = useQuery(
    httpClinet.foodApi.getById.key(id),
    httpClinet.foodApi.getById.exec,
  );

  return {food, foodQuery};
};
