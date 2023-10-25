import { Product } from '@prisma/client';
import { useRouter } from 'next/router';
import React from 'react';

import Button from '@/components/buttons/Button';
import FieldNumberInput from '@/components/forms/FieldNumberInput';
import FieldTextArea from '@/components/forms/FieldTextArea';
import FieldTextInput from '@/components/forms/FieldTextInput';
import ProductLayout from '@/components/products/layout/ProductLayout';

export default function CreateProduct() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();
  const [formData, setFormData] = React.useState<Partial<Product>>({
    title: '',
    description: '',
    price: 0,
    image: '',
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const data = { ...formData };
    data.price = Number(data.price);

    if (data.image === '') {
      delete data.image;
    }

    fetch('/api/product', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 201) {
          router.push('/products');
        } else {
          throw new Error('Failed to create new product.');
        }
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <ProductLayout>
      <main className='layout relative flex grow gap-10 py-10'>
        <div className='w-1/3 space-y-2'>
          <h1>Add Product</h1>
          <p className='text-black/50'>Enter your product details.</p>
          {error && <span>{error}</span>}
        </div>
        <form
          className='flex grow flex-col gap-8'
          onSubmit={(e) => handleSubmit(e)}
        >
          <FieldTextInput
            label='Product Title'
            name='title'
            onChange={(e) => handleChange(e)}
            value={formData.title}
            required
          />
          <FieldTextArea
            label='Product Description'
            name='description'
            onChange={(e) => handleChange(e)}
            value={formData.description as string}
            required
          />
          <FieldNumberInput
            label='Product Price'
            name='price'
            onChange={(e) => handleChange(e)}
            value={Number(formData.price)}
            required
          />
          <FieldTextInput
            label='Product Image'
            name='image'
            onChange={(e) => handleChange(e)}
            value={formData.image as string}
          />
          <Button
            type='submit'
            size='sm'
            className='w-fit self-end'
            isLoading={isLoading}
          >
            Submit
          </Button>
        </form>
      </main>
    </ProductLayout>
  );
}
