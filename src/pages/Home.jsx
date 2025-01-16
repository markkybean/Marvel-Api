import { useEffect, useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { Link as RouterLink } from "react-router-dom";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const publicKey = "596f15aa499c5fd005170d61abad7082";
  const privateKey = "5a7535cdd46318cd3febc38740c2fa95b73598f9";
  const baseUrl = "https://gateway.marvel.com/v1/public/characters";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ts = new Date().getTime(); // Generate timestamp
        const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

        // Build the request URL
        const url = `${baseUrl}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

        const response = await axios.get(url);
        console.log(response.data);
        setData(response.data.data.results); // Assuming response data structure
      } catch (error) {
        console.error("Error fetching data from Marvel API:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched or an error occurs
      }
    };
    fetchData();
  }, []);

  // Helper function to truncate description
  const truncateDescription = (description, maxLength = 100) => {
    if (!description) return "No description available.";
    return description.length > maxLength
      ? description.slice(0, maxLength) + "..."
      : description;
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Marvel Characters
      </Typography>

      {/* Show loading spinner while fetching data */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {data.map((character) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
              <Card
                sx={{
                  maxWidth: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: 400, // Ensures consistent height for all cards
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {character.name}{" "}
                      {new Date(character.modified).getFullYear()}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {truncateDescription(character.description)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link
                    component={RouterLink}
                    to="/character"
                    underline="none"
                    state={{ character }}
                  >
                    More Info
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
