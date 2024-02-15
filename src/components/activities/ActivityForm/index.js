import {LabeledInput} from "../../styled/LabeledInput";
import {useState} from "react";
import {emptyActivity} from "../../../store/slices/activitiesSlice";

export const ActivityForm = (
  {
    onSubmit,
  }) => {

  const [activity, setActivity] = useState({
    ...emptyActivity,
    title: "",
    description: "",
  });

  const handleActivityChange = (e) => {
    setActivity({
      ...activity,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(activity)
  }

  return (
    <form onSubmit={handleSubmit}>
      <LabeledInput id="title" name="title" type="text" value={activity.title}
                    onChange={handleActivityChange} labelText="Title: " required={true}
      />

      <LabeledInput id="description" name="description" type="text" value={activity.description}
                    onChange={handleActivityChange} labelText="Description: " required={true}
      />

      <button type="submit">Create activity</button>
    </form>
  )
}