import {useState} from "react";
import {LabeledInput} from "../styled/LabeledInput";

export const LoginForm = ({onSubmit}) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(loginData)
  }

  const handleChange = (e) => {
    e.preventDefault()
    setLoginData({
        ...loginData,
        [e.target.name]: e.target.value
      }
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <LabeledInput id="email" name="email" type="text" value={loginData.email}
                        onChange={handleChange} labelText="Email: " required={true}
          />

          <LabeledInput id="password" name="password" type="password" value={loginData.password}
                        onChange={handleChange} labelText="Password: " required={true}
          />

        </div>
        <button type="submit">Sign in</button>
      </form>
    </div>
  )
}