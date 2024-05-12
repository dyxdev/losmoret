import { Instance, SnapshotOut, flow, types } from "mobx-state-tree"
import { translate } from "../i18n"
import { userSignup } from "./../services/api/account/service"

export const RegisterStoreModel = types
  .model("RegisterStore")
  .props({
    authEmail: "",
    authPassword: "",
    confirmPassword: "",
    name: "",
    lastname: "",
    lang: "es_MX",
    resultMessage: translate("MessagesScreen.confirm")
    })
  .views((store) => ({
  
    get validationError() {
      if (store.authEmail.length === 0) return translate("fieldsValidation.blank")
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
        return translate('errors.invalidEmail')
      return null
    },
    get validationName() {
      if (store.name.trim().length === 0) return translate("fieldsValidation.blank")
      return null
    },
    get validationLastName() {
      if (store.lastname.trim().length === 0) return translate("fieldsValidation.blank")
      return null
    },
    get validationErrorPassword() {
      if (store.authPassword.trim().length === 0) return translate("fieldsValidation.blank")
      return null
    },
    get validationErrorConfirmPassword() {
      if (store.confirmPassword.length === 0) return translate("fieldsValidation.blank")

      if(store.confirmPassword !== store.authPassword) return translate("fieldsValidation.notEqual")

      return null
    },
    get asValidationError(){
      return this.validationError !=null || this.validationErrorPassword != null || this.validationErrorConfirmPassword != null
    }
  }))
  .actions((store) => ({
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, "")
    },
    setAuthPassword(value: string) {
      store.authPassword = value.replace(/ /g, "")
    },
    setConfirmAuthPassword(value: string) {
      store.confirmPassword = value.replace(/ /g, "")
    },
    setName(value: string) {
      store.name = value.replace(/ /g, "")
    },
    setLastName(value: string) {
      store.lastname = value.replace(/ /g, "")
    },
    setResultMessage(value: string) {
      store.resultMessage = value.replace(/ /g, "")
    },
    userRegister: flow(function* userRegister() {
      return yield userSignup({
        email: store.authEmail,
        password: store.authPassword,
        name: store.name,
        lastname: store.lastname,
        confirm_password: store.confirmPassword,
        lang: store.lang
      })
    })
  }))

export interface AuthenticationStore extends Instance<typeof RegisterStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof RegisterStoreModel> {}
