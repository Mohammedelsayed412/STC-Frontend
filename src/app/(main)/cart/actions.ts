import { APIS } from "@/constants/urls";
import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";

export async function fetchCart(): Promise<any> {
  try {
    console.log("Fetching cart ...");
    const url = `${APIS.cart}`;
    console.log(`Fetching cart Request URL => ${url}`);
    const response = await axiosInterceptorInstance.get(url);
    console.log("response.data", response);
    // TODO ==> validate payload
    const cartData = response?.data?.products;
    const totalPrice = response?.data?.totalPrice;
    const totalNumber = response?.data?.totalNumber;
    return {cartData, totalPrice, totalNumber};
  } catch (error: any) {
    console.error("Failed to fetch cart", error);
    throw new Error();
  }
}
