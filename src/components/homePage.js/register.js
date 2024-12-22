import { useState } from "react";
import TheForm from "./form";
import { registerUser } from "../API-Calls/register";
import { useNavigate } from "react-router";

export default function Register() {
  const [userPass, setUserPass] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    showConfirm: true,
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const goTo = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoading(false);
    setUserPass((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSumit = async (e) => {
    e.preventDefault();
    const { username, password, confirmPassword } = userPass;
    if (!username || !password || username === "" || password === "") {
      return setErr("All fields are required");
    }
    if (password !== confirmPassword) {
      return setErr("Passwords do not match");
    }
    setLoading(true);
    await registerUser(userPass);
    setUserPass({ username: "", password: "" });
    goTo("/");
  };

  return (
    <section className="w-full bg-[#E4EBFA] h-screen flex flex-col items-center justify-center gap-3 relative">
      <TheForm
        userPass={userPass}
        errMSG={err}
        loading={loading}
        handleChange={handleChange}
        handleSubmit={handleSumit}
        text={"Register"}
      />
    </section>
  );
}