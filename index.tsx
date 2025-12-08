import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { db, auth } from "firebase-lucid"
import Product from "./models/Product"
import Order from "./models/Order"
import User from "./models/User"
// import User from "./models/User"
// import Post from "./models/Post"
db.initialize({
  apiKey: "AIzaSyDwu33HgwYxaCGuuF_OZfxrqmi-IwSYiM4",
  authDomain: "figma3-24bbe.firebaseapp.com",
  projectId: "figma3-24bbe",
  storageBucket: "figma3-24bbe.firebasestorage.app",
  messagingSenderId: "363042314374",
  appId: "1:363042314374:web:0876bd046c703d4d035907",
})
// console.log(
// await Product.create({
//   name: "Product B",
//   content: "This is product B",
//   description: "Detailed description of product B",
//   price: 19.99,
//   status: true,
//   tags: ["electronics", "gadget"],
// })
// )
// console.log(await Product.query().get())
// const product = await Product.find("zeeqoM32mC6pOj6xlF5Z")
// product.delete()
// console
//   .log
//   // await product.merge({ price: 29.99 }).save()
//   // await Product.query().where("price", "<", 50).update({
//   //   price: 24.99,
//   // })
//   // await Product.query().where("price", "<", 50).delete()
//   ()
// 註冊
// await auth.register({
//   email: "lu7766@example.com",
//   password: "qqqwww",
//   displayName: "Jac", // 可選
// })
// 登入
// await auth.login({
//   email: "lu7766@example.com",
//   password: "qqqwww",
// })
// 等待 auth 初始化完成
console.time("auth ready")
console.log(await auth.ready())
// await User.create({
//   name: "Jac Wang",
//   // email: "
// })
// 取得目前使用者
// console.log(auth.user())
// const products = await Product.query().get()
// // const user = auth.user()
// const user = await User.first()
// await Order.create({
//   buyer_id: user.id,
//   product_ids: products.map((p) => p.id!),
// })
// console.log(await User.query().preload("orders").get())
const orders = await Order.query().get()
for (const order of orders) {
  order.buyer = await User.find(order.buyer_id)
  order.products = await Promise.all(order.product_ids.map((id) => Product.find(id)))
}
console.log(orders)
console.timeEnd("auth ready")

// await User.create({
//   name: "Jac Wang",
//   email: "lu7766@example.com",
//   age: 37,
// })
// console.log(user)
console.time("query")
// const user = await User.query().where("email", "==", "lu7766@example.com").firstOrFail()
// const user = await User.query().preload("posts").where("email", "==", "lu7766@example.com").firstOrFail()
// const user = await User.find("FXh0epgMCr2mID2G2Kkj")
// console.log(await Post.query().where("authorId", "==", user.id).get())
// console.log(user)
console.timeEnd("query")
// 更新用戶
// console.log(await User.query().where("age", ">=", 30).update({ age: 40}))
// console.log(await user.merge({ age: 39 }).save())

// 新增文章
// console.log(
//   await Post.create({
//     title: "Hello publish",
//     content: "World publish",
//     authorId: user.id,
//     status: "published",
//     viewCount: 0,
//     tags: ["hello2", "world2"],
//   })
// )

// id不算欄位，不能用where id查詢
// console.log(await User.destroy("pp643s8XWgaZQa6TYZXU"))

const rootElement = document.getElementById("root")
if (!rootElement) {
  throw new Error("Could not find root element to mount to")
}

const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
