'use client'

import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { useInView } from 'react-intersection-observer';

interface Product {
  objectID: string;
  name: string;
  salePrice: number;
  image: string;
  shortDescription: string;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const fetchProducts = async (pageNumber: number) => {
    try {
      const response = await fetch(`/api/products?page=${pageNumber}&limit=10`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts(page);
      if (data) {
        setProducts(prevProducts => [...prevProducts, ...data.products]);
        setHasMore(data.currentPage < data.totalPages);
      }
      setLoading(false);
    };

    loadProducts();
  }, [page]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  }, [inView, hasMore, loading]);

  if (error) return (
    <Layout>
      <div className="text-center py-10 text-red-500">
        <h2 className="text-2xl font-bold mb-2">Error</h2>
        <p>{error}</p>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8 text-center">Featured Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.objectID}
            id={product.objectID}
            name={product.name}
            price={product.salePrice}
            image={product.image}
            shortDescription={product.shortDescription}
          />
        ))}
      </div>
      {loading && (
        <div className="flex justify-center items-center h-24">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      {hasMore && <div ref={ref} className="h-10" />}
    </Layout>
  );
};

export default HomePage;