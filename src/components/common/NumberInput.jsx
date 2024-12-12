import { TextField } from "@mui/material";

const NumberInput = ({ label, name, value, onChange, type="number" }) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value || ""}
      onChange={onChange}  // Handle onChange for number input
      type={type}
      fullWidth
      variant="outlined"
      margin="normal"
    />
  );
};

export default NumberInput;
