import {useInfiniteQuery} from '@tanstack/react-query';
import {IFood} from '../@Types/IFood';
import {httpClinet} from '../Api';
import {indexfoodFilters} from '../Constants/filters';

interface Props {
  queryEnabled?: boolean;
}

export const useFood = (props?: Props) => {
  const {data: food, ...foodQuery} = useInfiniteQuery(
    httpClinet.foodApi.index.key(indexfoodFilters),
    httpClinet.foodApi.index.exec,
    {
      getNextPageParam: (page, params) => {
        return page.length === indexfoodFilters.pageSize
          ? {
              pageNumber: params.length + 1,
              pageSize: indexfoodFilters.pageSize,
            }
          : undefined;
      },
      enabled: props?.queryEnabled || false,
    },
  );
  const fetchNextPage = () => {
    if (
      !foodQuery.isFetchingNextPage &&
      !foodQuery.isLoading &&
      !foodQuery.isFetching
    ) {
      foodQuery.fetchNextPage();
    }
  };

  return {
    food: food?.pages.reduce((acc, curr) => {
      acc.push(...curr);
      return acc;
    }, [] as IFood[]),
    foodQuery,
    fetchNextPage,
  };
};
