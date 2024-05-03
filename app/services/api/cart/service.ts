import { AddCart, CartAddResponse, DeleteCartResponse, GetCartResponse} from "./types";
import { api } from "../api";
import { CommonResult, ResultClass } from "../api.types";
import { GeneralApiProblem } from "../apiProblem";

export async function getCart():Promise<ResultClass<GetCartResponse>|GeneralApiProblem> {
    const response = await api.apiGetWrapper<ResultClass<GetCartResponse>>(
        "/sale/cart",
        undefined
    )
    return response
}

export async function add2Cart(data:AddCart):Promise<ResultClass<CartAddResponse>|GeneralApiProblem> {
    const response = await api.apiPostWrapper<ResultClass<CartAddResponse>>(
        "/sale/cart/add",
        {
            jsonrpc:"2.0",
            params:data
        }
    )
    return response
}

export async function modifyCart(data:AddCart):Promise<CommonResult|GeneralApiProblem> {
    const response = await api.apiPostWrapper<CommonResult>(
        "/sale/cart/update",
        {
            jsonrpc:"2.0",
            params:data
        },
        true
    )
    return response
}

export async function deleteLineCart(id:any):Promise<ResultClass<DeleteCartResponse>|GeneralApiProblem> {
    const response = await api.apiDeleteWrapper<ResultClass<DeleteCartResponse>>(
        `/sale/cart/delete/${id}`
    )
    return response
}

export async function applyPricelist(id:any):Promise<ResultClass<GetCartResponse>|GeneralApiProblem> {
    const response = await api.apiGetWrapper<ResultClass<GetCartResponse>>(
        `/sale/apply_pricelist/${id}`,
        undefined
    )
    return response
}








