import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStore } from "@/store";

export default function Modal({ handleModal}: any) {
  const [error, setError] = useState({
    message: "",
  });
  const [setOrderList, orderList, selectedOrder, setSelectedOrder] = useStore(
    (state) => [
      state.setOrderList,
      state.orderList,
      state.selectedOrder,
      state.selectedOrder
    ]
  );
  const [orderDetails, setOrderDetails] = useState(
    selectedOrder._id
      ? {
          hog_number: selectedOrder.hog_number,
          first_name: selectedOrder.first_name,
          last_name: selectedOrder.last_name,
          no_of_kilos: selectedOrder.no_of_kilos,
          description: selectedOrder.description,
          pick_up_date: selectedOrder.pick_up_date,
          pick_up_time: selectedOrder.pick_up_time,
          amount: selectedOrder.amount,
          order_type: selectedOrder.order_type,
          paid_amount: selectedOrder.paid_amount,
        }
      : {
          hog_number: "",
          first_name: "",
          last_name: "",
          no_of_kilos: "",
          description: "",
          pick_up_date: "",
          pick_up_time: "",
          amount: 0,
          order_type: "order",
          paid_amount: 0,
        }
  );

  // TOAST MESSAGE
  const showSuccessToast = (message: String) => {
    toast.success(message, {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 1000,
    });
  };

  const showErrorToast = (message: String) => {
    toast.error(message, {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 1000,
    });
  };

  // handle change functions

  const handleHogNumber = (e: any) => {
    setOrderDetails({ ...orderDetails, hog_number: e.target.value });
  };

  const handleFirstName = (e: any) => {
    setOrderDetails({ ...orderDetails, first_name: e.target.value });
  };
  const handleLastName = (e: any) => {
    setOrderDetails({ ...orderDetails, last_name: e.target.value });
  };
  const handleNoOfKilos = (e: any) => {
    setOrderDetails({ ...orderDetails, no_of_kilos: e.target.value });
  };
  const handleDescription = (e: any) => {
    setOrderDetails({ ...orderDetails, description: e.target.value });
  };
  const handlePickUpDate = (e: any) => {
    setOrderDetails({ ...orderDetails, pick_up_date: e.target.value });
  };
  const handlePickUpTime = (e: any) => {
    setOrderDetails({ ...orderDetails, pick_up_time: e.target.value });
  };
  const handleAmount = (e: any) => {
    setOrderDetails({ ...orderDetails, amount: e.target.value });
  };
  const handleOrderType = (e: any) => {
    setOrderDetails({ ...orderDetails, order_type: e.target.value });
  };
  const handlePaidAmount = (e: any) => {
    setOrderDetails({ ...orderDetails, paid_amount: e.target.value });
    if (Number(e.target.value) > Number(orderDetails.amount))
      return setError({
        message: "The amount you entered exceeds the total amount due.",
      });
    setError({ message: "" });
  };

  // handle submit function

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (error.message) return showErrorToast(error.message);
    if (orderDetails.pick_up_time == "")
      return showErrorToast("Error, please select Date and Time");
    selectedOrder._id
      ? await fetch(`/api/order/${selectedOrder._id}`, {
          method: "put",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(orderDetails),
        })
          .then((res) => res.json())
          .then((result: any) => {
            showSuccessToast("Successfully updated");
            // setOrderList(orderList);
            // setSelectedOrder({
            //   _id: "",
            //   hog_number: "",
            //   first_name: "",
            //   last_name: "",
            //   no_of_kilos: "",
            //   description: "",
            //   pick_up_time: "",
            //   amount: "",
            //   paid_amount: "",
            //   order_type: "",
            // })
            setTimeout(() => {
              handleModal(false);
            }, 2000);
          })
      : await fetch("/api/order", {
          method: "post",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(orderDetails),
        })
          .then((res) => res.json())
          .then((result: any) => {
            showSuccessToast(result.message);
            setTimeout(() => {
              handleModal(false);
            }, 2000);
          });
  };

  return (
    <div
      id="defaultModal"
      className="flex justify-center items-center fixed top-0 left-0 right-0 z-50 w-scree p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <ToastContainer />
      <div className="relative w-full max-w-2xl max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add Order
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => handleModal(false)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div className="p-6 space-y-6">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              {/* Hog number */}
              <div className="flex flex-col">
                <label
                  className="block mb-2 text-sm font-medium
                    text-gray-900 dark:text-white px-2"
                >
                  Hog no.
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-sm focus:ring-blue-500 focus:border-blue-500
                                py-2 px-2"
                  placeholder="T11"
                  onChange={handleHogNumber}
                  value={orderDetails.hog_number}
                />
              </div>
              {/* Name */}
              <div className="flex flex-col">
                <label
                  className="block mb-2 text-sm font-medium
                 text-gray-900 dark:text-white px-2"
                >
                  Name
                </label>
                <div className="flex w-full gap-1">
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-sm focus:ring-blue-500 focus:border-blue-500
                                py-2 px-2 w-3/6"
                    placeholder="First name"
                    onChange={handleFirstName}
                    value={orderDetails.first_name}
                  />
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-sm focus:ring-blue-500 focus:border-blue-500
                                py-2 px-2 w-3/6"
                    placeholder="Last name"
                    onChange={handleLastName}
                    value={orderDetails.last_name}
                  />
                </div>
              </div>
              {/* Number of kilos */}
              <div className="flex items-center flex-wrap sm:flex-nowrap gap-2 w-6/6">
                <div className="flex flex-col w-full sm:w-3/6">
                  <label
                    className="block mb-2 text-sm font-medium
                    text-gray-900 dark:text-white px-2"
                  >
                    Number of Kilos
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-sm focus:ring-blue-500 focus:border-blue-500
                                py-2 px-2"
                    onChange={handleNoOfKilos}
                    value={orderDetails.no_of_kilos}
                  />
                </div>

                <div className="flex flex-col w-full sm:w-3/6">
                  <label
                    className="block mb-2 text-sm font-medium
                    text-gray-900 dark:text-white px-2"
                  >
                    Pick up Time
                  </label>
                  <input
                    type="time"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-sm focus:ring-blue-500 focus:border-blue-500
                                py-2 px-2"
                    placeholder="Pickup time"
                    onChange={handlePickUpTime}
                    defaultValue={orderDetails.pick_up_time}
                  />
                </div>
                <div className="flex flex-col w-full sm:w-3/6">
                  <label
                    className="block mb-2 text-sm font-medium
                    text-gray-900 dark:text-white px-2"
                  >
                    Pick up Date
                  </label>
                  <input
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-sm focus:ring-blue-500 focus:border-blue-500
                                py-2 px-2"
                    placeholder="Pickup time"
                    onChange={handlePickUpDate}
                    defaultValue={orderDetails.pick_up_date}
                  />
                </div>
              </div>

              {/* Description */}

              <div className="flex flex-col">
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-sm focus:ring-blue-500 focus:border-blue-500
                                py-2 px-2"
                  placeholder="Description"
                  onChange={handleDescription}
                  value={orderDetails.description}
                />
              </div>
              {/* AMOUNT */}
              <div className="flex items-center gap-2 w-6/6">
                <div className="flex flex-col w-3/6">
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-sm focus:ring-blue-500 focus:border-blue-500
                                py-2 px-2"
                    placeholder="Amount"
                    onChange={handleAmount}
                    value={orderDetails.amount}
                  />
                </div>

                <div className="flex flex-col w-3/6">
                  <select
                    name=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                    rounded-sm focus:ring-blue-500 focus:border-blue-500
                    py-2 px-2"
                    onChange={handleOrderType}
                    value={orderDetails.order_type}
                  >
                    <option className="p-2" value="order">
                      Order
                    </option>
                    <option className="p-2" value="labor">
                      Labor
                    </option>
                  </select>
                </div>
              </div>
              {/* Paid amount */}

              <div className="flex flex-col">
                <label
                  className="block mb-2 text-sm font-medium
                    text-gray-900 dark:text-white px-2"
                >
                  Paid amount
                </label>
                <input
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-sm focus:ring-blue-500 focus:border-blue-500
                                py-2 px-2"
                  placeholder="100"
                  onChange={handlePaidAmount}
                  value={orderDetails.paid_amount}
                />
              </div>
            </form>
          </div>
          {/* <!-- Modal footer --> */}
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="defaultModal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSubmit}
            >
              SAVE CHANGES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
