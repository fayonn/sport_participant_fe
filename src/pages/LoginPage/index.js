import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {LoginForm} from "../../components/LoginForm";
import AuthService from "../../services/AuthService";
import jwtDecode from "jwt-decode";
import {useDispatch} from "react-redux";
import styles from './LoginPage.module.css'
import {setUser} from "../../store/slices/userSlice";
import RoleService from "../../services/RoleService";
import {setRoles} from "../../store/slices/rolesSlice";
import GymBrandService from "../../services/GymBrandService";
import {setCurrentGymBrand, setGymBrands} from "../../store/slices/gymBrandsSlice";
import LocationService from "../../services/LocationService";
import {setCurrentLocation, setLocations} from "../../store/slices/locationsSlice";
import UserService from "../../services/UserService";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/stat');
  }, [])

  const handleSubmit = (loginData) => {
    AuthService.login(loginData.email, loginData.password)
      .then(() => {
        const user = jwtDecode(localStorage.getItem('token'))
        let gymBrandId = undefined;
        UserService.getUser(user.id)
          .then(({data}) => {
            dispatch(setUser(data))
          })
          .then(() => {
            RoleService.getRoles(user.id).then(({data}) => {
              dispatch(setRoles(data))
            })
          })
          .then(() => {
            GymBrandService.getAllUserGymBrands(user.id).then(({data}) => {
              dispatch(setGymBrands(data))
              if (data.length > 0) {
                dispatch(setCurrentGymBrand(data[0]))
                gymBrandId = data[0].id
              }
            })
              .then(() => {
                if (gymBrandId) {
                  LocationService.getAllByGymBrandId(gymBrandId).then(({data}) => {
                    dispatch(setLocations(data))
                    if (data.length > 0) dispatch(setCurrentLocation(data[0]))
                  })
                }
              })
          })
          .then(() => {
            navigate("/stat")
          })
          .catch((err) => {
            console.log(err)
          })
      })
  }

  return (
    <div className={styles.loginContainer}>
      <div>
        <h2>Login</h2>
        <LoginForm onSubmit={handleSubmit}/>
      </div>
      <div>
        <span>Don't have an account? </span>
        <Link to="/sign-up">Sign up</Link>
      </div>
      <div>
        <span>Want to leave a wish? </span>
        <Link to="/wishes/add">Leave</Link>
      </div>
    </div>
  )
}