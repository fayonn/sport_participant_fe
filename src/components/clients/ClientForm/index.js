import {LabeledInput} from "../../styled/LabeledInput";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {DropDownList} from "../../styled/DropDownList";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {GENDER} from "../../../utils/constants/gender";
import {HealthSupplier} from "../../../utils/constants/healthSupplier";

export const ClientForm = (
  {
    onSubmit,
    onChange,
    client,
    healthSupplier,
    onChangeHealthSupplier,
  }
) => {


  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(client)
  }

  const handleChange = (e) => {
    onChange({
        ...client,
        [e.target.name]: e.target.value
      }
    )
  }

  const handleChangeIsDisabled = () => {
    onChange({
        ...client,
        "isDisabled": !client.isDisabled,
      }
    )
  }

  const handleChangeDOB = (value) => {
    console.log("value", value)
    onChange({
        ...client,
        "dob": value,
      }
    )
  }

  return (
    <form style={{flexBasis: "40%"}} onSubmit={handleSubmit}>
      <LabeledInput id="firstname" name="firstname" type="text" value={client.firstname}
                    onChange={handleChange} labelText="Firstname: " required={true}
      />

      <LabeledInput id="lastname" name="lastname" type="text" value={client.lastname}
                    onChange={handleChange} labelText="Lastname: " required={true}
      />

      <LabeledInput id="email" name="email" type="email" value={client.email}
                    onChange={handleChange} labelText="Email: " required={true}
      />

      <LabeledInput id="password" name="password" type="password" value={client.password}
                    onChange={handleChange} labelText="Password: " required={true}
      />

      <LabeledInput id="country" name="country" type="text" value={client.country}
                    onChange={handleChange} labelText="Country: " required={false}
      />

      <LabeledInput id="city" name="city" type="text" value={client.city}
                    onChange={handleChange} labelText="City: " required={false}
      />

      <LabeledInput id="phoneNumber" name="phoneNumber" type="text" value={client.phoneNumber}
                    onChange={handleChange} labelText="Phone number: " required={true}
      />

      <LabeledInput id="isDisabled" name="isDisabled" type="checkbox" value={client.isDisabled}
                    onChange={handleChangeIsDisabled} labelText="Is disabled: "
      />

      {client.isDisabled && (
        <DropDownList
          onChange={(value) => {
            onChangeHealthSupplier(value[1])
          }}
          values={Object.values(HealthSupplier).map(item => ([item, item]))}
          selected={[healthSupplier, healthSupplier]}
        />
      )}

      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label="Date of birth"
          value={client.dob}
          onChange={handleChangeDOB}
        />
      </LocalizationProvider>
      <br/>

      <DropDownList
        onChange={(value) => {
          onChange({
              ...client,
              "gender": value[1],
            }
          )
        }}
        values={Object.values(GENDER).map(item => ([item, item]))}
        selected={[GENDER.MALE, GENDER.MALE]}
      />

      <button type="submit">Add client</button>
    </form>
  );
}