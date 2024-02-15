import {useEffect, useState} from "react";
import {LabeledInput} from "../../styled/LabeledInput";
import {emptyEmployee} from "../../../store/slices/employeeSlice";
import {ROLE} from "../../../store/slices/rolesSlice";
import RoleService from "../../../services/RoleService";
import {useUserRoles} from "../../../utils/hooks/useUserRoles";
import {Checkbox, InputLabel, ListItemIcon, ListItemText, MenuItem, Select} from "@mui/material";
import styles from './EmployeeForm.module.css'


export const EmployeeForm = ({onSubmit}) => {
  const userRoles = useUserRoles()
  const [roles, setRoles] = useState([])
  const [employeeData, setEmployeeData] = useState({
    ...emptyEmployee,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phoneNumber: "",
  })
  const [selected, setSelected] = useState([]);
  const isAllSelected = roles.length > 0 && selected.length === roles.length;

  useEffect(() => {
    RoleService.getListRoles()
      .then(({data}) => {
        const rs = data.filter(x => {
          if (x.name === ROLE.OWNER) return false
          if (userRoles.includes(ROLE.ADMIN) && x.name === ROLE.ADMIN) return false

          return true
        })
        setRoles(rs)
      })

  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(employeeData)
  }

  const handleChange = (e) => {
    e.preventDefault()
    setEmployeeData({
        ...employeeData,
        [e.target.name]: e.target.value
      }
    )
  }

  const handleRoleChange = (event) => {
    const value = event.target.value;
    const res = value[value.length - 1] !== "all" ? value : selected.length === roles.length ? [] : roles
    setSelected(res);
    setEmployeeData({...employeeData, roleIds: res.map(x => x.id)})
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <LabeledInput id="firstname" name="firstname" type="text" value={employeeData.firstname}
                        onChange={handleChange} labelText="Firstname: " required={true}
          />

          <LabeledInput id="lastname" name="lastname" type="text" value={employeeData.lastname}
                        onChange={handleChange} labelText="Lastname: " required={true}
          />

          <LabeledInput id="email" name="email" type="text" value={employeeData.email}
                        onChange={handleChange} labelText="Email: " required={true}
          />

          <LabeledInput id="password" name="password" type="password" value={employeeData.password}
                        onChange={handleChange} labelText="Password: " required={true}
          />

          <LabeledInput id="phoneNumber" name="phoneNumber" type="text" value={employeeData.phoneNumber}
                        onChange={handleChange} labelText="Phone number: " required={true}
          />

          <InputLabel id="roles">Roles</InputLabel>
          <Select
            labelId="roles"
            multiple
            value={selected}
            onChange={handleRoleChange}
            renderValue={(selected) => {
              return selected.length > 1 ? selected[0].name + ", ..." : selected[0].name
            }}
            className={styles.selectBox}
          >
            <MenuItem
              value="all"
              className={isAllSelected ? styles.selectedAll : ""}
            >
              <ListItemIcon>
                <Checkbox
                  className={styles.indeterminateColor}
                  checked={isAllSelected}
                  indeterminate={
                    selected.length > 0 && selected.length < roles.length
                  }
                />
              </ListItemIcon>
              <ListItemText
                className={styles.selectAllText}
                primary="Select All"
              />
            </MenuItem>
            {roles.map((option) => (
              <MenuItem key={option.id} value={option}>
                <ListItemIcon>
                  <Checkbox checked={selected.indexOf(option) > -1}/>
                </ListItemIcon>
                <ListItemText primary={option.name}/>
              </MenuItem>
            ))}
          </Select>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}