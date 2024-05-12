import { Instance, SnapshotOut, flow, types } from "mobx-state-tree"
import { translate } from "../i18n"
import { getStateByCountry, postAddress, putAddress } from "app/services/api/account/service"
import { isGeneralProblem } from "app/services/api/apiProblem"
import { runInAction } from "mobx"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const AddressStoreModel = types
  .model("AddressStore")
  .props({
    id: -1,
    name: "",
    street: "",
    street2: "",
    _zip: "",
    country_id: 51,
    state_id: -1,
    city: "",
    phone: "",
    mobile: "",
    comment: "",
    _type: "contact",
    temporal: false,
    states: types.frozen([] as Array<{id:string,name:string}>),
  })
  .views((store) => ({
    get stateArray(){
        return store.states
    },
    get state(){
      return store.state_id
  },
    get validationName() {
      if (store.name.length === 0) return translate("fieldsValidation.blank")
      return null
    },
    get validationStreet() {
      if (store.street.trim().length === 0) return translate("fieldsValidation.blank")
      return null
    },
    get validationCity() {
      if (store.city.trim().length === 0) return translate("fieldsValidation.blank")
      return null
    },
    get validationZip() {
      if (store._zip.trim().length === 0) return translate("fieldsValidation.blank")
      return null
    },
    get validationState() {
      if (store.state_id !== -1) return translate("fieldsValidation.blank")
      return null
    },
    get validationPhone() {
      if (!/^\d{8}$/.test(store.phone) && store.phone != null) {
        return "El número de teléfono no cumple con el formato de Cuba"
      }
      return null
    },
    get validationMobile() {
      if (!/^\d{8}$/.test(store.mobile) && store.mobile != null) {
        return "El número de teléfono no cumple con el formato de Cuba"
      }
      return null
    },
    get asValidationError() {
      return (
        this.validationName != null ||
        this.validationStreet != null ||
        this.validationState != null ||
        this.validationPhone != null ||
        this.validationMobile != null ||
        this.validationCity
      )
    },
  }))
  .actions(withSetPropAction)
  .actions((store) => ({
    setName(value: string) {
      store.name = value.replace(/ /g, "")
    },
    setStreet(value: string) {
      store.street = value.replace(/ /g, "")
    },
    setStreet2(value: string) {
      store.street2 = value.replace(/ /g, "")
    },
    setState(value: number) {
      store.setProp("state_id",value)
    },
    setCity(value: string) {
      store.city = value
    },
    setZip(value: string) {
      store._zip = value.replace(/ /g, "")
    },
    setPhone(value: string) {
      store.phone = "+53" + value.replace(/ /g, "")
    },
    setMobile(value: string) {
      store.mobile = "+53" + value.replace(/ /g, "")
    },
    cleanStore() {
      store.name = ""
      store.street = ""
      store.street2 = ""
      store._zip = ""
      store.state_id = -1
      store.city = ""
      store.phone = ""
      store.mobile = ""
      store.comment = ""
    },
    saveAddreess: flow(function* saveAddreess() {
      return postAddress({
        name: store.name,
        street: store.street,
        street2: store.street2,
        _zip: store._zip,
        country_id: store.country_id,
        state_id: store.state_id,
        phone: store.phone,
        mobile: store.mobile,
        city: store.city,
      })
    }),
    updateAddreess: flow(function* saveAddreess() {
      return putAddress(store.id, {
        name: store.name,
        street: store.street,
        street2: store.street2,
        _zip: store._zip,
        country_id: store.country_id,
        state_id: store.state_id,
        phone: store.phone,
        mobile: store.mobile,
        city: store.city,
      })
    }),
    sucessFetch(
      result:
        {
          id: string | number
          name: string
        }[]
      ,
    ) {
      store.setProp("states", result as any)
    },
    async fetchStates() {
      try {
        // ... yield async/await service
        const response = await getStateByCountry(store.country_id)
        
        if (!isGeneralProblem(response)) {
          const result = (response as any).result
          runInAction(() => {
            this.sucessFetch(result)
          })
        } 
      } catch (error) {
        // ... try/catch
      }
    },
    getState: flow(function* getState() {
      return getStateByCountry(store.country_id)
    }),
  }))

export interface AddressStore extends Instance<typeof AddressStoreModel> {}
export interface AddressStoreModelSnapshot extends SnapshotOut<typeof AddressStoreModel> {}
