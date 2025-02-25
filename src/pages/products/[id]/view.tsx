import { Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { useProductById } from '@/hooks/products/useProductById';

import IconButton from '@/components/buttons/IconButton';
import IconLink from '@/components/links/IconLink';
import Spinner from '@/components/loader/Spinner';
import ProductLayout from '@/components/products/layout/ProductLayout';

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useProductById(id);

  const handleDelete = async (id: number | undefined) => {
    fetch(`/api/product/${id}`, { method: 'DELETE' }).then((res) => {
      if (res.status === 202) {
        router.push('/products');
      }
    });
  };

  return (
    <ProductLayout>
      {isLoading ? (
        <div className='layout flex grow items-center justify-center'>
          <Spinner />
        </div>
      ) : (
        <div className='layout relative flex grow gap-10 py-10'>
          <div className='sticky top-24 h-fit w-1/3'>
            <Image
              src={data?.image ? data.image : '/images/default.png'}
              alt={`${data?.title}-image`}
              width={500}
              height={500}
              className='rounded-lg object-cover object-center'
            />
          </div>
          <div className='flex grow flex-col gap-8'>
            <div className='flex items-center justify-between'>
              <h1>{data?.title}</h1>
              <div className='flex gap-1'>
                <IconLink
                  href={`/products/${data?.id}/edit`}
                  icon={Pencil}
                  variant='ghost'
                />
                <IconButton
                  onClick={() => handleDelete(data?.id)}
                  icon={Trash2}
                  variant='ghost'
                />
              </div>
            </div>
            <span className='text-lg font-medium'>${data?.price}</span>

            <div className='flex flex-col gap-2'>
              <h2>Description</h2>
              <p>{data?.description}</p>
            </div>
          </div>
        </div>
      )}
    </ProductLayout>
  );
}
