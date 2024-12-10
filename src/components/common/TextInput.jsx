import { useForm } from "../../context/FormProvider";

const TextInput = ({ label, name, type = "text" }) => {
  const form = useForm();
  return (
    <label>
      {label}
      <input
        name={name}
        type={type}
        value={form.state?.[name] || ""}
        onChange={(e) => form.setValue(name, e.target.value)}
      />
    </label>
  );
};

export default TextInput;