import { OrderLine } from "../cart/types";

export interface Order {
  id:                       number;
  name:                     string;
  state:                    string;
  date_order:               Date;
  partner_id:               Array<number | string>;
  partner_invoice_address:  string;
  partner_shipping_address: string;
  currency_id:              Array<number | string>;
  order_line:               OrderLine[];
  amount_untaxed:           number;
  amount_tax:               number;
  amount_total:             number;
  payment_term_id:          Array<number | string>;
}