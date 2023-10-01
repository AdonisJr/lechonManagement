import { create } from "zustand";

interface Store {
  isLoading: boolean;
  user: {
    id: String;
    name: String;
    email: String;
    role: String;
  };
  orderList: [];
  selectedOrder: {
    _id: string;
    hog_number: string;
    first_name: string;
    last_name: string;
    no_of_kilos: string;
    description: string;
    pick_up_date: any;
    pick_up_time: any;
    amount: number;
    order_type: string;
    paid_amount: number;
  };
}

// actions interface
interface Actions {
  setLoading: (action: any) => void;
  setUser: (data: any) => void;
  setOrderList: (data: any) => void;
  setSelectedOrder: (data: any) => void;
}
const date = new Date();

// store
export const useStore = create<Store & Actions>((set) => ({
  isLoading: false,
  user: {
    id: "",
    name: "",
    email: "",
    role: "",
  },
  orderList: [],
  selectedOrder: {
    _id: "",
    hog_number: "",
    first_name: "",
    last_name: "",
    no_of_kilos: "",
    description: "",
    pick_up_date: "",
    pick_up_time: "",
    amount: 0,
    order_type: "",
    paid_amount: 0,
  },
  setLoading: (action) => set(() => ({ isLoading: action })),
  setUser: (details) =>
    set(() => ({
      user: {
        id: details.id,
        name: details.name,
        email: details.email,
        role: details.role,
      },
    })),
  setOrderList: (data) =>
    set(() => ({
      orderList: data,
    })),
  setSelectedOrder: (data) =>
    set(() => ({
      selectedOrder: data,
    })),
}));
