import * as React from "react";
import { MenuItem } from "@mui/material";

type Props = {
    setValue: Function
}
export default function VariableMenuItem (props: Props){
    let num: number;
    num = 1;
    return (
        <div>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <p>{props.setValue(num)}</p>
        </div>
    )
}