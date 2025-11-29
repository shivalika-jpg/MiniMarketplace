export default function ProductCard({ p, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
    >
      <div className="relative h-40 overflow-hidden bg-gray-100">
        <img 
          src={p.image_url || "/placeholder.png"} 
          alt={p.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{p.name}</h3>
        <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">₹{p.price}</p>
      </div>
    </div>
  );
}
