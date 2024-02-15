import {useDispatch, useSelector} from "react-redux";
import {gymBrandsSelector} from "../../store/slices/gymBrandsSlice";
import {useHasAuthority} from "../../utils/hooks/useHasAuthority";
import {useUserRoles} from "../../utils/hooks/useUserRoles";
import {setWishes, updateWish, wishesSelector} from "../../store/slices/wishesSlice";
import {useEffect, useState} from "react";
import WishService from "../../services/WishService";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {HealthSupplier} from "../../utils/constants/healthSupplier";
import {WishStatus} from "../../utils/constants/wishStatus";

export const WishPage = () => {
  const {currentGymBrand} = useSelector(gymBrandsSelector)
  const {wishes} = useSelector(wishesSelector)
  const hasAuthority = useHasAuthority(useUserRoles())
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)

  useEffect(() => {
    WishService.getAll({
      gymBrandId: currentGymBrand.id,
      page: page,
      size: 10,
    })
      .then(({data}) => {
        dispatch(setWishes(data))
      })
  }, [])

  useEffect(() => {
    WishService.getAll({
      gymBrandId: currentGymBrand.id,
      page: page,
      size: 10,
    })
      .then(({data}) => {
        dispatch(setWishes(data))
      })
  }, [currentGymBrand])

  const handlePagination = (action) => {
    let newPage = page
    if (action === "PREV") newPage -= 1
    if (action === "NEXT") newPage += 1

    WishService.getAll({
      gymBrandId: currentGymBrand.id,
      page: newPage,
      size: 10,
    })
      .then(({data}) => {
        dispatch(setWishes(data))
        setPage(newPage)
      })
  }

  const handleChangeStatus = (e, id) => {
    const wish = wishes.filter(x => x.id === id)[0]
    dispatch(updateWish({...wish, status: e.target.value}))
  }

  const handleSaveStatus = (id) => {
    const wish = wishes.filter(x => x.id === id)[0]
    WishService.update({
      gymBrandId: currentGymBrand.id,
      wishId: id,
      wish: wish,
    })
      .then(({data}) => {
        dispatch(setWishes(
          wishes.map(x => {
            if (x.id === data.id) return data
            return x
          })
        ))
      })
  }


  return (
    <div>
      <div style={{padding: 5}}>
        {wishes.map(x => {
          return (
            <div key={x.id} style={{margin: 5, padding: 5, border: "1px solid red"}}>
              <p>Firstname: {x.firstname}</p>
              <p>Lastname: {x.lastname}</p>
              <p>Email: {x.email}</p>
              <p>Phone number: {x.phoneNumber}</p>
              <FormControl style={{width: 150, marginTop: 10}}>
                <InputLabel id="status">Status</InputLabel>
                <Select
                  labelId="status"
                  id="status"
                  value={x.status}
                  label="Status"
                  onChange={(e) => handleChangeStatus(e, x.id)}
                >
                  {Object.values(WishStatus).map(y => {
                    return (
                      <MenuItem key={y} value={y}>{y}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
              <br/>
              <button onClick={() => {handleSaveStatus(x.id)}}>Save</button>
              <p style={{padding: 5}}>Text: {x.text}</p>
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