import { LoginResponse, UserProfile, UserSignin, UserSignup } from "./types";
import { api } from "../api";
import { CommonResult } from "../api.types";
import { GeneralApiProblem } from "../apiProblem";
import AsyncStorage from "@react-native-async-storage/async-storage";

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





