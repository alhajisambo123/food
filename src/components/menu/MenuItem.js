import { CartContext } from "@/components/AppContext";
import MenuItemTile from "@/components/menu/MenuItemTile";
import { useContext } from "react";

export default function MenuItem(menuItem) {
  const { addToCart } = useContext(CartContext);

  async function handleAddToCartButtonClick() {
    addToCart(menuItem);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return (
    <>
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
}
