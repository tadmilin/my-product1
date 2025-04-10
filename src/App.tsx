import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './component/NavBar';
import Home from './pages/Home';
import Upload from './pages/Upload';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './component/ProductList';
import { Product } from './type';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEditProduct = (editedProduct: Product) => {
    setProducts(
      products.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
      )
    );
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/upload"
              element={
                <Upload
                  products={products}
                  onAddProduct={handleAddProduct}
                  onDelete={handleDeleteProduct}
                  onEdit={handleEditProduct}
                />
              }
            />
            <Route
              path="/products"
              element={
                <div className="container mx-auto p-4">
                  <ProductList
                    products={products}
                    onDelete={handleDeleteProduct}
                    onEdit={handleEditProduct}
                  />
                </div>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;