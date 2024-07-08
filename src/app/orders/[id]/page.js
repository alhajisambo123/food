"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }
    if (id) {
      setLoadingOrder(true);
      fetch("/api/orders?_id=" + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
          setLoadingOrder(false);
        });
      });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (id && order?.cartProducts?.length) {
        // Check for order and cartProducts length
        const productId = order.cartProducts[0]._id; // Assuming the first product in cartProducts
        setLoadingProduct(true);

        try {
          const response = await fetch("/api/products?_id=" + productId);
          if (!response.ok) {
            throw new Error("Failed to fetch product data");
          }

          const data = await response.json();
          console.log(data);
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoadingProduct(false);
        }
      }
    };

    fetchData();
  }, [id, order?.cartProducts.length]);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Your order" />
        <div className="mt-4 mb-8">
          <p class="text-center text-lg font-semibold text-green-500">
            Thanks for your order!
          </p>
          <p class="text-center font-semibold mt-2 text-black">
            We will call you when your order is ready for delivery.
          </p>
        </div>
      </div>
      {loadingOrder && <div>Loading order...</div>}
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts.map((product) => (
              <CartProduct key={product._id} product={product} />
            ))}
            <div className="text-right py-2 text-gray-500">
              Total Cost:
              <span className="text-black font-bold inline-block w-8">
                ₵{subtotal}
              </span>
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInputs disabled={true} addressProps={order} />
            </div>
            {loadingProduct ? (
              <p className="col-span-full text-center">Loading product...</p>
            ) : (
              <>
                <p className="text-gray-500">Category: {product?.category}</p>
                <p className="text-gray-500 pt-2">
                  DeliveryDate: {product?.deliveryDate}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
