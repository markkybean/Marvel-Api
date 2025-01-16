import { useLocation } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import { Grid } from "@mui/material"; // Import Grid for layout

export default function Character() {
  const location = useLocation();
  const { character } = location.state || {};

  console.log(character);

  if (!character) {
    return <div>No character data available.</div>;
  }

  const comicsList = character.comics?.items.slice(0, 3) || [];
  const seriesList = character.series?.items.slice(0, 3) || [];
  const storiesList = character.stories?.items.slice(0, 3) || [];

  return (
    <div>
      <Card
        sx={{
          maxWidth: 800,
          borderRadius: 2,
          margin: "20px auto",
          boxShadow: 3,
          padding: 2,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // Make the layout stack vertically on small screens
        }}
      >
        <Box sx={{ flex: 1, paddingRight: 2 }}>
          <CardMedia
            component="img"
            height="300"
            image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            sx={{
              objectFit: "cover",
              borderRadius: "8px",
              width: "100%", // Ensure image is responsive
            }}
          />
        </Box>
        <CardContent sx={{ flex: 2 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: { xs: "1.5rem", sm: "2rem" }, // Responsive font size
            }}
          >
            {character.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", textAlign: "center" }}
          >
            {character.modified
              ? new Date(character.modified).toLocaleDateString()
              : "No modification date available."}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
            {character.description || "No description available."}
          </Typography>
          <Divider sx={{ my: 2 }} />

          {comicsList.length > 0 && (
            <>
              <Chip label="Comics" color="primary" sx={{ mb: 1 }} />
              <Grid container spacing={2} sx={{ mb: 2 }}>
                {comicsList.map((comic, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {comic.name}
                      </Typography>
                      <Link variant="body2" underline="none">
                        More Info
                      </Link>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Divider sx={{ my: 2 }} />
            </>
          )}

          {seriesList.length > 0 && (
            <>
              <Chip label="Series" color="secondary" sx={{ mb: 1 }} />
              <Grid container spacing={2} sx={{ mb: 2 }}>
                {seriesList.map((series, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {series.name}
                      </Typography>
                      <Link variant="body2" underline="none">
                        More Info
                      </Link>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Divider sx={{ my: 2 }} />
            </>
          )}

          {storiesList.length > 0 && (
            <>
              <Chip label="Stories" color="success" sx={{ mb: 1 }} />
              <Grid container spacing={2} sx={{ mb: 2 }}>
                {storiesList.map((story, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {story.name}
                      </Typography>
                      <Link variant="body2" underline="none">
                        More Info
                      </Link>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
