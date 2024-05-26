import React from "react";
import { Grid, Skeleton, Stack } from "@mui/material";

export const LayoutLoader = () => {
  return (
    <Grid container height={"calc(100vh - 4rem)"} spacing={"1rem"}>
      <Grid
        item
        sm={4}
        md={3}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        height={"100%"}
        bgcolor="primary.main"
      >
        <Skeleton variant="rectangular" height={"100vh"} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        lg={6}
        height={"100%"}
        bgcolor="primary.main"
      >
        <Stack spacing={"1rem"}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" height={"10rem"}></Skeleton>
          ))}
        </Stack>
      </Grid>
      <Grid
        item
        md={4}
        lg={3}
        height={"100%"}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        bgcolor="primary.main"
      >
        <Skeleton variant="rectangular" height={"100vh"} />
      </Grid>
    </Grid>
  );
};
