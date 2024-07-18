import { Link, Outlet } from "react-router-dom"

export default function Layout () {
  return (
    <>
      <div style={{visibility: 'hidden'}}>
        <Link to={'/'}>login page</Link> <br />
        <Link to={'/register'}>Register page</Link>
      </div>
      <Outlet/>
    </>
  )
}