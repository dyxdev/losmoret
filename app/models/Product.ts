import { withSetPropAction } from "app/store/helpers/withSetPropAction";
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";


export const ProductModel = types
  .model("Product")
  .props({
    id:                      types.string,
    name:                    types.string,
    description_sale:        types.boolean,
    categ_name:              types.string,
    logo_url:                types.string,
    list_price:              types.number,
    price_in_eur:             types.number,
    price_in_usd:             types.number,
    alternative_product_ids:  types.array(types.identifier),
    qty_available:            types.number,
    product_images:          types.array(types.string),
    currency_id:              types.array(types.union(types.string,types.number))
  })
  .actions(withSetPropAction)

  export const ProductCartModel = types
  .model("ProductCart")
  .props({
    id: types.string,
    name: types.string,
    price: types.number,
    quantity: types.number,
    image:types.maybeNull(types.string),
    firstTime: types.boolean
  })
  .actions(withSetPropAction)
  .views((product)=>({
    get total() {
      return product.price * product.quantity
    }
  }))

  export const ProductCartLineModel = types
  .model("ProductCartLine")
  .props({
    id: types.number,
    name: types.string,
    product_uom_qty: types.number,
    currency_id: types.array(types.union(types.string,types.number)),
    price_unit:          types.number,
    price_subtotal:      types.number,
    price_tax:           types.number,
    price_total:         types.number,
    price_in_eur:        types.number,
    price_in_usd:        types.number,
    qty_invoiced:        types.number,
  })
  .actions(withSetPropAction)
  .views((product)=>({
    get total() {
      return product.price_total
    },
    get priceFormate(){
      return ` ${product.price_total} ${product.currency_id.length > 1 ? product.currency_id[1] : "CUP"}`
    }
  })) 


export interface Product extends Instance<typeof ProductModel> {}
export interface ProductSnapshotOut extends SnapshotOut<typeof ProductModel> {}
export interface ProductSnapshotIn extends SnapshotIn<typeof ProductModel> {}

export interface ProductCart extends Instance<typeof ProductCartModel> {}
export interface ProductCartSnapshotOut extends SnapshotOut<typeof ProductCartModel> {}

export interface ProductLineCart extends Instance<typeof ProductCartLineModel> {}
export interface ProductLineCartSnapshotOut extends SnapshotOut<typeof ProductCartLineModel> {}

