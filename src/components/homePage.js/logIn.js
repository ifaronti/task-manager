import { useState, useRef } from "react";
import TheForm from "./form";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { changeBoardsInfo } from "../features/boardsInfo";
import { changeData } from "../features/dataSlice";
import axios from "axios";

export default function Login() {
  const [userPass, setUserPass] = useState({
    username: "",
    password: "",
    showConfirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const logRef = useRef();
  const navTo = useNavigate();
  const dispatch = useDispatch();

  const goto = () => {
    navTo("/manager");
  };

  const settings = (data) => {
    if (!data.boards[0]) {
      dispatch(changeData([]));
    }
    dispatch(changeBoardsInfo(data.boards));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserPass((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const postLogin = async () => {
    try {
      let { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/login`,
        { ...userPass }
      );
      settings(data.data);
      localStorage.setItem("taskId", data.data._id);
      localStorage.setItem("token", data.token);
      goto();
    } catch (err) {
      setLoading(false);
      setErrMsg(err.message);
    }
  };

  const handleSumit = async (e) => {
    e.preventDefault();
    let { username, password } = userPass;
    if (!username || !password || username === "" || password === "") {
      setErrMsg("username and password required");
      return;
    }
    setLoading(true);
    await postLogin();
    setUserPass({ username: "", password: "" });
  };

  return (
    <section
      ref={logRef}
      className="w-full bg-[#E4EBFA] h-screen flex flex-col items-center justify-center gap-3 relative"
    >
      <TheForm
        userPass={userPass}
        errMSG={errMsg}
        loading={loading}
        handleSubmit={handleSumit}
        text={"Login"}
        handleChange={handleChange}
      />
    </section>
  );
}
