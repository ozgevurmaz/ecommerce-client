export const getCollections = async () => {
  try {
    const collections = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/collections`
    );
    return await collections.json();
  } catch (err) {
    console.log("FETCH_COLLECTIONS", err);
  }
};

export const getProducts = async () => {
  try {
    const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    return await products.json();
  } catch (err) {
    console.log("FETCH_PRODUCTS", err);
  }
};

export const getProductDetails = async (productId: string) => {
  try {
    const productDetails = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`
    );
    return await productDetails.json();
  } catch (err) {
    console.log("FETCH_PRODUCT_DETAILS", err);
  }
};
