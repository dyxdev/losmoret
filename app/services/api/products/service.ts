import { Product, ProductListParams, Category} from "./types";
import { api } from "../api";
import { CommonResult, PaginateResponse, ResultClass } from "../api.types";
import { GeneralApiProblem } from "../apiProblem";

export async function productList(params:ProductListParams):Promise<ResultClass<PaginateResponse<Product>>|GeneralApiProblem> {
    const response = await api.apiGetWrapper<ResultClass<PaginateResponse<Product>>>(
        "/products",
        params
    )
    return response
}

export async function searchProducts(params:ProductListParams):Promise<CommonResult|GeneralApiProblem> {
    const response = await api.apiGetWrapper<CommonResult>(
        "/products/search",
        params
    )
    return response
}

export async function productDetail(id:number|string):Promise<ResultClass<Product>|GeneralApiProblem> {
    const response = await api.apiGetWrapper<ResultClass<Product>>(
        `/product/${id}`,
        null
    )
    return response
}

export async function getCategory():Promise<ResultClass<PaginateResponse<Category>>|GeneralApiProblem> {
    const response = await api.apiGetWrapper<ResultClass<PaginateResponse<Category>>>(
        "/product/categories",
        {}
    )
    return response
}

export async function getProductSearch(query:string):Promise<ResultClass<ResultClass<PaginateResponse<Product>>>|GeneralApiProblem> {
    const response = await api.apiGetWrapper<ResultClass<ResultClass<PaginateResponse<Product>>>>(
       `/products/name/${query}?take=100`,
        {}
    )
    return response
}










