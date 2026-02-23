export interface OrderItem {
  _id: string;
  count: number;
  price: number;
  product: {
    id: string;
    title: string;
    imageCover: string;
  };
}

export interface Order {
  _id: string;
  isPaid: boolean;
  isDelivered: boolean;
  totalOrderPrice: number;
  paymentMethodType: string;
  createdAt: string;
  cartItems: OrderItem[];
}