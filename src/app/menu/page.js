"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuItemss, setMenuItemss] = useState([]);

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => setCategories(categories));
    });
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => setMenuItems(menuItems));
    });
  }, []);

  useEffect(() => {
    const filteredItems = menuItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMenuItemss(filteredItems);
  }, [menuItems, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`); // Route to product page with ID
  };

  return (
    <section className="mt-8">
      <input
        type="text"
        placeholder="Search for products..."
        className="bg-gray-200 w-full py-2 px-4 rounded-xl"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {/* {categories?.length > 0 &&
        categories.map((c) => (
          <div key={c._id}>
            <div className="text-center">
              <SectionHeaders mainHeader={c.name} /> */}
      {/* </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
              {menuItems
                .filter((item) => item.category === c._id)
                .map((item) => (
                  <MenuItem key={item._id} {...item} />
                ))}
            </div> */}
      {/* </div> */}
      <div className="grid sm:grid-cols-3 gap-4">
        {menuItemss.length > 0 &&
          menuItemss.map((item) => (
            <MenuItem
              key={item._id}
              {...item}
              onClick={() => handleProductClick(item._id)} // Pass product ID on click
            />
          ))}

        {menuItemss.length === 0 && searchTerm !== "" && (
          <p>No results found for your search.</p>
        )}
      </div>
    </section>
  );
}
