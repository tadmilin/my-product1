import React, { useRef } from 'react';
import { Product } from '../type';

interface ProductFormProps {
  onAddProduct: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const token = localStorage.getItem('token');

  const handleSubmit = async () => {
    if (!token) {
      alert('กรุณาล็อกอินก่อน');
      return;
    }

    const file = imageRef.current?.files?.[0];
    const name = nameRef.current?.value;
    const description = descRef.current?.value;

    if (!file || !name || !description) {
      alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', name);
    formData.append('description', description);

    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      if (res.status === 401) {
        alert('กรุณาล็อกอินก่อน');
        return;
      }
      const newProduct = await res.json();
      onAddProduct(newProduct);
      imageRef.current!.value = '';
      nameRef.current!.value = '';
      descRef.current!.value = '';
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-primaryBlue mb-4">อัพโหลดสินค้า</h1>
      <input
        type="file"
        ref={imageRef}
        accept="image/*"
        className="mb-2 block w-full text-primaryRed"
      />
      <input
        type="text"
        ref={nameRef}
        placeholder="ชื่อสินค้า"
        className="mb-2 block w-full p-2 border border-primaryBlue rounded"
      />
      <textarea
        ref={descRef}
        placeholder="ข้อมูลสินค้า"
        className="mb-2 block w-full p-2 border border-primaryBlue rounded"
      />
      <button
        onClick={handleSubmit}
        className="bg-primaryRed text-black px-4 py-2 rounded bg-red-600"
      >
        อัพโหลด
      </button>
    </div>
  );
};

export default ProductForm;