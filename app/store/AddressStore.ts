import { Instance, SnapshotOut, flow, types } from "mobx-state-tree"
import { translate } from "../i18n"
import { getAddress, getAddressById, getStateByCountry, postAddress, putAddress } from "app/services/api/account/service"
import { isGeneralProblem } from "app/services/api/apiProblem"
import { runInAction } from "mobx"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { ResultClass } from "app/services/api"
import { Address } from "app/services/api/account/types"

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
      if (store.state_id === -1) return translate("fieldsValidation.blank")
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
        this.validationCity
      )
    },
  }))
  .actions(withSetPropAction)
  .actions((store) => ({
    setName(value: string) {
      store.name = value
    },
    setStreet(value: string) {
      store.street = value
    },
    setStreet2(value: string) {
      store.street2 = value
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
      store.phone = value.replace(/ /g, "")
      store.mobile = value.replace(/ /g, "")
    },
    setMobile(value: string) {
      store.mobile = value.replace(/ /g, "")
    },
    cleanStore() {
      store.id = -1
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
        "street2": store.street2,
        _zip: store._zip,
        country_id: store.country_id,
        state_id: store.state_id,
        phone: store.phone,
        mobile: store.mobile,
        city: store.city,
        "_type": store._type
      })
    }),
    updateAddreess: flow(function* updateAddreess(id) {
      return putAddress(id, {
        name: store.name,
        street: store.street,
        "street2": store.street2,
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
    sucessFetchOne(
      result:Address
    ) {
      store.setProp("name",result.name)
      store.setProp("street",result.street)
      store.state_id = result.state_id[0]
      store.city = result.city
      store.phone = result.phone
      store.mobile = result.mobile
      if(typeof result.street2 === 'string'  ){
        store.street2 = result.street2
      }
      
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
    async fetchAddress(id) {
      if(id){
        try {
          // ... yield async/await service
          const response = await getAddressById(id)
          
          if (!isGeneralProblem(response)) {
            const result = (response as ResultClass<Address>).result
            runInAction(() => {
              this.sucessFetchOne(result)
            })
          } 
        } catch (error) {
          console.log(error)
        } 
      }
      
    },
    getState: flow(function* getState() {
      return getStateByCountry(store.country_id)
    }),
  }))

export interface AddressStore extends Instance<typeof AddressStoreModel> {}
export interface AddressStoreModelSnapshot extends SnapshotOut<typeof AddressStoreModel> {}
