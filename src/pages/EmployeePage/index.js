import styles from './EmployeePage.module.css'
import {EmployeeForm} from "../../components/employees/EmployeeForm";
import '../../index.css'
import EmployeeService from "../../services/EmployeeService";
import {employeesSelector, setEmployees} from "../../store/slices/employeeSlice";
import {useDispatch, useSelector} from "react-redux";
import {gymBrandsSelector} from "../../store/slices/gymBrandsSlice";
import {useEffect} from "react";
import {EmployeeList} from "../../components/employees/EmployeeList";
import {useState} from "react";
import {useHasAuthority} from "../../utils/hooks/useHasAuthority";
import {useUserRoles} from "../../utils/hooks/useUserRoles";
import {ROLE} from "../../store/slices/rolesSlice";

export const EmployeePage = () => {
  const {employees} = useSelector(employeesSelector)
  const {currentGymBrand} = useSelector(gymBrandsSelector)
  const [currentEmployee, setCurrentEmployee] = useState(null)
  const dispatch = useDispatch();
  const hasAuthority = useHasAuthority(useUserRoles())

  useEffect(() => {
    EmployeeService.getAll(currentGymBrand.id)
      .then(({data}) => {
        dispatch(setEmployees(data))
        if (data.length > 0) setCurrentEmployee(data[0])
      })
  }, [])

  useEffect(() => {
    setCurrentEmployee(employees.length > 0 ? employees[0] : null)
  }, [currentGymBrand])

  const handleSubmit = (data) => {
    EmployeeService.save(currentGymBrand.id, data)
      .then(({data}) => {
        dispatch(setEmployees([...employees, data]))
        setCurrentEmployee(data)
      })
  }

  const handleDelete = (id) => {
    EmployeeService.delete({
      gymBrandId: currentGymBrand.id,
      employeeId: id,
    })
      .then(() => {
        const empls = employees.filter(item => item.id !== id)
        dispatch(setEmployees(empls))
        if (currentEmployee.id === id) {
          if (empls.length > 0) setCurrentEmployee([empls[0]])
          else setCurrentEmployee(null)
        }
      })
  }

  const handleChangeEmployee = (employee) => {
    const e = employees.filter(x => x.id === employee[0])[0]
    setCurrentEmployee(e)
  }

  return (
    <div className="container">
      <EmployeeForm onSubmit={handleSubmit}/>
      {currentEmployee && (
        <EmployeeList
          current={currentEmployee}
          onChange={handleChangeEmployee}
          onDelete={handleDelete}
          showDeleteOption={hasAuthority([ROLE.OWNER, ROLE.ADMIN])}
        />
      )}
    </div>
  )
}