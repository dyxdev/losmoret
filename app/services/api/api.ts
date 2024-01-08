/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"
import type { ApiConfig, ApiFeedResponse } from "./api.types"
import type { EpisodeSnapshotIn } from "../../models/Episode"
import AsyncStorage from "@react-native-async-storage/async-storage"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        From: 'app', 
      },
    })
  }

  /**
   * Gets a list of recent React Native Radio episodes.
   */
  async getEpisodes(): Promise<{ kind: "ok"; episodes: EpisodeSnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(
      `api.json?rss_url=https%3A%2F%2Ffeeds.simplecast.com%2FhEI_f9Dx`,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data

      // This is where we transform the data into the shape we expect for our MST model.
      const episodes: EpisodeSnapshotIn[] =
        rawData?.items.map((raw) => ({
          ...raw,
        })) ?? []

      return { kind: "ok", episodes }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.tron.error?.(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "badData" }
    }
  }

  async apiGetWrapper<T>(url:string,parameters:any): Promise<T | GeneralApiProblem> {
    
    const response: ApiResponse<T> = await this.apisauce.get(
      url,
      parameters
      
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response.data
      return !rawData?.error?.code ? rawData as T :  { kind: rawData.error?.code ?? "unknown", temporary: true, message: rawData.error?.message }
    } catch (e) {
      return this.onError<T>(e, response)
    }
  }

  private onError<T>(e: unknown, response: ApiResponse<T>):GeneralApiProblem {
    if (__DEV__ && e instanceof Error) {
      console.tron.error?.(`Bad data: ${e.message}\n${response.data}`, e.stack)
    }
    return { kind: "badData" }
  }

  async apiPostWrapper<T>(url:string,body:any,isPut=false): Promise<T | GeneralApiProblem> {
    console.log(this.config.url,url,body)
    const response: ApiResponse<T> = !isPut ? await this.apisauce.post<T>(
      url,
      body
    ) :   
    await this.apisauce.put<T>(
      url,
      body
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response.data
      return !rawData?.error?.code ? rawData as T :  { kind: rawData.error?.code ?? "unknown", temporary: true, message: rawData.error?.message }
    } catch (e) {
      return this.onError<T>(e, response)
    }
  }

  async apiDeleteWrapper<T>(url:string): Promise<T | GeneralApiProblem> {
    
    const response: ApiResponse<T> = await this.apisauce.delete(
      url
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response.data
      return !rawData?.error?.code ? rawData as T :  { kind: rawData.error?.code ?? "unknown", temporary: true, message: rawData.error?.message }
    } catch (e) {
      return this.onError<T>(e, response)
    }
  }


}




const api = new Api()
const naviMonitor = (response: any) => console.log('hey!  listen! ', response)

api.apisauce.addMonitor(naviMonitor)

api.apisauce.addAsyncRequestTransform(async request => {
  console.log('hey!  listen! request:', request)
  const token =  await AsyncStorage.getItem('odoo_token')
  console.log(token)
  if(request.headers && token){
    request.headers.Authorization = `Bearer ${token}`
  }
})

export {api}
