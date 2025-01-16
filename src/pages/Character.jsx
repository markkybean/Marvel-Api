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
import Divider from "@mui/material/Divider"; // Adding Divider for better separation of sections
import Chip from "@mui/material/Chip"; // Optional Chip for enhanced presentation of sections
import Link from "@mui/material/Link";


export default function Character() {
  const location = useLocation();
  const { character } = location.state || {}; // Destructure the character data from the state passed via Link

  console.log(character); // Logs the character data for debugging

  if (!character) {
    return <div>No character data available.</div>;
  }

  // Limit the number of items to 3 for comics, series, and stories
  const comicsList = character.comics?.items.slice(0, 3) || [];
  const seriesList = character.series?.items.slice(0, 3) || [];
  const storiesList = character.stories?.items.slice(0, 3) || [];

  return (
    <div>
      <Card
        sx={{
          maxWidth: 800, // Adjusted for the horizontal layout
          borderRadius: 2,
          margin: "20px auto",
          boxShadow: 3,
          padding: 2,
          display: "flex", // Use flexbox for horizontal layout
        }}
      >
        <Box sx={{ flex: 1, paddingRight: 2 }}>
          <CardMedia
            component="img"
            height="300"
            image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            sx={{ objectFit: "cover", borderRadius: "8px" }}
          />
        </Box>
        <CardContent sx={{ flex: 2 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            {character.name}
          </Typography>
          {/* Modified Date */}
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", textAlign: "center" }}
          >
            {character.modified
              ? new Date(character.modified).toLocaleDateString()
              : "No modification date available."}
          </Typography>
          <Divider sx={{ my: 2 }} /> {/* Divider between sections */}
          {/* Description */}
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
            {character.description || "No description available."}
          </Typography>
          <Divider sx={{ my: 2 }} /> {/* Divider between sections */}
          {/* Comics */}
          {comicsList.length > 0 && (
            <>
              <Chip label="Comics" color="primary" sx={{ mb: 1 }} />
              <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
                {comicsList.map((comic, index) => (
                  <Box key={index} sx={{ flex: 1, textAlign: "center" }}>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {comic.name}
                    </Typography>
                    <Link
                      variant="body2"
                        underline="none"
                    >
                      More Info
                    </Link>
                  </Box>
                ))}
              </Box>
              <Divider sx={{ my: 2 }} />
            </>
          )}
          {/* Series */}
          {seriesList.length > 0 && (
            <>
              <Chip label="Series" color="secondary" sx={{ mb: 1 }} />
              <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
                {seriesList.map((series, index) => (
                  <Box key={index} sx={{ flex: 1, textAlign: "center" }}>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {series.name}
                    </Typography>
                    <Link
                      variant="body2"
                        underline="none"
                    >
                      More Info
                    </Link>
                  </Box>
                ))}
              </Box>
              <Divider sx={{ my: 2 }} />
            </>
          )}
          {/* Stories */}
          {storiesList.length > 0 && (
            <>
              <Chip label="Stories" color="success" sx={{ mb: 1 }} />
              <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
                {storiesList.map((story, index) => (
                  <Box key={index} sx={{ flex: 1, textAlign: "center" }}>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {story.name}
                    </Typography>
                    <Link
                      variant="body2"
                        underline="none"
                    >
                      More Info
                    </Link>
                  </Box>
                ))}
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
