import { Order} from "./types";
import { api } from "../api";
import { ResultClass } from "../api.types";
import { GeneralApiProblem } from "../apiProblem";



export async function getOrders():Promise<ResultClass<Order[]>|GeneralApiProblem> {
    const response = await api.apiGetWrapper<ResultClass<Order[]>>(
        `/sale/sales`,
        null
    )
    return response
}






