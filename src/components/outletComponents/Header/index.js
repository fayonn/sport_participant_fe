import styles from './Header.module.css'
import {Link, useNavigate} from "react-router-dom";
import LocalStorageService from "../../../services/LocalStorageService";
import {useIsAuth} from "../../../utils/hooks/useIsAuth";

export const Header = () => {
  const localStorageService = LocalStorageService
  const isAuth = useIsAuth()
  const navigate = useNavigate()

  return (
    <div className={styles.headerContainer}>
      {!isAuth ? (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/sign-up">Sign up</Link>
          </>
        ) :
        (
          <button onClick={() => {
            localStorageService.removeValue('token')
            localStorageService.removeValue('refreshToken')
            navigate('/login')
          }}
          >
            Sign out
          </button>
        )
      }
    </div>
  )
}