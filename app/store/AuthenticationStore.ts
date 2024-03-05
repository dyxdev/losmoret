import { Instance, SnapshotOut, flow, types } from "mobx-state-tree"
import { translate } from "../i18n"
import { login as loginApi,logout as logoutApi, refreshStorageAuth, removeAuthTokenSession } from "./../services/api/account/service"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    authEmail: "",
    authPassword: "",
    userInfo: types.frozen({
      name: "",
      lastname: "",
      lang: "",
      currency_id: 0,
      address_id: 0,
      userid: 0,
    }) as any,
  })
  .views((store) => ({
    get isAuthenticated() {
      refreshStorageAuth()
      return !!store.authToken
    },
    get validationError() {
      if (store.authEmail.length === 0) return translate("fieldsValidation.blank")
      if (store.authEmail.length < 6) return translate("fieldsValidation.min", { min: "6" })
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
        return translate('errors.invalidEmail')
      return null
    },
    get validationErrorPassword() {
      if (store.authPassword.length === 0) return translate("fieldsValidation.blank")
      return null
    },
    get asValidationError(){
        return this.validationError !=null || this.validationErrorPassword != null
    }
  }))
  .actions((store) => ({
    setAuthToken(value?: string) {
      store.authToken = value
    },
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, "")
    },
    setAuthPassword(value: string) {
      store.authPassword = value.replace(/ /g, "")
    },
    logout: flow(function* logout() {
      store.authEmail = ""
      store.authPassword = ""
      try {
        yield logoutApi()
        yield removeAuthTokenSession()
        store.authEmail = ""
        store.authPassword = ""
        store.authToken = undefined
      } catch (error) {
        store.authToken = undefined
      }
      
    }),
    userLogin: flow(function* userLogin() {
      return yield loginApi({
        email: store.authEmail,
        password: store.authPassword,
      })
    }),
    setUserInfo(value:any){
           store.userInfo = value
    }
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
