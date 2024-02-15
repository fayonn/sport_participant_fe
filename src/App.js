import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {AppointmentPage} from "./pages/AppointmentPage";
import {LoginPage} from "./pages/LoginPage";
import {useEffect, useState} from "react";
import {NotFoundPage} from "./pages/NotFoundPage";
import {PublicRoute} from "./utils/routes/PublicRoute";
import {PrivateRoute} from "./utils/routes/PrivateRoute";
import {PageContentLayout} from "./utils/PageContentLayout";
import {EmployeePage} from "./pages/EmployeePage";
import {LoginLayout} from "./utils/LoginLayout";
import {GymBrandAddingPage} from "./pages/GymBrandAddingPage";
import {LocationAddingPage} from "./pages/LocationAddingPage";
import {ActivityPage} from "./pages/ActivityPage";
import {RoomPage} from "./pages/RoomPage";
import {StatisticPage} from "./pages/StatisticPage";
import {ClientPage} from "./pages/ClientPage";
import {MedicalHistoryPage} from "./pages/MedicalHistoryPage";
import {WishAddPage} from "./pages/WishAddPage";
import {WishPage} from "./pages/WishPage";
import {GuidePage} from "./pages/GuidePage";

function App() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, []);

  return (
    <Routes>
      <Route element={<LoginLayout/>}>
        <Route exact element={<PublicRoute/>}>
          <Route exact path="/login" element={<LoginPage/>}/>
          <Route exact path="/wishes/add" element={<WishAddPage/>}/>
        </Route>
      </Route>

      <Route element={<PageContentLayout/>}>
        <Route exact path="/" element={
          token
            ? <Navigate to="/stat" replace/>
            : <Navigate to="/login" replace/>
        }
        />

        <Route exact element={<PublicRoute/>}>
          <Route exact path="/login" element={<LoginPage/>}/>
          <Route exact path="/wishes/add" element={<WishAddPage/>}/>
        </Route>

        <Route exact element={<PrivateRoute/>}>
          <Route exact path="/appointments" element={<AppointmentPage/>}/>
          <Route exact path="/employees" element={<EmployeePage/>}/>
          <Route exact path="/gym-brands" element={<GymBrandAddingPage/>}/>
          <Route exact path="/locations" element={<LocationAddingPage/>}/>
          <Route exact path="/activities" element={<ActivityPage/>}/>
          <Route exact path="/clients" element={<ClientPage/>}/>
          <Route exact path="/rooms" element={<RoomPage/>}/>
          <Route exact path="/stat" element={<StatisticPage/>}/>
          <Route exact path="/medical-history" element={<MedicalHistoryPage/>}/>
          <Route exact path="/wishes" element={<WishPage/>}/>
          <Route exact path="/guides" element={<GuidePage/>}/>
        </Route>

      </Route>

      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  );
}

export default App;
