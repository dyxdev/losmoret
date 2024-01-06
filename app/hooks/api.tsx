import { PaginateResponse, ResultClass, api } from "app/services/api"
import React,{useCallback} from "react"

export function usePaginatedResponse<T,P>(url:string,params?:P|null){
    
    const [refreshing, setRefreshing] = React.useState(false)
    const [initialUrl, setUrl] = React.useState(url)
    const [initialParams, setParams] = React.useState(params)
    const [isLoading, setIsLoading] = React.useState(false)
    
    const callEndpoint = useCallback(async ()=>{
        const response = await api.apiGetWrapper<ResultClass<PaginateResponse<T>>>(
            initialUrl,
            params
        )
        return response
    },[initialUrl,initialParams])

    
    return {
        refreshing, setRefreshing,
        isLoading, setIsLoading,
        callEndpoint,
        setUrl,
        setParams,
    }

}