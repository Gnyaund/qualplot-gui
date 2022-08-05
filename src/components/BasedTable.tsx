import React, { useState } from "react";
import { CssBaseline, Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import VariableList from "./VariableList";
import Uploader from "./Uploader";
import SettingsModalWindow from "./SettingsModalWindow";
import StartButton from "./StartButton";
import FrameToolBar from "./FrameToolBar";
import "./../BasedTable.css";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

//Uploader呼び出すとイベントが発生しないので子から親にイベント渡さないといけない？
export default function BasedTable() {
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <div className="conts">
          <FrameToolBar />
          <Box
            sx={{
              width: "100%",
              height: "500px",
            }}
          >
            <Grid
              container
              direction="column"
              justifyContent="space-around"
              alignItems="center"
              paddingTop="70px"
              className="itemgrid"
            >
              <Grid
                sx={{
                  textAlign: "center",
                  fontSize: "45px",
                  fontFamily: "ROLAchan",
                }}
              >
                <Box sx={{ paddingBottom: "50px" }}>QualPlot</Box>
              </Grid>
              <Grid
                sx={{
                  bgcolor: "#252526",
                  borderRadius: "15px",
                }}
              >
                <VariableList />
              </Grid>
              <Grid>
                <Box sx={{ display: "flex", padding: "10px" }}>
                  <Uploader />
                </Box>
              </Grid>
              <Grid>
                <StartButton />
              </Grid>
              <Grid>
                <SettingsModalWindow></SettingsModalWindow>
              </Grid>
            </Grid>
          </Box>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}
/*
                <Box sx={{bgcolor:"#1E1E1E", width:"100%", height:"auto", paddingBottom:"20px"}}>
                    <Grid container spacing={2} paddingTop="70px">
                        <Grid item xs={15} sx={{textAlign:"center",fontSize:"45px", fontFamily:"ROLAchan"}}>
                        QualPlot
                        </Grid>
                        <Grid sx={{bgcolor:"#252526", marginLeft:"auto", marginRight:"auto", borderRadius:"15px"}}>
                            <VariableList />
                        </Grid>
                    </Grid>
                </Box>

                            <IconButton color="secondary" aria-label="settings" onClick={ShowSettings}>
                                <SettingsApplicationsOutlinedIcon />
                                <SettingsModalWindow showflag={showSettings} setShowSettings={setShowSettings}/>
                            </IconButton>

*/
