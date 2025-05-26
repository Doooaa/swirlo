import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useCategoriesContext } from "../../context/CategoriesContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";

export default function CategoryCard() {
  const { categories, isLoading, isError } = useCategoriesContext();
  const navigate = useNavigate();
  if (isLoading) return <LoadingSpinner />;
  if (isError) return toast.error("Error loading categories");


  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: { sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 4, sm: 6 },
          p: 4,
          flexWrap: "wrap",
        }}
      >
        {categories?.map((cat) => (
          <Box
            key={cat._id}
            onClick={() => navigate(`/menu-items/${cat.name}`)}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              marginBottom: { xs: 4, sm: 0 },
            }}
          >
            <Box
              sx={{
                width: { xs: 140, sm: 170 },
                height: { xs: 140, sm: 170 },
                borderRadius: "50%",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <img
                src={cat.thumbnail}
                alt="category"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
            <Typography
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                fontWeight: "700",
                color: "var(--primary)",
                fontFamily: "Playpen Sans Hebrew",
              }}
              variant="h6"
            >
              {cat.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
}
