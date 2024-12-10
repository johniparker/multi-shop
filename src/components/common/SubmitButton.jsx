import { useForm } from "../../context/FormProvider";
const SubmitButton = ({ label }) => {
    const { handleSubmit } = useForm();
    return <button type="submit" onClick={handleSubmit}>{label}</button>
}

export default SubmitButton;