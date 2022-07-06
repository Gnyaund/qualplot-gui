import React, { useState } from "react";
import { Button } from "@mui/material";


export default function Uploader() {
    const [path, setPath] = useState("")
    const handleChange = async () => {
        //setPath(() => e.target.value)
        const filePath = await window.electronAPI.openFile()
        setPath(() => filePath)
    }//仕様でfakepathになる, pathはjsonに書き込み

    return(
        <div>
            <Button variant="outlined" component="label" color="secondary" id="scenario-file" onClick={handleChange}>
            Scenario File
            </Button>
            <p>{path}</p>
        </div>
    )
} 
//            <button onClick={() => alert(path)}>値の確認</button>
/*
e: React.ChangeEvent<HTMLInputElement>)
            <input
                type="file"
                hidden
                value={path}
                accept=".config,.display,.nodes,.app"
                onChange={handleChange}
            />

*/