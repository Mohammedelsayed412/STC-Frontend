import { APIS } from "@/constants/urls";
import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
import { IProduct } from "@/lib/interfaces";

export async function fetchProducts(currentpage: number): Promise<any> {
  try {
    console.log("Fetching Products...");

    const url = `${APIS.products}?page=${currentpage}&size=20`;
    console.log(`Fetching Products Request URL => ${url}`);

    const response = await axiosInterceptorInstance.get(url);
    console.log("response.data", response);
    // TODO ==> validate payload
    const productsData = response?.data?.products;
    const totalPages = response?.data?.totalPages;
    return { productsData, totalPages };
  } catch (error: any) {
    console.error("Failed to fetch products", error);
    throw new Error()
  }
}
