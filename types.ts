
export enum Category {
  DEALS = 'MFC Special Deals',
  BURGERS = 'Burger',
  SHAWARMA = 'Shawarma',
  ROLL_PARATHA = 'Roll Paratha',
  CRISPY_CHICKEN = 'Crispy Chicken',
  PIZZA = 'Pizza',
  SIDES = 'Sides',
  PLATTER = 'Special MFC Platter',
  PASTA = 'Pasta'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  calories?: string;
  isPopular?: boolean;
  isDeal?: boolean;
  originalPrice?: number;
}

export interface CartItem extends Product {
  quantity: number;
}
