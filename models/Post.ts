import { Model } from "firebase-lucid"

export default class Post extends Model {
  title!: string
  content!: string
  authorId!: string
  status!: "draft" | "published"
  viewCount!: number
  tags!: string[]
  static collectionName = "posts"
}
