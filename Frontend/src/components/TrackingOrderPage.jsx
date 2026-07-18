import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { serverUrl } from "../App";

const TrackOrderPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = useCallback(async () => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `${serverUrl}/order/getorderbyid/${orderId}`,
        { withCredentials: true },
      );
      if (res.data.success) {
        setOrder(res.data.order);
      }
    } catch (err) {
      console.log(err?.response?.message || err?.response?.data);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  if (loading) {
    return <div className="p-6">Loading order tracking...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Track Order</h1>
      {order ? (
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
          {JSON.stringify(order, null, 2)}
        </pre>
      ) : (
        <p>No order found.</p>
      )}
    </div>
  );
};

export default TrackOrderPage;
