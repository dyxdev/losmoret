import { ApiResponse } from "apisauce"

export type GeneralApiProblem =
  /**
   * Times up.
   */
  | { kind: "timeout"; temporary: true; message?: "Timeout" }
  /**
   * Cannot connect to the server for some reason.
   */
  | { kind: "cannotConnect"; temporary: true; message?: "Timeout" }
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | { kind: "server"; message?: "Timeout" }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: "unauthorized"; message?: "Timeout" }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { kind: "forbidden"; message?: "Timeout" }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { kind: "notFound"; message?: "Timeout" }
  /**
   * All other 4xx series errors.
   */
  | { kind: "rejected"; message?: "Timeout" }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: "unknown"; temporary: true; message?: "Timeout" }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: "badData"; message?: "Timeout" }

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(response: ApiResponse<any>): GeneralApiProblem | null {
  switch (response.problem) {
    case "CONNECTION_ERROR":
      return { kind: "cannotConnect", temporary: true }
    case "NETWORK_ERROR":
      return { kind: "cannotConnect", temporary: true }
    case "TIMEOUT_ERROR":
      return { kind: "timeout", temporary: true }
    case "SERVER_ERROR":
      return { kind: "server" }
    case "UNKNOWN_ERROR":
      return { kind: "unknown", temporary: true }
    case "CLIENT_ERROR":
      switch (response.status) {
        case 401:
          return { kind: "unauthorized" }
        case 403:
          return { kind: "forbidden" }
        case 404:
          return { kind: "notFound" }
        default:
          return { kind: "rejected" }
      }
    case "CANCEL_ERROR":
      return null
  }

  return null
}

export function isGeneralProblem(value:any){
  return 'kind' in value
}
