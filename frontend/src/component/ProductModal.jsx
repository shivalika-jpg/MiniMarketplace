import { jwtDecode } from "jwt-decode";
import { getToken } from "../util/auth";

export default function ProductModal({ product, onClose }) {
  let isOwner = false;

  try {
    const token = getToken();
    if (token) {
      const decoded = jwtDecode(token);
      isOwner = decoded.id === product.user_id;
    }
  } catch {}

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative animate-slideUp my-8 max-h-[90vh] flex flex-col">

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition"
        >
          ✕
        </button>

        <div className="relative h-64 bg-gray-100 flex-shrink-0">
          <img 
            src={product.image_url} 
            className="w-full h-full object-cover"
            alt={product.name}
          />
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
          <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            ₹{product.price}
          </p>

          {product.description && (
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          )}

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Seller Information</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-gray-600 font-medium w-20">Name:</span>
                <span className="text-gray-900">{product.seller_name}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 font-medium w-20">Phone:</span>
                <a href={`tel:${product.seller_phone}`} className="text-indigo-600 hover:text-indigo-700 font-medium">
                  {product.seller_phone}
                </a>
              </div>
            </div>
          </div>

          {isOwner && (
            <button
              onClick={async () => {
                if (!window.confirm("Are you sure you want to delete this product?")) return;
                await fetch(
                  `${process.env.REACT_APP_API_BASE || "http://localhost:5000/api"}/products/${product.id}`,
                  { method: "DELETE", headers: { Authorization: `Bearer ${localStorage.getItem("token")}`} }
                );
                window.location.reload();
              }}
              className="mt-6 w-full bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition shadow-md hover:shadow-lg"
            >
              Delete Product
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
