import { Model } from "firebase-lucid"
import Post from "./Post"

export default class User extends Model {
  name!: string
  email!: string
  age?: number

  // 可選：指定 collection 名稱（預設使用 'users'）
  static collectionName = "users"

  // static posts() {
  //   return this.hasMany(Post, {
  //     type: "foreignKey",
  //     foreignKey: "userId",
  //   })
  // }

  // 新增這個屬性來啟用型別提示
  static $relations = {
    posts: () => this.hasMany(Post, { type: "foreignKey", foreignKey: "authorId" }),
    // organization: () => this.belongsTo(Organization, { type: 'foreignKey', foreignKey: 'organizationId' }),
  } as const // 注意：需要 as const
}
