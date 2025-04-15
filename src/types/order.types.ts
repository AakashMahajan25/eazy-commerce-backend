export type OrderItem = {
    id? : number,
    orderId? : number,
    productId? : number,
    quantity? : number,
    price? : number,
    product?: {
        id: number;
        name: string;
        price: number;
      };
}

export interface Order {
    id: number;
    userId: number;
    items: OrderItem[];
    totalAmount: number;
    status: OrderStatus;
    addressId: number;
    createdAt: Date;
    updatedAt: Date;
  }

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
