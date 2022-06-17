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
};

export type attributes = {
  attributes: product;
};
export type data = {
  products: {
    data: attributes[];
  };
};
