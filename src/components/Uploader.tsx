import React, { useState } from "react";
import { Button } from "@mui/material";

export default function Uploader() {
  const [path, setPath] = useState("");
  const handleChange = async () => {
    //setPath(() => e.target.value)
    const filePath: string = await window.electronAPI.openFile("scenarioPath");
    setPath(() => filePath);
  }; //仕様でfakepathになる, pathはjsonに書き込み

  return (
    <div>
      <Button
        variant="outlined"
        component="label"
        color="secondary"
        id="scenario-file"
        onClick={handleChange}
      >
        Scenario File
      </Button>
    </div>
  );
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
