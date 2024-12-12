import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const SelectInput = ({ options, name, label, value, onChange }) => {
  return (
    <FormControl fullWidth variant="outlined" margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={value || ""}
        onChange={onChange}  // Handle onChange for select
        label={label}
        required
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
