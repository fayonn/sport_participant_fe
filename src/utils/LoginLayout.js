import {Outlet} from 'react-router-dom';
import {Header} from "../components/outletComponents/Header";
import '../index.css';

export const LoginLayout = () => {
  return (
    <div className="layout-container">
      <Header/>
      <div>
        <Outlet/>
      </div>
    </div>
  );
}