import React, { useState } from "react";
import { IconButton, Menu, Box, Typography, Button, FormControl, InputLabel, Select, MenuItem as MuiMenuItem } from "@mui/material";
import { Add, Remove, Person, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
const PassengerDropdown = ({adults,children,infants,increment,decrement,handleCancelprop}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [total, setTotal] = useState(1); 
  
  
  const [open, setOpen] = useState(false);

  const [initialAdults, setInitialAdults] = useState(adults);
  const [initialChildren, setInitialChildren] = useState(children);
  const [initialInfants, setInitialInfants] = useState(infants);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

 

  const handleCancel = () => {
    handleCancelprop(initialAdults,initialChildren,initialInfants);
    handleClose();
  };

  const handleDone = () => {
    setInitialAdults(adults);
    setInitialChildren(children);
    setInitialInfants(infants);
    setTotal(adults+children+infants)
    handleClose();
  };
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "6px 12px",
          backgroundColor: "#f4f4f4",
          color: "#555",
          height: 55, 
           width: { xs: "80px", sm: "120px" } 
        }}
      >
        <Person sx={{ marginRight: 1 }} />
{total}
        {open ? <KeyboardArrowUp sx={{ marginLeft: 2 }} /> : <KeyboardArrowDown sx={{ marginLeft: 2 }} />}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ maxWidth: 400 }}
      >
        <MuiMenuItem>
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
            <Typography>Adults</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => decrement("adults")} size="small">
                <Remove />
              </IconButton>
              <Typography sx={{ marginX: 2 }}>{adults}</Typography>
              <IconButton onClick={() => increment("adults")} size="small">
                <Add />
              </IconButton>
            </Box>
          </Box>
        </MuiMenuItem>
        <MuiMenuItem>
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
            <Typography>Children (Aged 2-11)</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => decrement("children")} size="small">
                <Remove />
              </IconButton>
              <Typography sx={{ marginX: 2 }}>{children}</Typography>
              <IconButton onClick={() => increment("children")} size="small">
                <Add />
              </IconButton>
            </Box>
          </Box>
        </MuiMenuItem>

        <MuiMenuItem>
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
            <Typography>Infants</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => decrement("infants")} size="small">
                <Remove />
              </IconButton>
              <Typography sx={{ marginX: 2 }}>{infants}</Typography>
              <IconButton onClick={() => increment("infants")} size="small">
                <Add />
              </IconButton>
            </Box>
          </Box>
        </MuiMenuItem>

        <MuiMenuItem onClick={handleCancel}>
          <Button variant="outlined" color="secondary" fullWidth>
            Cancel
          </Button>
        </MuiMenuItem>

        <MuiMenuItem onClick={handleDone}>
          <Button variant="contained" color="primary" fullWidth>
            Done
          </Button>
        </MuiMenuItem>
      </Menu>

    </div>
  );
};

export default PassengerDropdown;
