import React, { useEffect, useState } from 'react';
import ProductCard from '../component/ProductCard';
import ProductModal from '../component/ProductModal';

export default function Home(){
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(()=> {
    fetch(`${process.env.REACT_APP_API_BASE || 'http://localhost:5000/api'}/products`)
      .then(r => r.json())
      .then(data => {
        console.log("PRODUCTS DATA:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Discover Products
          </h1>
          <p className="text-gray-600">Browse through our marketplace and find what you need</p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products available yet.</p>
            <p className="text-gray-400 mt-2">Be the first to list a product!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(p => (
              <ProductCard key={p.id} p={p} onClick={() => setSelected(p)} />
            ))}
          </div>
        )}
      </div>

      {selected && <ProductModal product={selected} onClose={()=>setSelected(null)} />}
    </div>
  );
}
