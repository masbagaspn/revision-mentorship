import { Product } from '@prisma/client';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import IconButton from '@/components/buttons/IconButton';
import UnstyledLink from '@/components/links/UnstyledLink';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }): JSX.Element => {
  const { id, title, description, image, price } = product;
  const [isActionOpen, setIsActionOpen] = React.useState(false);

  return (
    <article className='flex gap-4 rounded-lg p-4 shadow-md'>
      <Image
        src={image ? image : '/images/default.png'}
        alt={`${title}-image`}
        width={500}
        height={500}
        className='w-1/2 rounded'
      />
      <div className='flex grow flex-col justify-between gap-4'>
        <div>
          <h4>{title}</h4>
          <p className='text-sm opacity-70'>{description}</p>
        </div>
        <div className='flex items-end justify-between'>
          <span className='h4 items-self-end'>{`$${price}`}</span>
          <div className='relative'>
            <IconButton
              onClick={() => setIsActionOpen(!isActionOpen)}
              icon={MoreHorizontal}
              variant='ghost'
            />
            {isActionOpen && <Options id={id} setIsOpen={setIsActionOpen} />}
          </div>
        </div>
      </div>
    </article>
  );
};

const Options = ({
  setIsOpen,
  id,
}: {
  setIsOpen: (arg: boolean) => void;
  id: number;
}) => {
  return (
    <div
      onMouseLeave={() => setIsOpen(false)}
      className='absolute right-0 top-0 z-50 flex w-20 flex-col rounded-md border bg-white text-xs shadow'
    >
      <UnstyledLink
        href={`/products/${id}/view`}
        className='hover:bg-primary-50 border-b px-3 py-2'
      >
        View
      </UnstyledLink>
      <UnstyledLink
        href={`/products/${id}/edit`}
        className='hover:bg-primary-50 border-b px-3 py-2'
      >
        Edit
      </UnstyledLink>
      <UnstyledLink
        href={`/products/${id}/delete`}
        className='hover:bg-primary-50 px-3 py-2'
      >
        Delete
      </UnstyledLink>
    </div>
  );
};

export default ProductCard;
