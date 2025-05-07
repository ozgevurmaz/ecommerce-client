type CollectionType = {
    _id: string;
    title: string;
    slug: string;
    description: string;
    season: string;
    image: string;
    products: ProductType[];
  };
  
  type ProductType = {
    _id: string;
    title: string;
    description: string;
    media: string[];
    category: CategoryType;
    collections: CollectionType[];
    tags: string[];
    sizes: string[];
    colors: string[];
    expense: number;
    price: number;
    prices: Record<string, number>;
    stock: Record<string, number>;
  };
  
  type UserType = {
    clerkId: string;
    wishlist: [string];
    orders:[string];
    createdAt: string;
    updatedAt: string;
  }

  type CartItem = {
    item: ProductType;
    quantity: number;
    color?: string;
    size?: string;
  }

  type OrderType = {
    shippingAddress: Object;
    _id: string;
    customerClerkId: string;
    products: [OrderItemType]
    shippingRate: string;
    totalAmount: number
  }
  
  type OrderItemType = {
    product: ProductType;
    color: string;
    size: string;
    quantity: number;
    _id: string;
  }

  type CategoryType = {
    _id: string;
    title: string;
    slug: string;
    description: string;
    image: string;
    isActive: boolean;
    products: string[];
    createdAt: string;
    updatedAt: string;
  };