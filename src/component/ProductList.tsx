import React, { useState } from 'react';
import { Product } from '../type';

interface ProductListProps {
  products: Product[];
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onDelete, onEdit }) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const token = localStorage.getItem('token');

  const startEditing = (product: Product) => {
    if (!token) {
      alert('กรุณาล็อกอินก่อน');
      return;
    }
    setEditingProduct(product);
    setEditName(product.name);
    setEditDesc(product.description);
  };

  const saveEdit = async () => {
    if (!token) {
      alert('กรุณาล็อกอินก่อน');
      return;
    }

    if (editingProduct && editName && editDesc) {
      const formData = new FormData();
      formData.append('name', editName);
      formData.append('description', editDesc);

      try {
        const res = await fetch(`http://localhost:5000/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });
        if (res.status === 401) {
          alert('กรุณาล็อกอินก่อน');
          return;
        }
        const updatedProduct = await res.json();
        onEdit(updatedProduct);
        setEditingProduct(null);
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
  };

  const cancelEdit = () => {
    setEditingProduct(null);
  };

  const handleDelete = async (id: string) => {
    if (!token) {
      alert('กรุณาล็อกอินก่อน');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        alert('กรุณาล็อกอินก่อน');
        return;
      }
      onDelete(id);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-primaryBlue mb-4">รายการสินค้า</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border border-primaryBlue p-4 rounded shadow relative">
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => startEditing(product)}
                className="bg-primaryBlue text-red px-2 py-1 rounded bg-blue-700"
              >
                แก้ไข
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-primaryRed text-red px-2 py-1 rounded bg-red-600"
              >
                ลบ
              </button>
            </div>
            {editingProduct?.id === product.id ? (
              <div className="mb-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-2 border border-primaryBlue rounded mb-2"
                />
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full p-2 border border-primaryBlue rounded mb-2"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveEdit}
                    className="bg-primaryBlue text-red px-3 py-1 rounded bg-blue-700"
                  >
                    บันทึก
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-500 text-red px-3 py-1 rounded bg-gray-600"
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            ) : (
              <>
                <img src={`http://localhost:5000${product.image}`} alt={product.name} className="w-full h-48 object-cover mb-2" />
                <h3 className="text-lg font-medium text-primaryRed">{product.name}</h3>
                <p className="text-gray-700">{product.description}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;