import {useState} from "react";
import styles from './WishAddPage.module.css'
import {LabeledInput} from "../../components/styled/LabeledInput";
import WishService from "../../services/WishService";

export const WishAddPage = () => {
  const [wish, setWish] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    text: "",
  })
  const [gymBranName, setGymBranName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    WishService.save(wish, gymBranName).then(({data}) => {
      console.log(data)
    })
  }

  const handleChange = (e) => {
    e.preventDefault()
    setWish({
        ...wish,
        [e.target.name]: e.target.value
      }
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.container}>
          <LabeledInput id="firstname" name="firstname" type="text" value={wish.firstname}
                        onChange={handleChange} labelText="Firstname: " required={true}
          />

          <LabeledInput id="lastname" name="lastname" type="text" value={wish.lastname}
                        onChange={handleChange} labelText="Lastname: " required={true}
          />

          <LabeledInput id="email" name="email" type="text" value={wish.email}
                        onChange={handleChange} labelText="Email: " required={true}
          />

          <LabeledInput id="phoneNumber" name="phoneNumber" type="text" value={wish.phoneNumber}
                        onChange={handleChange} labelText="Phone number: " required={true}
          />

          <LabeledInput id="gymBranName" name="gymBranName" type="text" value={gymBranName}
                        onChange={(e) => {e.preventDefault(); setGymBranName(e.target.value)}} labelText="For gym brand: " required={true}
          />

          <textarea id="text" name="text" value={wish.text} onChange={handleChange}/>

          <button type="submit">Leave</button>
        </div>

      </form>
    </div>
  )
}