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
  const [user, setUser, setOrderList, orderList, setSelectedOrder, selectedOrder] = useStore(
    (state) => [
      state.user,
      state.setUser,
      state.setOrderList,
      state.orderList,
      state.setSelectedOrder,
      state.selectedOrder
    ]
  );

  const [keywords, setKeywords] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchTime, setSearchTime] = useState("");

  // handle functions

  const handleModal = (action: Boolean) => {
    !action ? setSelectedOrder({}) : "";
    setModal(action);
  };

  const handleTimeChange = (e: any) => {
    setSearchTime(e.target.value);
  };

  const handleDateChange = (e: any) => {
    setSearchDate(e.target.value);
  };

  const handleSearchChange = (e: any) => {
    setKeywords(e.target.value);
  };

  // Get all functions

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
    await fetch(`/api/order?search=${keywords}&date=${searchDate}&time=${searchTime}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((order) => {
        setOrderList(order);
      });
  };

  // use Effects functions

  useEffect(() => {
    if (session?.user) {
      getUserDetails();
    }
  }, [session]);
  useEffect(() => {
    getOrderList();
  }, [selectedOrder, keywords, searchDate, searchTime]);

  return (
    <div className="flex flex-col gap-2 sm:gap-0 min-h-screen w-screen bg-slate-300">
      {isModalOpen ? <Modal handleModal={handleModal} /> : ""}
      <Header />
      <div className="flex w-full px-5 pt-5">
        <div className="flex flex-col gap-2 justify-between sm:flex-row bg-white w-full rounded-sm p-2">
          <button
            className="p-2 bg-blue-700 w-full text-white font-mono font-semibold sm:w-32 hover:bg-blue-800 rounded-lg duration-200"
            onClick={() => handleModal(true)}
          >
            ADD
          </button>
          <div className="flex flex-col w-full gap-2 sm:flex-row sm:w-3/6">
            <input
              type="time"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-lg focus:ring-blue-500 focus:border-blue-500
                                w-full py-2 px-2 sm:w-2/6"
              defaultValue={searchTime}
              onChange={handleTimeChange}
            />
            <input
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-lg focus:ring-blue-500 focus:border-blue-500
                                w-full py-2 px-2 sm:w-2/6"
              defaultValue={searchDate}
              onChange={handleDateChange}
            />

            <input
              type="text"
              placeholder="Search : First Name, Last Name, Hog Number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-lg focus:ring-blue-500 focus:border-blue-500
                                w-full py-2 px-2 sm:w-4/6"
              onChange={handleSearchChange}
            />
          </div>
        </div>
        
      </div>
      <div className="sm:px-5">
        <p className="bg-white px-5 text-sm py-2 text-center text-slate-600">{orderList.length} record/s found.</p>
        <OrderList handleModal={handleModal} setKeywords={setKeywords} />
      </div>
    </div>
  );
}
