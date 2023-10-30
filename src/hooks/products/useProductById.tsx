import { Product } from '@prisma/client';
import * as React from 'react';

export const useProductById = (id: string | string[] | undefined) => {
  const [data, setData] = React.useState<Partial<Product>>();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`/api/product/${id}`)
      .then((res) => res.json())
      .then((product) => setData(product.data))
      .finally(() => setIsLoading(false));
  }, [id]);

  return { data, setData, isLoading };
};
