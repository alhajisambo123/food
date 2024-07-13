"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items")
      .then((res) => res.json())
      .then((data) => setMenuItems(data));
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => setCategories(categories));
    });
  }, []);

  useEffect(() => {
    const sortedMenuItems = menuItems
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setBestSellers(sortedMenuItems.slice(0, 4));
  }, [menuItems]);

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  return (
    <section className="">
      <div className="absolute left-0 right-0 w-full justify-start"></div>
      <div className="text-center mb-4">
        <h2 className="text-primary flex justfify-end font-bold text-4xl italic">
          New Arrivals
        </h2>
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
      </div>

      <section className="mt-8">
        {categories?.length > 0 &&
          categories.map((c) => (
            <div key={c._id}>
              <div className="text-center">
                <SectionHeaders mainHeader={c.name} />
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
                {menuItems
                  .filter((item) => item.category === c.name)
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
