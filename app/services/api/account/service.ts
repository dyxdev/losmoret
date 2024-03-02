import { LoginResponse, UserProfile, UserSignin, UserSignup } from "./types";
import { api } from "../api";
import { CommonResult } from "../api.types";
import { GeneralApiProblem } from "../apiProblem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CallbackWithResult } from "@react-native-async-storage/async-storage/lib/typescript/types";
import { _rootStore, useStores } from "app/store";

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





