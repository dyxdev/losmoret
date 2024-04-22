import { Address, LoginResponse, UserProfile, UserSignin, UserSignup } from "./types";
import { api } from "../api";
import { CommonResult, ResultClass } from "../api.types";
import { GeneralApiProblem } from "../apiProblem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CallbackWithResult } from "@react-native-async-storage/async-storage/lib/typescript/types";
import { _rootStore } from "app/store";

export async function userSignup(data:UserSignup):Promise<CommonResult|GeneralApiProblem> {
    const response = await api.apiPostWrapper<CommonResult>(
        "/auth/signup",
        {
            params:data
        }
    )
    return response
}

export async function login(data:UserSignin):Promise<LoginResponse|GeneralApiProblem> {
    const response = await api.apiPostWrapper<LoginResponse>(
        "auth/signin",
        {
            "jsonrpc": "2.0",
            params:data
        }
    )
    
    return response
}

export async function logout():Promise<CommonResult|GeneralApiProblem> {
    const response = await api.apiPostWrapper<CommonResult>(
        "/auth/logout",
        undefined
    )
    return response
}

export async function updateProfile(data:UserProfile):Promise<CommonResult|GeneralApiProblem> {
    const response = await api.apiPostWrapper<CommonResult>(
        "/user/profile",
        {params:data}
    )
    return response
}

export async function setAuthTokenSession(value:any){
    await AsyncStorage.setItem("odoo_token",value)
}

export async function getAuthTokenSession(callback?: CallbackWithResult<string> | undefined){
    return await AsyncStorage.getItem("odoo_token",callback)
}

export async function removeAuthTokenSession(){
    await AsyncStorage.removeItem("odoo_token")
}

export async function refreshStorageAuth(){

    const store = _rootStore.authenticationStore

    getAuthTokenSession((error?: Error | null, result?: string | null)=>{
        if(!error){
            store.setAuthToken(result == null ? undefined : result)
        }
 })
}

export async function setCookies(value:string){
    const cookies = value + ";frontend_lang=es_MX;tZ=America/Havana"
    await AsyncStorage.setItem("cookies",cookies)
}


export async function getAddress():Promise<ResultClass<Address[]>|GeneralApiProblem> {
    const response = await api.apiGetWrapper<ResultClass<Address[]>>(
        "/user/address",
        {}
    )
    return response
}

export async function postAddress(data:Address):Promise<ResultClass<Address>|GeneralApiProblem> {
    const response = await api.apiPostWrapper<ResultClass<Address>>(
        "/user/address",
        {
            "jsonrpc": "2.0",
            params:data
        }
    )
    return response
}

export async function putAddress(id:string|number,data:Address):Promise<ResultClass<Address>|GeneralApiProblem> {
    const response = await api.apiPostWrapper<ResultClass<Address>>(
        `/user/address/${id}`,
        {
            "jsonrpc": "2.0",
            params:data
        },
        true
    )
    return response
}

export async function deleteAddress(id:string|number):Promise<CommonResult|GeneralApiProblem> {
    const response = await api.apiDeleteWrapper<ResultClass<Address>>(
        `/user/address/delete?ids=${id}`
    )
    return response
}





