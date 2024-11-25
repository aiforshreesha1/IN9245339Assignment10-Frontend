'use client'

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../lib/store';
import Layout from '../../components/Layout';
import { getOrders } from '../../lib/api';

interface Order {
  _id: string;
  createdAt: string;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
}

const ProfilePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (!user) {
    return <Layout><div className="text-center py-10">Please log in to view your profile.</div></Layout>;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">My Profile</h1>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">User Information</h2>
          <p className="text-lg mb-2"><span className="font-medium">Name:</span> {user.name}</p>
          <p className="text-lg mb-2"><span className="font-medium">Email:</span> {user.email}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Order History</h2>
          {loading ? (
            <p className="text-center">Loading orders...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : orders.length === 0 ? (
            <p className="text-center">No orders found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left">Order ID</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Total</th>
                    <th className="p-3 text-left">Paid</th>
                    <th className="p-3 text-left">Delivered</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b">
                      <td className="p-3">{order._id}</td>
                      <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="p-3">${order.totalPrice.toFixed(2)}</td>
                      <td className="p-3">{order.isPaid ? 'Yes' : 'No'}</td>
                      <td className="p-3">{order.isDelivered ? 'Yes' : 'No'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;