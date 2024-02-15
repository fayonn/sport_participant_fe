import {NavLink} from "react-router-dom";
import styles from './NavMenu.module.css'
import {GymBrandNavList} from "../../gymBrands/GymBrandNavList";
import {LocationNavList} from "../../locations/LocationNavList";
import {useHasAuthority} from "../../../utils/hooks/useHasAuthority";
import {useUserRoles} from "../../../utils/hooks/useUserRoles";
import {ROLE} from "../../../store/slices/rolesSlice";
import {useSelector} from "react-redux";
import {gymBrandsSelector} from "../../../store/slices/gymBrandsSlice";
import {locationsSelector} from "../../../store/slices/locationsSlice";


export const NavMenu = () => {
  const isActive = ({isActive}) => (isActive ? styles.navigatorListItemActive : null)
  const hasAuthority = useHasAuthority(useUserRoles())
  const {currentGymBrand} = useSelector(gymBrandsSelector)
  const {currentLocation} = useSelector(locationsSelector)

  return (
    <nav className={styles.navigator}>
      <div>
        <GymBrandNavList/>
        <LocationNavList/>
      </div>
      <ul className={styles.navigatorList}>
        {currentGymBrand.id && currentLocation.id && ( <li className={styles.navigatorListItem}>
          <NavLink to="/appointments" className={isActive}>Appointments</NavLink>
        </li>
        )}
        {hasAuthority([ROLE.ADMIN, ROLE.OWNER]) && (
          <li className={styles.navigatorListItem}>
            <NavLink to="/employees" className={isActive}>Employees</NavLink>
          </li>
        )}
        <li className={styles.navigatorListItem}>
          <NavLink to="/activities" className={isActive}>Activities</NavLink>
        </li>
        <li className={styles.navigatorListItem}>
          <NavLink to="/rooms" className={isActive}>Rooms</NavLink>
        </li>
        <li className={styles.navigatorListItem}>
          <NavLink to="/clients" className={isActive}
          >Clients</NavLink>
        </li>
        <li className={styles.navigatorListItem}>
          <NavLink to="/wishes" className={isActive}
          >Wishes</NavLink>
        </li>
        <li className={styles.navigatorListItem}>
          <NavLink to="/guides" className={isActive}
          >Guides</NavLink>
        </li>
        <li className={styles.navigatorListItem}>
          <NavLink to="/stat" className={isActive}
          >Statistics</NavLink>
        </li>
        {/*<li className={styles.navigatorListItem}>*/}
        {/*  <NavLink to="#" className={isActive}>Warehouse</NavLink>*/}
        {/*</li>*/}
        {/*<li className={styles.navigatorListItem}>*/}
        {/*  <NavLink to="#" className={isActive}>Settings</NavLink>*/}
        {/*</li>*/}
      </ul>
    </nav>
  )
}