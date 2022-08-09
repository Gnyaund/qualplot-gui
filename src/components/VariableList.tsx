import * as React from "react";
import { FormControl } from "@mui/material";
import { Box } from "@mui/material";
import LabelNameResolve from "./LabelNameResolve";

export default function VariableList() {
  return (
    <Box sx={{ display: "flex", padding: "10px" }}>
      <FormControl sx={{ minWidth: 120 }}>
        <LabelNameResolve valuetype="Start Seed"></LabelNameResolve>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
        <LabelNameResolve valuetype="End Seed"></LabelNameResolve>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
        <LabelNameResolve valuetype="Max Node"></LabelNameResolve>
      </FormControl>
    </Box>
  );
}
