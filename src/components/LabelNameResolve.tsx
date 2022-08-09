import * as React from "react";
import { InputLabel, Select, SelectChangeEvent, MenuItem } from "@mui/material";

type Props = {
  valuetype: string;
};
export default function LabelNameResolve(props: Props) {
  const [value, setValue] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    const value: number = Number(event.target.value);
    if (props.valuetype === "Start Seed") window.electronAPI.stSeed(value);
    if (props.valuetype === "End Seed") window.electronAPI.endSeed(value);
    if (props.valuetype === "Max Node") window.electronAPI.maxNode(value);
  };

  return (
    <div>
      <InputLabel>{props.valuetype}</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        label={props.valuetype}
        sx={{ minWidth: 120 }}
      >
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
        <MenuItem value={11}>11</MenuItem>
        <MenuItem value={12}>12</MenuItem>
        <MenuItem value={13}>13</MenuItem>
        <MenuItem value={14}>14</MenuItem>
        <MenuItem value={15}>15</MenuItem>
        <MenuItem value={16}>16</MenuItem>
        <MenuItem value={17}>17</MenuItem>
        <MenuItem value={18}>18</MenuItem>
        <MenuItem value={19}>19</MenuItem>
        <MenuItem value={20}>20</MenuItem>
      </Select>
    </div>
  );
}
//                <VariableMenuItem setValue={setValue}/>
