import { Outlet } from "react-router-dom"
const AuthLayouth = () => {
  return (
    <>
        <main className=" md:grid md:grid-cols-2 gap-5 p-5 container mx-auto mt-12 items-center">
          <Outlet/>
        </main>
    </>
  )
}

export default AuthLayouth
