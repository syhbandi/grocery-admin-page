export type User = {
  id: string;
  username: string;
  full_name: string;
  email: string;
  image: string;
  role: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  unit: string;
  image: string;
  categories: Category[];
  images: Upload[];
};

export type Category = {
  id: string;
  name: string;
  images: Upload[];
};

export type Upload = {
  id: string;
  url: string;
};

export type OrderItem = {
  id: string;
  product_id: string;
  quantity: string;
  price: string;
  product: Product;
};

export type Order = {
  id: string;
  user_id: string;
  total_price: string;
  status: string;
  items: OrderItem[];
  date: string;
  user: User;
};
