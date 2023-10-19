import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const Title = () => {
  const Typo = styled(Typography)(({ theme }) => ({
    padding: "10px",
    cursor: "pointer",
  }));
  return (
    <Box sx={{ padding: "30px" }}>
      <div style={{ fontSize: "30px" }}>iPhone</div>
      <div style={{ fontSize: "14px", paddingTop: "10px" }}>
        Say goodbye to boring iPhone cases. Find protective and durable iPhone
        cases in stylish designs ranging from minimalist to bold fun patterns.
        Discover compact cases that show off your personality.
      </div>
    </Box>
  );
};

export default Title;
