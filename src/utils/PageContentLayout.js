import {Outlet} from 'react-router-dom';
import {Header} from "../components/outletComponents/Header";
import {NavMenu} from "../components/outletComponents/NavMenu";
import '../index.css';

export const PageContentLayout = () => {
  return (
    <div className="layout-container">
      <Header/>
      <div className="layout-container__content">
        <NavMenu/>
        <div className="layout-container__content__right">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}