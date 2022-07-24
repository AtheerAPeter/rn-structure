import {QueryFunctionContext} from '@tanstack/react-query';
import {Axios} from 'axios';
import {IFood} from '../@Types/IFood';
import {IPageParams} from '../@Types/IPageParams';
import {indexfoodFilters} from '../Constants/filters';

const indexFoodKey = (params: IPageParams): [string, IPageParams] => [
  'foodIndex',
  params,
];

const getByIdKey = (id: number): [string, number] => ['foodGetById', id];

export const foodApi = (request: Axios) => ({
  index: {
    exec: async (
      context: QueryFunctionContext<ReturnType<typeof indexFoodKey>>,
    ) => {
      const pageParams: IPageParams = context.pageParam || {
        pageSize: indexfoodFilters.pageSize,
        pageNumber: 1,
      };
      const response = await request.get<{data: {products: IFood[]}}>(
        `/v1/productAll?p=${pageParams.pageNumber}&s=${pageParams.pageSize}`,
      );
      return response.data.data.products;
    },
    key: indexFoodKey,
  },

  getById: {
    exec: async (
      context: QueryFunctionContext<ReturnType<typeof getByIdKey>>,
    ) => {
      const [, id] = context.queryKey;
      const response = await request.get<{data: IFood}>(`/v1/product/${id}`);
      return response.data.data;
    },
    key: getByIdKey,
  },
});
