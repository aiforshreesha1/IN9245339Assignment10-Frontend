import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '../lib/slices/cartSlice';
import { AppDispatch } from '../lib/store';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  shortDescription: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, shortDescription }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, price, image, quantity: 1 }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <Link href={`/product/${id}`} className="block">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <Link href={`/product/${id}`} className="block">
          <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors">{name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{shortDescription}</p>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-blue-600">${price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors flex items-center"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;