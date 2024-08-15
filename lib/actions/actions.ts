const header = {
  "Cache-Control": "no-cache",
  "Content-Type": "application",
};

export const getCollections = async () => {
  try {
    const collections = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/collections`,
      { headers: header }
    );
    return await collections.json();
  } catch (err) {
    console.log("FETCH_COLLECTIONS", err);
  }
};

export const getCollectionDetails = async (collectionId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`,
      {
        headers: header,
      }
    );
    return await res.json();
  } catch (error) {
    console.log("[FETCH_COLLECTION_DETAILS]", error);
  }
};

export const getProducts = async () => {
  try {
    const products = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      {
        headers: header,
      }
    );
    return await products.json();
  } catch (err) {
    console.log("FETCH_PRODUCTS", err);
  }
};

export const getProductDetails = async (productId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`
    );
    return await res.json();
  } catch (err) {
    console.log("FETCH_PRODUCT_DETAILS", err);
  }
};

export const getSearchResults = async (query: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/search/${query}`
    );
    return await res.json();
  } catch (error) {
    console.log("[FETCH_SEARCH_RESULTS]", error);
  }
};

export const getOrders = async (userId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${userId}`
    );
    return await res.json();
  } catch (error) {
    console.log("[FETCH_ORDERS]", error);
  }
};