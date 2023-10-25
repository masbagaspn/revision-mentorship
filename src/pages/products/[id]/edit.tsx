import { useRouter } from 'next/router';
import React from 'react';

import Button from '@/components/buttons/Button';
import FieldNumberInput from '@/components/forms/FieldNumberInput';
import FieldTextArea from '@/components/forms/FieldTextArea';
import FieldTextInput from '@/components/forms/FieldTextInput';
import Spinner from '@/components/loader/Spinner';
import ProductLayout from '@/components/products/layout/ProductLayout';

import { useProductById } from '@/services/products';

export default function EditProduct() {
  const { data, setData, isLoading } = useProductById();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      title: data?.title,
      description: data?.description,
      price: data?.price,
      image: data?.image,
    };

    formData.price = Number(formData.price);

    if (formData.image === '' || formData.image === null) {
      delete formData.image;
    }

    fetch(`/api/product/${data?.id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.status === 200) {
          router.push('/products');
        } else {
          throw new Error();
        }
      })
      .catch(() => setError('Failed to update product.'))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <ProductLayout>
      <main className='layout relative flex grow gap-10 py-10'>
        <div className='w-1/3 space-y-2'>
          <h1>Add Product</h1>
          <p className='text-black/50'>Enter your product details.</p>
        </div>
        <form
          className='flex grow flex-col gap-8'
          onSubmit={(e) => handleSubmit(e)}
        >
          {isLoading && <Spinner />}
          {!isLoading && data && (
            <>
              <FieldTextInput
                label='Product Title'
                name='title'
                onChange={(e) => handleChange(e)}
                value={data.title}
                required
              />
              <FieldTextArea
                label='Product Description'
                name='description'
                onChange={(e) => handleChange(e)}
                value={data.description as string}
                required
              />
              <FieldNumberInput
                label='Product Price'
                name='price'
                onChange={(e) => handleChange(e)}
                value={Number(data.price)}
                required
              />
              <FieldTextInput
                label='Product Image'
                name='image'
                onChange={(e) => handleChange(e)}
                value={data.image ? data.image : ''}
              />
              {error && (
                <span className='rounded-lg bg-red-50 px-4 py-2 text-sm text-red-500'>
                  {error}
                </span>
              )}
              <Button
                type='submit'
                size='sm'
                className='w-fit self-end'
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            </>
          )}
        </form>
      </main>
    </ProductLayout>
  );
}