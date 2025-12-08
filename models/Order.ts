import { Model } from "firebase-lucid"

export default class Order extends Model {
  buyer_uid!: string
  product_ids!: string[]
  static collectionName = "orders"
}
