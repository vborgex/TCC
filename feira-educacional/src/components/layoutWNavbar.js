import { Outlet } from 'react-router-dom';
import Navbar from './navbar';

function LayoutComNavbar() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default LayoutComNavbar;
