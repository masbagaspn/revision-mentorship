import React from 'react';

import ButtonLink from '@/components/links/ButtonLink';
import ProductLayout from '@/components/products/layout/ProductLayout';
import ProductList from '@/components/products/ProductList';

export default function ProductsPage() {
  return (
    <ProductLayout templateTitle='Products'>
      <main className='layout flex grow flex-col gap-10 py-10'>
        <div className='flex justify-between'>
          <h1 className='text-primary-500'>Products</h1>
          <ButtonLink href='/products/create' size='sm'>
            Add Product
          </ButtonLink>
        </div>
        <ProductList />
      </main>
    </ProductLayout>
  );
}
