import { Product } from '@prisma/client';
import { useRouter } from 'next/router';
import * as React from 'react';

export const useProductById = () => {
  const [data, setData] = React.useState<Partial<Product>>();
  const [isLoading, setIsLoading] = React.useState(true);

  const router = useRouter();
  const { id } = router.query;

  React.useEffect(() => {
    fetch(`/api/product/${id}`)
      .then((res) => res.json())
      .then((product) => setData(product.data))
      .finally(() => setIsLoading(false));
  }, [id]);

  return { data, setData, isLoading };
};
