import { TextField } from "@mui/material";

const TextInput = ({ label, name, value, onChange, type = "text", multiline=false }) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      multiline={multiline} // Enables textarea
      rows={multiline ? 4 : 1} // Controls rows for textarea
      fullWidth
      variant="outlined"
      margin="normal"
    />
  );
};

export default TextInput;