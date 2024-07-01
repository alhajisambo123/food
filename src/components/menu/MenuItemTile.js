import AddToCartButton from "@/components/menu/AddToCartButton";
import { useRouter } from "next/navigation"; // Import useRouter for routing

export default function MenuItemTile({ onAddToCart, ...item }) {
  const router = useRouter(); // Get access to Next.js router

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`); // Route to product page with ID
  };
  const { image, description, name, basePrice, sizes, extraIngredientPrices } =
    item;
  const hasSizesOrExtras =
    sizes?.length > 0 || extraIngredientPrices?.length > 0;
  return (
    <div
      className="bg-gray-200 p-4 rounded-lg text-center
      group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all"
    >
      <div
        className="text-center cursor-pointer"
        onClick={() => handleProductClick(item._id)}
      >
        <img
          src={image}
          className="max-h-auto max-h-24 block mx-auto"
          alt="pizza"
        />
      </div>
      <h4 className="font-semibold text-xl my-3">{name}</h4>
      {/* <p className="text-gray-500 text-sm line-clamp-3">{description}</p> */}
      <AddToCartButton
        image={image}
        hasSizesOrExtras={hasSizesOrExtras}
        onClick={onAddToCart}
        basePrice={basePrice}
      />
    </div>
  );
}
