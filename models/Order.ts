import { belongsTo, belongsToMany, Model } from "firebase-lucid"
import User from "./User"
import Product from "./Product"

export default class Order extends Model {
  buyer_id!: string
  product_ids!: string[]
  static collectionName = "orders"
  @belongsTo(() => User, { type: "foreignKey", foreignKey: "buyer_id" })
  declare buyer: User
  @belongsToMany(() => Product, { foreignKey: "product_ids" })
  declare products: Product[]
}
