import React, { useState } from "react";
import { Button } from "@mui/material";


export default function Uploader() {
    const [path, setPath] = useState("")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPath(() => e.target.value)
    }//仕様でfakepathになる, pathはjsonに書き込み
    return(
        <div>
            <Button variant="outlined" component="label" color="secondary">
            Scenario File
            <input
                type="file"
                hidden
                value={path}
                accept=".config,.display,.nodes,.app"
                onChange={handleChange}
            />
            </Button>
        </div>
    )
} 
//            <button onClick={() => alert(path)}>値の確認</button>