import React from 'react';

import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

interface ProductLayoutProps {
  templateTitle?: string;
  children: React.ReactNode;
}

const ProductLayout: React.FC<ProductLayoutProps> = ({
  templateTitle,
  children,
}) => {
  return (
    <Layout>
      <Seo templateTitle={templateTitle} />
      <div className='max-w-screen relative flex min-h-screen flex-col'>
        <Header />
        {children}
      </div>
    </Layout>
  );
};

export default ProductLayout;
