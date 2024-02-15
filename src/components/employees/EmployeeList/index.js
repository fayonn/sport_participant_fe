import {useSelector} from "react-redux";
import {employeesSelector} from "../../../store/slices/employeeSlice";
import {DropDownList} from "../../styled/DropDownList";

export const EmployeeList = (
  {
    current,
    onChange,
    onDelete,
    showDeleteOption,
  }) => {
  const {employees} = useSelector(employeesSelector)

  return (
    <div>
      <p>Employees</p>
      <DropDownList
        values={employees.map(x => [x.id, x.firstname + " " + x.lastname])}
        selected={[current.id, current.firstname + " " + current.lastname]}
        onChange={onChange}
        showAddOption={false}
        onDelete={onDelete}
        showDeleteOption={showDeleteOption}
      />
    </div>
  )
}