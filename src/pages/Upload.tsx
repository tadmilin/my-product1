import React from 'react';
import ProductForm from '../component/ProductForm';
import ProductList from '../component/ProductList';
import { Product } from '../type';

interface UploadProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
}

const Upload: React.FC<UploadProps> = ({ products, onAddProduct, onDelete, onEdit }) => {
  return (
    <div className="container mx-auto p-4">
      <ProductForm onAddProduct={onAddProduct} />
      <ProductList products={products} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
};

export default Upload;