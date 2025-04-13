// export interface Product {
//   id: number;
//   name: string;
//   slug: string;
//   description: string;
//   price: number;
//   stock: number;
//   images: string[];
//   categoryId: number;
//   category?: Category;
//   reviews?: Review[];
//   cartItems?: CartItem[];
//   orderItems?: OrderItem[];
//   createdAt: Date;
//   updatedAt: Date;
// }

// interface Category {
//   id: number;
//   name: string;
//   slug: string;
//   products?: Product[];
//   createdAt: Date;
// }

// interface Review {
//   id: number;
//   rating: number;
//   comment?: string;
//   userId: number;
//   productId: number;
//   user?: User;
//   product?: Product;
//   createdAt: Date;
// }

// interface CartItem {
//   id: number;
//   cartId: number;
//   cart?: Cart;
//   productId: number;
//   product?: Product;
//   quantity: number;
//   createdAt: Date;
// }

// interface OrderItem {
//   id: number;
//   orderId: number;
//   order?: Order;
//   productId: number;
//   product?: Product;
//   quantity: number;
//   price: number;
// }


type productUpdateData = {
  name? : string,
  slug? : string,
  description? : string,
  price? : number,
  stock? : number,
  categoryId? : number,
  images? : string[]
}