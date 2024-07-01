"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem"; // Import the updated MenuItem component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for routing

export default function HomeMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter(); // Get access to Next.js router

  useEffect(() => {
    fetch("/api/menu-items")
      .then((res) => res.json())
      .then((data) => setMenuItems(data));
  }, []);

  useEffect(() => {
    const filteredItems = menuItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBestSellers(filteredItems.slice(-3));
  }, [menuItems, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`); // Route to product page with ID
  };

  return (
    <section className="">
      <div className="absolute left-0 right-0 w-full justify-start"></div>
      <div className="text-center mb-4">
        <SectionHeaders
          subHeader={"check Out"}
          mainHeader={"Our Best Sellers"}
        />
        <input
          type="text"
          placeholder="Search for products..."
          className="bg-gray-200 w-full py-2 px-4 rounded-xl"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {bestSellers.length > 0 &&
          bestSellers.map((item) => (
            <MenuItem
              key={item._id}
              {...item}
              onClick={() => handleProductClick(item._id)} // Pass product ID on click
            />
          ))}

        {bestSellers.length === 0 && searchTerm !== "" && (
          <p>No results found for your search.</p>
        )}
      </div>
    </section>
  );
}
