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
