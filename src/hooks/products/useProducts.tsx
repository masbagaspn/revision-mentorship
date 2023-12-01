import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useProducts = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get('/api/product').then((res) => res.data.data),
  });

  return { isLoading, error, data };
};
