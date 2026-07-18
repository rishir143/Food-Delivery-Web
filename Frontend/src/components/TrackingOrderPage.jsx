import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";
import { Package, MapPin, Phone, User, Clock, CheckCircle } from "lucide-react";
import DeliveryTracking from "./DeliveryTracking";
import { ArrowLeft } from "lucide-react";

const TrackOrderPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrder = useCallback(async () => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `${serverUrl}/api/order/get-order-by-id/${orderId}`,
        { withCredentials: true },
      );
      if (res.data.success) {
        setLoading(false);
        console.log(res.data);
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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full hover:bg-gray-200 transition-all duration-200"
          >
            <ArrowLeft size={28} />
          </button>

          <h1 className="text-3xl font-bold">Track Order</h1>
        </div>

        {/* Order Summary */}

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Order #{order._id.slice(-8)}
              </h2>

              <p className="text-gray-500">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold">₹{order.totalAmount}</p>

              <p className="text-sm text-gray-500">
                {order.paymentMethod.toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        {/* Delivery Address */}

        <div className="bg-white rounded-xl shadow p-5 mb-6">
          <div className="flex items-center gap-3">
            <MapPin className="text-red-500" />

            <div>
              <h3 className="font-semibold">Delivery Address</h3>

              <p className="text-gray-600">{order.deliveryAddress.text}</p>
            </div>
          </div>
        </div>

        {/* Shop Orders */}

        <div className="space-y-6">
          {order.shopOrders.map((shopOrder) => {
            const delivered = shopOrder.status === "delivered";
            const out = shopOrder.status === "out of delivery";
            const pending = shopOrder.status === "pending";

            return (
              <div
                key={shopOrder._id}
                className="bg-white rounded-xl shadow overflow-hidden"
              >
                <div className="flex">
                  <img
                    src={shopOrder.shop.image}
                    className="w-44 h-44 object-cover"
                  />

                  <div className="flex-1 p-5">
                    <div className="flex justify-between">
                      <div>
                        <h2 className="text-xl font-bold">
                          {shopOrder.shop.name}
                        </h2>

                        <p className="text-gray-500">
                          {shopOrder.shop.address}
                        </p>
                      </div>

                      <div>
                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm
                          ${
                            pending
                              ? "bg-yellow-500"
                              : out
                                ? "bg-blue-500"
                                : delivered
                                  ? "bg-green-500"
                                  : "bg-gray-500"
                          }`}
                        >
                          {shopOrder.status}
                        </span>
                      </div>
                    </div>

                    {/* Progress */}

                    <div className="mt-6">
                      <div className="flex justify-between text-sm">
                        <div className="flex flex-col items-center">
                          <CheckCircle className="text-green-500" />

                          <p>Placed</p>
                        </div>

                        <div className="flex flex-col items-center">
                          <CheckCircle
                            className={
                              pending ? "text-gray-400" : "text-green-500"
                            }
                          />

                          <p>Preparing</p>
                        </div>

                        <div className="flex flex-col items-center">
                          <Package
                            className={out ? "text-blue-500" : "text-gray-400"}
                          />

                          <p>Delivery</p>
                        </div>

                        <div className="flex flex-col items-center">
                          <CheckCircle
                            className={
                              delivered ? "text-green-500" : "text-gray-400"
                            }
                          />

                          <p>Done</p>
                        </div>
                      </div>
                    </div>

                    {/* Delivery Boy */}

                    {shopOrder.assignedBoy && (
                      <div className="mt-6 border rounded-lg p-4 bg-gray-50">
                        <h3 className="font-semibold mb-3">Delivery Partner</h3>

                        <div className="flex justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <User size={18} />

                              <span>{shopOrder.assignedBoy.fullname}</span>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                              <Phone size={18} />

                              <span>{shopOrder.assignedBoy.mobile}</span>
                            </div>
                          </div>

                          <button className="bg-green-500 text-white px-4 rounded-lg">
                            Call
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Live Tracking Map */}

                    {shopOrder.status === "out of delivery" &&
                      shopOrder.assignedBoy && (
                        <div className="mt-6">
                          <DeliveryTracking
                            customerLocation={{
                              lat: order.deliveryAddress.latitude,
                              lon: order.deliveryAddress.longitude,
                            }}
                            deliveryLocation={{
                              lat: shopOrder.assignedBoy.location
                                .coordinates[1],
                              lon: shopOrder.assignedBoy.location
                                .coordinates[0],
                            }}
                            orderId={order._id}
                            shopOrderId={shopOrder._id}
                            customerName={order.user.fullname}
                            showDeliveryActions={false}
                          />
                        </div>
                      )}

                    {/* Items */}

                    <div className="mt-6">
                      <h3 className="font-semibold mb-3">Items</h3>

                      {shopOrder.shopOrderItems.map((item) => (
                        <div
                          key={item._id}
                          className="flex justify-between py-2 border-b"
                        >
                          <div className="flex gap-3">
                            <img
                              src={item.item.image}
                              className="w-14 h-14 rounded-lg object-cover"
                            />

                            <div>
                              <p className="font-medium">{item.name}</p>

                              <p className="text-gray-500">
                                Qty {item.quantity}
                              </p>
                            </div>
                          </div>

                          <p className="font-semibold">₹{item.price}</p>
                        </div>
                      ))}

                      <div className="flex justify-between mt-4 font-bold text-lg">
                        <span>Subtotal</span>

                        <span>₹{shopOrder.subTotal}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;
