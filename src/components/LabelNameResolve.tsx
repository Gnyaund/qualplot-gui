import * as React from "react";
import { InputLabel, Select, SelectChangeEvent, MenuItem } from "@mui/material";
//import VariableMenuItem from "./VariableMenuItem";

type Props = {
    valuetype: string
}
export default function LabelNameResolve(props: Props){
    const [value, setValue] = React.useState("");
    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
    }
    return (
        <div>
            <InputLabel>{props.valuetype}</InputLabel>
            <Select value={value} onChange={handleChange} label={props.valuetype} sx={{minWidth:120}}>

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
            </Select>
        </div>
    )

}
//                <VariableMenuItem setValue={setValue}/>