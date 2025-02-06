import React, { useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Grid,
  Box,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import axios from "axios";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FlightSearchResults from "./FlightSearchResults";

const FlightSearchForm = ({ adults, children, infants, cabinClass }) => {
  const [searchTermFrom, setSearchTermFrom] = useState("");
  const [searchTermTo, setSearchTermTo] = useState("");
  const [suggestionsFrom, setSuggestionsFrom] = useState([]);
  const [suggestionsTo, setSuggestionsTo] = useState([]);
  const [flightDate, setFlightDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [sort, setSort] = useState("best");

  const [originSkyId, setOriginSkyId] = useState("");
  const [destinationSkyId, setDestinationSkyId] = useState("");
  const [originEntityId, setOriginEntityId] = useState("");
  const [destinationEntityId, setDestinationEntityId] = useState("");
  const [flights, setFlights] = useState([]);

  const fetchAirports = async (searchTerm,setSuggestions, isFrom = true) => {
    try {
      const response = await axios.get(
        "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport",
        {
          params: { query: searchTerm },
          headers: {
            "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
            "X-RapidAPI-Key":
              "0db0aa1238msh2ff090ae11415e6p1e7d61jsn7ca417944b96",
          },
        }
      );

      const airports = response.data.data;
      const formattedSuggestions = airports.map((airport) => ({
        name: airport.presentation.title,
        code: airport.skyId,
        country: airport.presentation.subtitle,
        suggestion: airport.presentation.suggestionTitle,
        entityId: airport.entityId,
      }));

      if (isFrom) {
        setSuggestionsFrom(formattedSuggestions);
      } else {
        setSuggestionsTo(formattedSuggestions);
      }
    } catch (error) {
      console.error("Error fetching airports:", error);
    }
  };

  const handleInputChangeFrom = (e) => {
    const value = e.target.value;
    setSearchTermFrom(value);

    if (value) {
      fetchAirports(value, setSuggestionsFrom);
    } else {
      setSuggestionsFrom([]);
    }
  };

  const handleInputChangeTo = (e) => {
    const value = e.target.value;
    setSearchTermTo(value);

    if (value) {
      fetchAirports(value, setSuggestionsTo, false);
    } else {
      setSuggestionsTo([]);
    }
  };

  const handleDateChange = (newDate, field) => {
    if (field === "flightDate") {
      setFlightDate(newDate);
    } else {
      setReturnDate(newDate);
    }
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleSearch = async () => {
    if (
      !originSkyId ||
      !destinationSkyId ||
      !originEntityId ||
      !destinationEntityId ||
      !flightDate
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const requestPayload = {
      originSkyId,
      destinationSkyId,
      originEntityId,
      destinationEntityId,
      date: flightDate.toISOString().split("T")[0],
      returnDate: returnDate ? returnDate.toISOString().split("T")[0] : "",
      cabinClass,
      adults,
      childrens: children,
      infants,
      sortBy: sort,
    };

    try {
      const response = await axios.get(
        "https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlightsComplete",
        {
          params: requestPayload,
          headers: {
            "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
            "X-RapidAPI-Key":
              "0db0aa1238msh2ff090ae11415e6p1e7d61jsn7ca417944b96",
          },
        }
      );
      const itineraries = response.data.data.itineraries;

      const flightDetails = itineraries.map((flight) => {
        const leg = flight.legs[0];
        const carrier = leg.carriers.marketing;
        return {
          price: flight.price.formatted,
          departureTime: leg.departure,
          arrivalTime: leg.arrival,
          duration: leg.durationInMinutes,
          stops: leg.stopCount,
          carrier: carrier[0].name,
          logoUrl: carrier[0].logoUrl,
          flightNumber: leg.segments[0].flightNumber,
        };
      });

      setFlights(flightDetails);
    } catch (error) {
      console.error("Error fetching flight data:", error);
    }
  };

  return (
    < >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box
          sx={{
            width: "100%",
            padding: 3,
            display: "flex",
            flexWrap: "wrap",
            justifyContent:'center',
            gap: 2, 
            backgroundColor: "#f5f5f5",
          }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Where From"
              variant="outlined"
              value={searchTermFrom}
              onChange={handleInputChangeFrom}
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <LocationOn />
                  </IconButton>
                ),
              }}
            />
            <List>
              {suggestionsFrom.map((airport, index) => (
                <div key={index}>
                  <ListItem
                    button
                    onClick={() => {
                      setOriginSkyId(airport.code);
                      setOriginEntityId(airport.entityId);
                      setSearchTermFrom(airport.name);
                      setSuggestionsFrom([]);
                    }}
                  >
                    <ListItemIcon>
                      <LocationOn />
                    </ListItemIcon>
                    <ListItemText
                      primary={airport.suggestion}
                      secondary={`${airport.name} (${airport.code}) - ${airport.country}`}
                    />
                  </ListItem>
                  {index < suggestionsFrom.length - 1 && <Divider />}
                </div>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Where To"
              variant="outlined"
              value={searchTermTo}
              onChange={handleInputChangeTo}
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <LocationOn />
                  </IconButton>
                ),
              }}
            />
            <List>
              {suggestionsTo.map((airport, index) => (
                <div key={index}>
                  <ListItem
                    button
                    onClick={() => {
                      setDestinationSkyId(airport.code);
                      setDestinationEntityId(airport.entityId);
                      setSearchTermTo(airport.name);
                      setSuggestionsTo([]);
                    }}
                  >
                    <ListItemIcon>
                      <LocationOn />
                    </ListItemIcon>
                    <ListItemText
                      primary={airport.suggestion}
                      secondary={`${airport.name} (${airport.code}) - ${airport.country}`}
                    />
                  </ListItem>
                  {index < suggestionsTo.length - 1 && <Divider />}
                </div>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} sm={6}>
            <DesktopDatePicker
              label="Date of Flight"
              inputFormat="MM/dd/yyyy"
              value={flightDate}
              onChange={(newDate) => handleDateChange(newDate, "flightDate")}
              renderInput={(params) => (
                <TextField {...params} fullWidth variant="outlined" />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DesktopDatePicker
              label="Return Date"
              inputFormat="MM/dd/yyyy"
              value={returnDate}
              onChange={(newDate) => handleDateChange(newDate, "returnDate")}
              renderInput={(params) => (
                <TextField {...params} fullWidth variant="outlined" />
              )}
            />
          </Grid>
        </Box>
        
      </LocalizationProvider>
      <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 2,
    marginTop: 2,   }}
>
<Grid item xs={12} sm={6}>
            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel id="sort-by-label">Sort By</InputLabel>
              <Select value={sort} onChange={handleSortChange} label="Sort By">
                <MenuItem value="best">Best</MenuItem>
                <MenuItem value="price_high">Price High</MenuItem>
                <MenuItem value="fastest">Fastest</MenuItem>
                <MenuItem value="outbound_take_off_time">
                  Outbound Take Off Time
                </MenuItem>
                <MenuItem value="outbound_landing_time">
                  Outbound Landing Time
                </MenuItem>
                <MenuItem value="return_take_off_time">
                  Return Take Off Time
                </MenuItem>
                <MenuItem value="return_landing_time">
                  Return Landing Time
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
  <Button
    variant="contained"
    onClick={handleSearch}
    sx={{
      minWidth: 100,
      height: "56px", 
    }}
  >
    Search
  </Button>
</Box>

      {flights.length === 0 ? (
       <></>
      ) : (
        <FlightSearchResults flights={flights} />
      )}
    </>
  );
};

export default FlightSearchForm;
