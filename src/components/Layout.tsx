import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: red;
`;

const Layout = () => {
  return (
    <Wrapper>
      <h1>Layout</h1>
      {/*<Link to='/login' >Login </Link>*/}
      {/*<Link to='/join' >Join </Link>*/}
      <Outlet />
    </Wrapper>
  );
};
export default Layout;
