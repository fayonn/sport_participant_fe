import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {useState} from "react";
import {ExpandLess, ExpandMore, Add, Delete} from "@mui/icons-material";

export const DropDownList = (
  {
    values,
    onChange,
    selected,
    showAddOption,
    labelAddOption,
    handleAdd,
    onDelete,
    showDeleteOption,
  }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (item) => {
    setOpen(!open);
    onChange(item)
  }

  const handleCurrentClick = () => {
    setOpen(!open);
  }

  const handleDelete = (item) => {
    setOpen(!open);
    onDelete(item[0])
  }


  return (
    <List
      sx={{maxWidth: '100%', minWidth: '100%', bgcolor: 'background.paper'}}
      aria-labelledby="nested-list-subheader"
    >

      <ListItemButton onClick={handleCurrentClick}
                      sx={{height: 25, width: '100%', maxWidth: '100%', minWidth: '100%'}}>
        <ListItemText primary={selected[1]}/>
        {open ? <ExpandLess/> : <ExpandMore/>}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{width: '100%', maxWidth: '100%', minWidth: '100%'}}>
          {values.map(item => (
              <div key={item[0]} style={{display: "flex", justifyContent: "space-between"}}>
                <ListItemButton key={item[0]} onClick={(e) => {
                  handleClick(item)
                }} sx={{height: 25}}>
                  <ListItemText primary={item[1]}/>
                </ListItemButton>

                {showDeleteOption && (
                  <ListItemButton key={item[0]} onClick={(e) => {
                    handleDelete(item)
                  }} sx={{height: 25}}>
                    <Delete/>
                  </ListItemButton>
                )}
              </div>
            )
          )}
          {showAddOption &&
            <ListItemButton onClick={handleAdd}
                            sx={{height: 25, width: '100%', maxWidth: '100%', minWidth: '100%'}}>
              <Add/>
              <ListItemText primary={labelAddOption}/>
            </ListItemButton>
          }
        </List>
      </Collapse>
    </List>
  )
}