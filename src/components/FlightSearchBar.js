import React, { useState } from "react";
import {
  Select,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
} from "@mui/material";
import PassengerDropdown from "./PassengerDropdown";
import TravelSearchForm from "./TravelSearchForm";

const FlightSearchBar = () => {
  const [tripType, setTripType] = useState("roundTrip");
  const [cabinClass, setCabinClass] = useState("economy");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const handleTripTypeChange = (event) => {
    setTripType(event.target.value);
  };

  const handleClassChange = (event) => {
    setCabinClass(event.target.value);
  };

  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 1,
      
    }}>
    <Box
      sx={{
        backgroundColor: "#1e1e1e",
        padding: 3,
        display: "flex",
        flexWrap: "nowrap",
        gap: 1,
        overflowX: "auto",
        width: "100%",
        flexDirection: { xs: "row", sm: "row" }, 
      }}
    >
<FormControl
  variant="outlined"
  sx={{ width: { xs: "120px", sm: "130px" } }}
> 
    <InputLabel sx={{ color: "#fff", fontSize: { xs: "0.85rem", sm: "1rem" } }}>Trip Type
     </InputLabel>
        <Select
          value={tripType}
          onChange={handleTripTypeChange}
          label="Trip Type"
          sx={{ backgroundColor: "#2a2a2a", color: "#fff", borderRadius: 2,fontSize: { xs: "0.85rem", sm: "1rem" } }}
        >
          <MenuItem value="roundTrip">Round Trip</MenuItem>
          <MenuItem value="oneWay">One Way</MenuItem>
          <MenuItem value="multiCity">Multi-City</MenuItem>
        </Select>
      </FormControl>

      <PassengerDropdown
        adults={adults}
        children={children}
        infants={infants}
        setAdults={setAdults}
        setChildren={setChildren}
        setInfants={setInfants}
      />


<FormControl
  variant="outlined"
  sx={{ width: { xs: "110px", sm: "120px" } }}
>
    <InputLabel sx={{ color: "#fff", fontSize: { xs: "0.85rem", sm: "1rem" } }}>
    Class
  </InputLabel>
        <Select
          value={cabinClass}
          onChange={handleClassChange}
          label="Class"
          sx={{ backgroundColor: "#2a2a2a", color: "#fff", borderRadius: 2,fontSize: { xs: "0.85rem", sm: "1rem" } }}
        >
          <MenuItem value="economy">Economy</MenuItem>
          <MenuItem value="premium_economy">Premium Economy</MenuItem>
          <MenuItem value="business">Business</MenuItem>
          <MenuItem value="first">First</MenuItem>
        </Select>
      </FormControl>

    </Box>
    <TravelSearchForm tripType={tripType} cabinClass={cabinClass} adults={adults} children={children} infants={infants} />
    </Box>
  );
};

export default FlightSearchBar;
