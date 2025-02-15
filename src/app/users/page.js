"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersPage() {
  // const [users, setUsers] = useState([]);
  // const { loading, data } = useProfile();

  // useEffect(() => {
  //   fetch("/api/users").then((response) => {
  //     response.json().then((users) => {
  //       setUsers(users);
  //     });
  //   });
  // }, []);
  const [orders, setOrders] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/orders").then((response) => {
      response.json().then((orders) => {
        setOrders(orders);
      });
    });
  }, []);

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {orders?.length > 0 &&
          orders.map((user) => (
            <div
              key={user._id}
              className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                <div className="text-gray-900">
                  {!!user.phone && <span>{user.phone}</span>}
                  {!user.phone && (
                    <span className="italic">No phone number</span>
                  )}
                </div>
                <span className="text-gray-500">{user.userEmail}</span>
              </div>
              <div>
                <Link className="button" href={"/users/" + user._id}>
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
