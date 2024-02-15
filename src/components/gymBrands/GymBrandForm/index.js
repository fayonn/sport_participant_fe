import {useState} from "react";
import {LabeledInput} from "../../styled/LabeledInput";
import {emptyGymBrand} from "../../../store/slices/gymBrandsSlice";
import {userSelector} from "../../../store/slices/userSlice";
import {useSelector} from "react-redux";

// only owner can add gym brands
export const GymBrandForm = ({onSubmit}) => {
  const {user} = useSelector(userSelector)
  const [gymBrandData, setGymBrandData] = useState({...emptyGymBrand, name: "", ownerId: user.id})

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(gymBrandData)
  }

  const handleChange = (e) => {
    e.preventDefault()
    setGymBrandData({
        ...gymBrandData,
        [e.target.name]: e.target.value
      }
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <LabeledInput id="name" name="name" type="text" value={gymBrandData.name}
                        onChange={handleChange} labelText="Enter the name of your brand: " required={true}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}