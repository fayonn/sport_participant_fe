import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {useEffect} from "react";
import ExerciseService from "../../services/ExerciseService";
import {exercisesSelector, setExercises} from "../../store/slices/exercisesSlice";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export const GuidePage = () => {
  const {exercises} = useSelector(exercisesSelector)
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const [currentDisability, setCurrentDisability] = useState("ABSENCE_OF_HAND")

  useEffect(() => {
    ExerciseService.getAllByDisability({
      disability: currentDisability,
      page: page,
      size: 10,
    })
      .then(({data}) => {
        dispatch(setExercises(data))
      })
  }, [])

  const handlePagination = (action) => {
    let newPage = page
    if (action === "PREV") newPage -= 1
    if (action === "NEXT") newPage += 1

    ExerciseService.getAllByDisability({
      disability: currentDisability,
      page: newPage,
      size: 10,
    })
      .then(({data}) => {
        dispatch(setExercises(data))
        setPage(newPage)
      })
  }

  const handleChangeDisability = (e) => {
    ExerciseService.getAllByDisability({
      disability: e.target.value,
      page: 0,
      size: 10,
    })
      .then(({data}) => {
        dispatch(setExercises(data))
        setCurrentDisability(e.target.value)
      })
  }

  return (
    <div>
      <div>
        <FormControl style={{width: 150}}>
          <InputLabel id="disability">Disability</InputLabel>
          <Select
            labelId="disability"
            id="disability"
            value={currentDisability}
            label="Disability"
            onChange={handleChangeDisability}
          >
            <MenuItem value={"ABSENCE_OF_HAND"}>Absence of hand</MenuItem>
            <MenuItem value={"ABSENCE_OF_LEG"}>Absence of leg</MenuItem>
            <MenuItem value={"NO_LEGS"}>No legs</MenuItem>
            <MenuItem value={"NO_HANDS"}>No hands</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        {exercises.map(x => {
          return (
            <div>
              <p>Title: {x.title}</p>
              <p>{x.text}</p>
              <div>
                {x.urls.map(y => {
                  return (
                    <div>
                      <a href={y}>{y}</a>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <div style={{padding: 5}}>
        <button disabled={page === 0} style={{marginRight: 5}} onClick={() => {handlePagination("PREV")}}>Prev</button>
        <button onClick={() => {handlePagination("NEXT")}}>Next</button>
      </div>
    </div>
  )
}