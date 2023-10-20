import { Outlet } from "react-router-dom";
import styled from "styled-components";
import "tui-grid/dist/tui-grid.css";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const Container = () => {
  return (
    <Wrapper>
      <h1>DashBoard</h1>
      {/*<Link to='/login' >Login </Link>*/}
      {/*<Link to='/join' >Join </Link>*/}
      <Outlet />
    </Wrapper>
  );
};
export default Container;
