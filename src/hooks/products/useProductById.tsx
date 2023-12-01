import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useProductById = (id: string) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['product-details'],
    queryFn: () => axios.get(`/api/product/${id}`).then((res) => res.data.data),
  });

  return { isLoading, error, data };
};
