import { Outlet } from 'react-router-dom';
import Navbar from './navbar';

function LayoutComNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default LayoutComNavbar;
