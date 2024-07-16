import { Link, Outlet } from "react-router-dom"

export default function Layout () {
  return (
    <>
      <Link to={'/login'}>login page</Link> <br />
      <Link to={'/register'}>Register page</Link>
      <Outlet/>
    </>
  )
}