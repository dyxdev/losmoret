import { Instance, SnapshotOut, flow, types } from "mobx-state-tree"

import {
  ProductCartLineModel,
  ProductCartModel,
  ProductCartSnapshotOut,
} from "app/models/Product"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { translate } from "app/i18n"
import { deleteLineCart, getCart } from "app/services/api/cart/service"
import { GeneralApiProblem, isGeneralProblem } from "app/services/api/apiProblem"
import { ResultClass } from "app/services/api"
import { GetCartResponse } from "app/services/api/cart/types"
import { runInAction } from "mobx"

export const CarStoreModel = types
  .model("CarStore")
  .props({
    id: "",
    order_id: "",
    amount_total: 0,
    amount_delivery: 0,
    date: types.maybeNull(types.Date),
    products: types.array(ProductCartModel),
    order_line: types.array(ProductCartLineModel),
    state: types.maybeNull(types.enumeration("State", ["pending", "done", "error"])),
    message: types.maybeNull(types.string),
    categ: "",
  })
  .views((store) => ({
    get total() {
      return store.products.reduce((accumulator, p) => {
        return accumulator + p.total
      }, 0)
    },

    get productList() {
      return store.products.slice()
    },
    get orderLine(){
      return store.order_line.slice()
    },
    get category(){
      return store.categ
    }
  }))
  .actions(withSetPropAction)
  .actions((store) => ({
    addProduct(product: ProductCartSnapshotOut) {
      store.products.push(product)
    },
    setCategoryName(categ:string){
        store.setProp("categ",categ)
    },
    removeProduct(id: any) {
      const index = store.products.findIndex((p) => p.id === id)
      store.products.splice(index, 1)
    },
    updateProduct(id: any, product: ProductCartSnapshotOut) {
      const index = store.products.findIndex((p) => p.id === id)
      store.products.splice(index, 1, product)
    },
    initialLoad() {
      store.setProp("products", [])
    },
    sucessFetch(result: GetCartResponse) {
      store.setProp("amount_delivery", result.amount_delivery)
      store.setProp("amount_total", result.amount_total)
      store.setProp('order_id', result.name)
      const resultOrderLine = result.order_line.map((v) => {
        return ProductCartLineModel.create({
          id: v.id,
          name: v.name,
          product_uom_qty: v.product_uom_qty,
          currency_id: v.currency_id,
          price_unit: v.price_unit,
          price_subtotal: v.price_subtotal,
          price_tax: v.price_tax,
          price_total: v.price_total,
          price_in_eur: v.price_in_eur,
          price_in_usd: v.price_in_usd,
          qty_invoiced: v.qty_invoiced,
        })
      })
      store.setProp("order_line",resultOrderLine)
      store.setProp("state", "done")
    },
    async fetchCart() {
      store.setProp("order_line", [])
      store.setProp("state", "pending")
      try {
        // ... yield async/await service
        const response: ResultClass<GetCartResponse> | GeneralApiProblem = await getCart()
        if (isGeneralProblem(response)) {
          store.setProp(
            "message",
            (response as GeneralApiProblem).message ?? translate("cartScreen.error"),
          )
          store.setProp("state", "error")
        } else {
          const result = (response as ResultClass<GetCartResponse>).result

          runInAction(() => {
            this.sucessFetch(result)
          })
        }
      } catch (error) {
        // ... try/catch
        store.setProp("message", translate("cartScreen.error"))
        store.setProp("state", "error")
      }
    },
    removeProductAsync: flow(function* removeProductAsync(id) {
      return yield deleteLineCart(id)
    }),
  }))

export interface CartStore extends Instance<typeof CarStoreModel> {}
export interface CartStoreSnapshot extends SnapshotOut<typeof CarStoreModel> {}
