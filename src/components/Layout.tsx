import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <h1>Layout</h1>
      {/*<Link to='/login' >Login </Link>*/}
      {/*<Link to='/join' >Join </Link>*/}
      <Outlet />
    </>
  );
};
export default Layout;
