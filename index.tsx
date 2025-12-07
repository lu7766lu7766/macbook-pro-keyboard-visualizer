import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { db, auth } from "firebase-lucid"
import User from "./models/User"
import Post from "./models/Post"
db.initialize({
  apiKey: "AIzaSyD3mrpE3dydYf810P4ohjijyUadeVlKs44",
  authDomain: "learning-6239b.firebaseapp.com",
  projectId: "learning-6239b",
  storageBucket: "learning-6239b.firebasestorage.app",
  messagingSenderId: "46743478512",
  appId: "1:46743478512:web:53baa198e10c4ed017a235",
})
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
// 取得目前使用者
// console.log(auth.user())
console.timeEnd("auth ready")

await User.create({
  name: "Jac Wang",
  email: "lu7766@example.com",
  age: 37,
})
// console.log(user)
console.time("query")
// const user = await User.query().where("email", "==", "lu7766@example.com").firstOrFail()
const user = await User.query().preload("posts").where("email", "==", "lu7766@example.com").firstOrFail()
// const user = await User.find("FXh0epgMCr2mID2G2Kkj")
// console.log(await Post.query().where("authorId", "==", user.id).get())
console.log(user)
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
