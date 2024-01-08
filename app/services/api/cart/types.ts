export interface AddCart {
  product_id: number
  quantity: number
}

export interface LineCart{
  
    line_id: number,
    quantity: number

}
export interface CartPost {
  line_id:      number;
  quantity:     number;
  warning:      string;
  minor_amount: number[];
  amount:       number;
  cart_id:      number;
  message:      string;
}

export interface CartAddResponse {
  line_id:      number;
  quantity:     number;
  warning:      string;
  minor_amount: number[];
  amount:       number;
  cart_id:      number;
  message:      string;
}

export interface GetCartResponse {
  id:                       number;
  name:                     string;
  date_order:               Date;
  reference:                boolean;
  state:                    string;
  currency_id:              Array<number | string>;
  pricelist_id:             Array<number | string>;
  partner_invoice_address:  string;
  partner_shipping_address: string;
  amount_total:             number;
  amount_delivery:          number;
  order_line:               OrderLine[];
  suggested_products:       any[];
}

export interface OrderLine {
  id:                  number;
  product_template_id: Array<number | string>;
  name:                string;
  product_uom:         Array<number | string>;
  product_uom_qty:     number;
  currency_id:         Array<number | string>;
  price_unit:          number;
  price_subtotal:      number;
  price_tax:           number;
  price_total:         number;
  price_in_eur:        number;
  price_in_usd:        number;
  qty_invoiced:        number;
}

export interface DeleteCartResponse{
    line_id:      boolean;
    quantity:     number;
    warning:      string;
    minor_amount: number[];
    amount:       number;
    cart_id:      number;
    message:      string;
}