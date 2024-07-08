"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem"; // Import the updated MenuItem component
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter(); // Get access to Next.js router
  const [categories, setCategories] = useState([]);
  const [menuItemss, setMenuItemss] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items")
      .then((res) => res.json())
      .then((data) => setMenuItems(data));
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => setCategories(categories));
    });
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItemss) => setMenuItems(menuItemss));
    });
  }, []);

  useEffect(() => {
    const filteredItems = menuItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBestSellers(filteredItems.slice(-4));
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
        <h2 className="text-primary flex justfify-end font-bold text-4xl italic">
          New Arrivals
        </h2>
        {/* <input
          type="text"
          placeholder="Search for products..."
          className="bg-gray-200 w-full py-2 px-4 rounded-xl"
          value={searchTerm}
          onChange={handleSearchChange}
        /> */}
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
      {/* <h2 className="text-primary font-bold text-center text-4xl italic pt-3">
        Home Appliances{" "}
      </h2> */}
      <section className="mt-8">
        {categories?.length > 0 &&
          categories.map((c) => (
            <div key={c._id}>
              <div className="text-center">
                <SectionHeaders mainHeader={c.name} />
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
                {menuItems
                  .filter((item) => item.category === c._id)
                  .map((item) => (
                    <MenuItem key={item._id} {...item} />
                  ))}
              </div>
            </div>
          ))}
      </section>
    </section>
  );
}
