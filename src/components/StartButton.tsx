import React, { useState } from "react";
import { CssBaseline, Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from '@mui/icons-material/Send';

export default function StartButton () {
    const darkTheme = createTheme({
        palette: {
          mode: "dark",
        },
    });

    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        setLoading(true);
    }

    const [pyStart, pyExecute] = useState("");
    const handlePyhonExecute = async () => {
        const exec = await window.electronAPI.pyExec()
        
        if (exec === 0) {
        pyExecute("Done");
        }
    }
    return (
        <ThemeProvider theme={darkTheme}>
            <LoadingButton
            onClick={handleClick}
            loading={loading}
            loadingPosition="center"
            variant="contained"
            color="secondary"
            >
            Start
            </LoadingButton>
        </ThemeProvider>

    )


}

/*
        <Button variant="contained" component="label" color="secondary">
        Start
        </Button>
*/