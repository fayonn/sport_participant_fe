import MedicalHistoryService from "../../../services/MedicalHistoryService";
import {useDispatch, useSelector} from "react-redux";
import {gymBrandsSelector} from "../../../store/slices/gymBrandsSlice";
import {setMedicalHistory} from "../../../store/slices/medicalHistorySlice";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {setCurrentClient} from "../../../store/slices/clientsSlice";

export const ClientListItem = (
  {
    client,
    onDelete,
  }
) => {
  const {currentGymBrand} = useSelector(gymBrandsSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [isClientHasMedicalHistory, setIsClientHasMedicalHistory] = useState(true)

  const handleMedicalHistory = () => {
    MedicalHistoryService.get({
      gymBrandId: currentGymBrand.id,
      clientId: client.id
    })
      .then(({data}) => {
        dispatch(setMedicalHistory(data))
        // setIsClientHasMedicalHistory(true)
        dispatch(setCurrentClient(client))
        navigate("/medical-history")
      })
      .catch((e) => {
        console.log("err", e)
        // setIsClientHasMedicalHistory(false)
      })
  }

  const handleDelete = () => {
    onDelete(client.id)
  }

  return (
    <div style={{border: "1px red solid", margin: 10}}>
      <p>Firstname: {client.firstname}</p>
      <p>Lastname: {client.lastname}</p>
      <p>Client: {client.gender}</p>
      <p>Is disabled: {String(client.isDisabled)}</p>

      {/*<button style={{marginRight: 10}}>Edit</button>*/}
      <button style={{marginRight: 10}} onClick={handleDelete}>Delete</button>
      <button onClick={handleMedicalHistory}>Medical history</button>

      {/*{!isClientHasMedicalHistory && (*/}
      {/*  <p style={{color: "red"}}>Client does not have medical history</p>*/}
      {/*)}*/}
    </div>
  );
}