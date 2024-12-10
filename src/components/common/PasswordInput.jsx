import { useForm } from "../../context/FormProvider";

const PasswordInput = ({ label, name, type = "password" }) => {
  const form = useForm();
  return (
    <label>
        {label}
        <input
          type={type}
          name={name}
          value={form.state?.[name] || ""}
          onChange={(e) => form.setValue(name, e.target.value)}
        />
      </label>
  );
};

export default PasswordInput;