import React, { useState } from "react";
import { useStore } from "@/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrderList({ handleModal }: any) {
  const [orderList, setOrderList, setSelectedOrder] = useStore((state) => [
    state.orderList,
    state.setOrderList,
    state.setSelectedOrder,
  ]);
  const [sortBy, setSortBy] = useState('');

  const handleSort = (field: string) => {
    setSortBy(field);
  }

  const getTime = (date: any) => {
    const time = new Date(date);
    return time.toLocaleTimeString();
  };

  const getDate = (date: any) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  const showErrorToast = (message: String) => {
    toast.error(message, {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 1000,
    });
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/order/${id}`, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result: any) => {
        showErrorToast(result.message);
        setSelectedOrder({})
      });
  };

  const tableData = orderList.map((order: any) => {
    return (
      <Orders
        key={order._id}
        order={order}
        getTime={getTime}
        getDate={getDate}
        handleModal={handleModal}
        setSelectedOrder={setSelectedOrder}
        handleDelete={handleDelete}
      />
    )
  })

  return (
    <div className="p-2 bg-white rounded-sm sm:p-5">
      <ToastContainer />
      <table className="table table-auto overflow-scroll w-full text-xs sm:text-sm">
        <thead className="text-center">
          <tr>
            <th className="">Hog no.</th>
            <th>Name</th>
            <th>No. Of kls</th>
            <th className="hidden sm:flex">Description</th>
            <th>Time</th>
            <th>Date</th>
            <th className="hidden sm:flex py-2">Amount | Paid</th>
            <th className="">Bal.</th>
            <th className="">Type</th>
            <th className="">action</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </div>
  );
}

export function Orders({
  order,
  getTime,
  getDate,
  handleModal,
  setSelectedOrder,
  handleDelete
}: any) {
  return (
    <tr
      key={order._id}
      className={`border-b-2 my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 text-center
      hover:bg-emerald-300 ${order.amount - order.paid_amount == 0 ? 'bg-emerald-200' : ''}`}
    >
      
      <td key={order._id} className="">
        {order.hog_number}
      </td>
      <td className="py-2">{order.last_name + ", " + order.first_name}</td>
      <td className="py-2">{order.no_of_kilos}</td>
      <td className="hidden sm:block p-2">{order.description}</td>
      <td className="py-2">{order.pick_up_time}</td>
      <td className="py-2">{order.pick_up_date}</td>
      <td className="hidden sm:block py-2">{order.amount} | {order.paid_amount}</td>
      {/* <td className="hidden sm:block py-2">{order.paid_amount}</td> */}
      <td className="py-2">{order.amount - order.paid_amount}</td>
      <td className="py-2">{order.order_type}</td>
      <td className="flex flex-col gap-3 py-2 sm:p-2 sm:flex-row">
        <button
          className="flex justify-center items-center"
          onClick={() => {
            handleModal(true);
            setSelectedOrder({
              _id: order._id,
              hog_number: order.hog_number,
              first_name: order.first_name,
              last_name: order.last_name,
              no_of_kilos: order.no_of_kilos,
              description: order.description,
              pick_up_time: order.pick_up_time,
              amount: order.amount,
              paid_amount: order.paid_amount,
              order_type: order.order_type,
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-pencil-fill text-green-600"
            viewBox="0 0 16 16"
          >
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
          </svg>
        </button>
        <button className="flex justify-center items-center"
        onClick={() => handleDelete(order._id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash2-fill text-red-600"
            viewBox="0 0 16 16"
          >
            <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
          </svg>
        </button>
      </td>
    </tr>

  );
}
