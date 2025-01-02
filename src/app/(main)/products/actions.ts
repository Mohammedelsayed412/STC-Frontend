"use server";

import { APIS } from "@/constants/urls";
import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
import { ICartItem, IProduct } from "@/lib/interfaces";

export async function fetchProducts(currentpage: number): Promise<any> {
  try {
    console.log("Fetching Products...");

    const url = `${APIS.products}?page=${currentpage}&size=20`;
    console.log(`Fetching Products Request URL => ${url}`);

    const response = await axiosInterceptorInstance.get(url);
    // TODO ==> validate payload
    const productsData = response?.data?.products;
    const totalPages = response?.data?.totalPages;
    return { productsData, totalPages };
  } catch (error: any) {
    console.error("Failed to fetch products", error);
    throw new Error();
  }
}

export async function editCartItems(items: any): Promise<any> {
  try {
    console.log("Editing Cart Items...");

    const url = `${APIS.cart}/edit`;
    console.log(`Editing Cart Items => ${url}`);
    const body = {
      items: items,
    };
    console.log("body", body);

    await axiosInterceptorInstance.put(url, body);
    return true;
  } catch (error: any) {
    console.error("Edit Cart Items", error);
    throw new Error();
  }
}
