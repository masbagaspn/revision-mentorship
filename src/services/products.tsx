import { Product } from '@prisma/client';
import { useRouter } from 'next/router';
import React from 'react';

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

export const useProductById = () => {
  const [data, setData] = React.useState<Partial<Product>>();
  const [isLoading, setIsLoading] = React.useState(true);

  const router = useRouter();
  const { id } = router.query;

  React.useEffect(() => {
    if (id) {
      fetch(`/api/product/${id}`)
        .then((res) => res.json())
        .then((product) => setData(product.data))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  return { data, setData, isLoading };
};
