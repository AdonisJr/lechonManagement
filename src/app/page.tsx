"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import OrderList from "@/components/admin/OrderList";
import Header from "@/components/admin/Header";
import Modal from "@/components/admin/Modal";

export default function Home() {
  const { data: session } = useSession({ required: true });
  const router = useRouter();
  const [isModalOpen, setModal] = useState<Boolean>(false);
  const [user, setUser, setOrderList, orderList, setSelectedOrder] = useStore((state) => [
    state.user,
    state.setUser,
    state.setOrderList,
    state.orderList,
    state.setSelectedOrder
  ]);

  const handleModal = (action: Boolean) => {
    !action ? setSelectedOrder({}) : "";
    setModal(action);
  };

  const getUserDetails = async () => {
    await fetch("/api/user/details", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: session?.user?.id }),
    })
      .then((res) => res.json())
      .then((user) => setUser(user));
  };
  const getOrderList = async () => {
    await fetch("/api/order", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((order) => setOrderList(order));
  };

  useEffect(() => {
    if (session?.user) {
      getUserDetails();
    }
  }, [session]);
  useEffect(() => {
    if(session?.user){
      getOrderList();
    }
  }, [session, orderList]);

  return (
    <div className="min-h-screen w-screen bg-slate-300">
      {isModalOpen ? <Modal handleModal={handleModal} /> : ""}
      <Header />
      <div className="ps-5 pt-5">
        <div className="bg-white w-32 rounded-sm p-2">
          <button
            className="p-2 bg-blue-700 text-white font-mono font-semibold w-full hover:bg-blue-800 rounded-lg duration-200"
            onClick={() => handleModal(true)}
          >
            ADD
          </button>
        </div>
      </div>
      <div className="sm:p-5 pt-5">
        <OrderList handleModal={handleModal} />
      </div>
    </div>
  );
}
