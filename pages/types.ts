export type formats = "small" | "medium" | "large" | "thumbnail";

export type product = {
  title: string;
  description: string;
  price: number;
  slug: string;
  image: {
    data: {
      attributes: {
        formats: {
          [key in formats]: {
            url: string;
          };
        };
      };
    };
  };
  quantity?: number;
};

export type attributes = {
  attributes: product;
};
export type data = {
  products: {
    data: attributes[];
  };
};

export interface IShopContext {
  quantity: number;
  increment: () => void;
  decrement: () => void;
  onAdd: (product: product, quantity: number) => void;
  onRemove: (product: product) => void;
  cartItems: product[];
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  totalQuantities: number;
  totalPrice: number;
}
