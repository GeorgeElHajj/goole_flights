import React from "react";
import { Box, Typography, Grid, Card, CardContent, Avatar, Button } from "@mui/material";
import { FlightTakeoff, FlightLand } from "@mui/icons-material";
import { format } from "date-fns"; 
const FlightSearchResults = ({ flights }) => {
  if (!flights || flights.length === 0) {
    return (
      <Box sx={{ textAlign: "center", padding: 3 }}>
        <Typography variant="h6" color="textSecondary">
          No flights found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
        ✈️ Available Flights
      </Typography>

      {flights.map((flight, index) => {
        const formattedDeparture = flight.departureTime
          ? format(new Date(flight.departureTime), "hh:mm a")
          : "N/A";

        const formattedArrival = flight.arrivalTime
          ? format(new Date(flight.arrivalTime), "hh:mm a")
          : "N/A";

        return (
          <Card
            key={index}
            sx={{
              marginBottom: 3,
              boxShadow: 5,
              borderRadius: "15px",
              backgroundColor: "#ffffff",
              padding: 2,
            }}
          >
            <CardContent>
              <Grid
                container
                spacing={3}
                alignItems="center"
                justifyContent={{ xs: "center", sm: "space-between" }}
                flexDirection={{ xs: "column", sm: "row" }}
                textAlign={{ xs: "center", sm: "inherit" }} 
              >
                <Grid item xs={12} sm={3}>
                  <Avatar
                    alt={flight.carrier}
                    src={flight.logoUrl}
                    sx={{ width: 50, height: 50, margin: "auto", boxShadow: 3 }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 1 }}>
                    {flight.carrier}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Flight #{flight.flightNumber}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                    <FlightTakeoff color="primary" />
                    <Typography variant="h6">{formattedDeparture}</Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    {flight.duration} min | {flight.stops} stop(s)
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, marginTop: 1 }}>
                    <FlightLand color="secondary" />
                    <Typography variant="h6">{formattedArrival}</Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#27ae60", fontSize: "1.3rem" }}>
                    {flight.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      marginTop: 2,
                      borderRadius: "20px",
                      padding: "8px 20px",
                      textTransform: "none",
                      fontWeight: "bold",
                      boxShadow: 2,
                    }}
                  >
                    View Details
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default FlightSearchResults;
