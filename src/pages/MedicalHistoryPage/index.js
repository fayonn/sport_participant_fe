import {useSelector} from "react-redux";
import {medicalHistorySelector} from "../../store/slices/medicalHistorySlice";
import {clientsSelector} from "../../store/slices/clientsSlice";

export const MedicalHistoryPage = () => {
  const {medicalHistory} = useSelector(medicalHistorySelector)
  const {currentClient} = useSelector(clientsSelector);
  console.log("medicalHistory", medicalHistory)
  console.log("currentClient", currentClient)
  return (
    <div>
      {currentClient?.id && (
        <div>
          <p style={{fontSize: 34, fontWeight: "bold"}}>{currentClient.firstname + " " + currentClient.lastname}</p>
          <p><span style={{fontSize: 20, fontStyle: "italic"}}>Email: </span>{currentClient.email}</p>
          <p><span style={{fontSize: 20, fontStyle: "italic"}}>Phone number: </span>{currentClient.phoneNumber}</p>
          <p><span style={{fontSize: 20, fontStyle: "italic"}}>Disabled status: </span>{currentClient.isDisabled ? "Disabled" : "Not disabled"}</p>
          <p><span style={{fontSize: 20, fontStyle: "italic"}}>Date of birth: </span>{currentClient.dob}</p>
          <p><span style={{fontSize: 20, fontStyle: "italic"}}>Gender: </span>{currentClient.gender}</p>
        </div>
      )}
      {medicalHistory?.clientId && (
        <div>
          <p><span style={{fontSize: 20, fontStyle: "italic"}}>Health supplier:</span> {medicalHistory.healthSupplier}</p>
          <br/>
          <p style={{fontSize: 24, fontWeight: "bold"}}>Disabilities</p>
          {medicalHistory.disabilities.map(item => (
            <div>
              <div style={{border: "1px solid red", margin: 10, padding: 5}}>
                <p><span style={{fontSize: 20, fontStyle: "italic"}}>Name:</span> {item.name}</p>
                <p><span style={{fontSize: 20, fontStyle: "italic"}}>Severity:</span> {item.severity}</p>
                <p><span style={{fontSize: 20, fontStyle: "italic"}}>On set date:</span> {item.onsetDate}</p>
                <p style={{padding: 10}}>{item.note}</p>
              </div>
            </div>
          ))}

          <br/>
          <p style={{fontSize: 24, fontWeight: "bold"}}>Medical records</p>
          <br/>
          {medicalHistory.medicalRecords.map(item => (
            <div>
              <div style={{border: "1px solid red", margin: 10, padding: 5}}>
                <p><span style={{fontSize: 20, fontStyle: "italic"}}>Title:</span> {item.title}</p>
                <p><span style={{fontSize: 20, fontStyle: "italic"}}>Record number:</span> {item.recordNumber}</p>
                <p><span style={{fontSize: 20, fontStyle: "italic"}}>Date:</span> {item.date}</p>
                <p><span style={{fontSize: 20, fontStyle: "italic"}}>Medicines:</span> {item.currentMedications.join(', ')}</p>
                <p style={{padding: 10}}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}