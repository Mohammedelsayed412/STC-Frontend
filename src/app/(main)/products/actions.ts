import { APIS } from "@/constants/urls";
import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
import { IProduct } from "@/lib/interfaces";

export async function fetchProducts(): Promise<IProduct[]> {
  try {
    console.log("Fetching Products...");

    const url = `${APIS.products}`;
    console.log(`Fetching Products Request URL => ${url}`);

    const response = await axiosInterceptorInstance.get(url);
    console.log("response.data", response);
    // TODO ==> validate payload
    return response?.data;
  } catch (error: any) {
    console.error("Failed to fetch listing", error);
    return []
  }
}