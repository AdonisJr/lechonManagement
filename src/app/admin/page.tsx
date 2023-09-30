"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/admin/Header";
import OrderList from "@/components/admin/OrderList";
import Modal from "@/components/admin/Modal";
import { useStore } from "@/store";

export default function Admin() {
  const [isModalOpen, setModal] = useState<Boolean>(false);
  const [user, setUser, setOrderList ] = useStore((state) => [state.user, state.setUser, state.setOrderList]);

  const handleModal = (action: Boolean) => {
    setModal(action);
  };
  const router = useRouter();
  const { data: session } = useSession({ required: true });
  // !session?.user ? router.back() : '';

  
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
      <div className="p-5">
        <OrderList />
      </div>
    </div>
  );
}
