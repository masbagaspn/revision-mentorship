import { Product } from '@prisma/client';
import React from 'react';

import { useProducts } from '@/hooks/products/useProducts';

import Spinner from '@/components/loader/Spinner';
import ProductCard from '@/components/products/cards/ProductCard';

const ProductList = () => {
  const { data, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className='flex h-full grow items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='grid grid-cols-3 gap-8'>
      {data?.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
