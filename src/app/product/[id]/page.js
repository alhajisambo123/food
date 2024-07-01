// "use client";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import AddToCartButton from "@/components/menu/AddToCartButton";
// import { CartContext } from "@/components/AppContext";
// import { useContext } from "react";

// export default function SingleProduct() {
//   const [product, setProduct] = useState(null);
//   const [loadingProduct, setLoadingProduct] = useState(true);
//   const { addToBart } = useContext(CartContext);

//   async function handleAddToCartButtonClick() {
//     addToBart(product);
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//   }
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       if (id) {
//         setLoadingProduct(true);

//         try {
//           const response = await fetch("/api/products?_id=" + id);
//           if (!response.ok) {
//             throw new Error("Failed to fetch product data");
//           }

//           const data = await response.json();
//           setProduct(data);
//         } catch (error) {
//           console.error("Error fetching product:", error);
//         } finally {
//           setLoadingProduct(false);
//         }
//       }
//     };

//     fetchData();
//   }, [id]);

//   return (
//     <section className="">
//       {loadingProduct ? (
//         <p>Loading product...</p>
//       ) : (
//         <>
//           <div className="flex justify-center">
//             <Image
//               src={product?.image} // Use optional chaining for safety
//               width={400}
//               height={400}
//               alt={product?.name}
//             />
//           </div>
//           <div className="text-center mt-4">
//             <h1>{product?.name}</h1>
//             <p>{product?.description}</p>
//             <p>{product?.category}</p>

//             <AddToCartButton
//               // image={image}
//               // hasSizesOrExtras={hasSizesOrExtras}
//               onClick={handleAddToCartButtonClick}
//               basePrice={product?.basePrice}
//             />
//           </div>
//         </>
//       )}
//     </section>
//   );
// }

"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddToCartButton from "@/components/menu/AddToCartButton";
import { CartContext } from "@/components/AppContext";
import { useContext } from "react";

export default function SingleProduct() {
  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const { addToBart } = useContext(CartContext);

  async function handleAddToCartButtonClick() {
    addToBart(product);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoadingProduct(true);

        try {
          const response = await fetch("/api/products?_id=" + id);
          if (!response.ok) {
            throw new Error("Failed to fetch product data");
          }

          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoadingProduct(false);
        }
      }
    };

    fetchData();
  }, [id]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-11">
      {loadingProduct ? (
        <p className="col-span-full text-center">Loading product...</p>
      ) : (
        <>
          <div className="col-span-1 flex justify-center ">
            <Image
              src={product?.image} // Use optional chaining for safety
              width={400}
              height={400}
              alt={product?.name}
            />
          </div>
          <div className="col-span-1 p-4">
            <h1 className="text-xl font-semibold">{product?.name}</h1>
            <p className="text-gray-700 mb-4">{product?.description}</p>
            <p className="text-gray-500">Category: {product?.category}</p>

            <AddToCartButton
              // image={image}
              // hasSizesOrExtras={hasSizesOrExtras}
              onClick={handleAddToCartButtonClick}
              basePrice={product?.basePrice}
            />
          </div>
        </>
      )}
    </section>
  );
}
