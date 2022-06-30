import React, { useState } from "react";
import { Button } from "@mui/material";


export default function Uploader() {
    const [path, setPath] = useState("")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPath(() => e.target.value)
    }//仕様でfakepathになる
    return(
        <div>
            <Button variant = "outlined" color="secondary">
                Scenario File
                <input value = {path} type = "file" hidden onChange={handleChange} />
            </Button>
        </div>
    )
} 
//            <button onClick={() => alert(path)}>値の確認</button>