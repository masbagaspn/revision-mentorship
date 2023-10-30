import { Product } from '@prisma/client';
import * as React from 'react';

export const useProducts = () => {
  const [data, setData] = React.useState<Product[]>();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/product')
      .then((res) => res.json())
      .then((products) => setData(products.data))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading };
};
