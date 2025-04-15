export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categoryId: number;
  category?: Category;
  reviews?: Review[];
  cartItems?: CartItem[];
  orderItems?: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  products?: Product[];
  createdAt: Date;
}

export interface Review {
  id: number;
  rating: number;
  comment?: string;
  userId: number;
  productId: number;
  user?: User;
  product?: Product;
  createdAt: Date;
}

export interface CartItem {
  id: number;
  cartId: number;
  cart?: Cart;
  productId: number;
  product?: Product;
  quantity: number;
  createdAt: Date;
}

export interface OrderItem {
  id: number;
  orderId: number;
  order?: Order;
  productId: number;
  product?: Product;
  quantity: number;
  price: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  role: 'USER' | 'ADMIN';
  reviews?: Review[];
  cart?: Cart;
  orders?: Order[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Cart {
  id: number;
  userId: number;
  user?: User;
  items?: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: number;
  userId: number;
  user?: User;
  items?: OrderItem[];
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export type productUpdateData = {
  name? : string,
  slug? : string,
  description? : string,
  price? : number,
  stock? : number,
  categoryId? : number,
  images? : string[]
}