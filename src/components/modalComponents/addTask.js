import { useState, useRef, useEffect } from "react";
import { taskTitle } from "./modalExports";
import { taskDescription } from "./modalExports";
import { theSubtasks } from "./modalExports";
import ClickOutside from "./clickOutside";
import { iregButton } from "./buttons";
import { regButton } from "./buttons";
import { useDispatch, useSelector } from "react-redux";
import { add2Task } from "../API-Calls/createTask";
import { changeCID } from "../features/columnId";
import Status from "./statusSelect.js/statusSelect";
import { showModal } from "../features/modalSlice";
import { changeFrame } from "../features/currentModal";
import { changeData } from "../features/dataSlice";

export default function AddTask() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
    subTasks: [],
  });
  const [taskId, setTaskId] = useState("");
  const [token, setToken] = useState("");
  const theRef = useRef();
  const dispatch = useDispatch();
  let cid = useSelector((state) => state.columnId.value);
  let board = useSelector((state) => state.board.value);
  const reduxData = useSelector((state) => state.data.value);
  const newId = Math.floor(Math.random() * 70000000);
  ClickOutside(theRef, closeFrame);

  useEffect(() => {
    let firstStatus = reduxData[0].columns[0].name;
    dispatch(changeCID(reduxData[0]?.columns[0]._id));
    setTask((prev) => {
      return { ...prev, status: firstStatus };
    });
    setTaskId(localStorage.getItem("taskId"));
    setToken(localStorage.getItem("token"));
    // eslint-disable-next-line
  }, []);

  function closeFrame() {
    dispatch(showModal(false));
    dispatch(changeFrame(""));
  }

  const handleChange = (e) => {
    let { value, name } = e.target;
    setTask((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubChange = (e, id) => {
    let { value } = e.target;
    let newSub = task.subTasks.map((sub) => {
      return sub._id === id || sub.id === id ? { ...sub, title: value } : sub;
    });
    setTask((prev) => {
      return {
        ...prev,
        subTasks: newSub,
      };
    });
  };

  const addNewSubtask = () => {
    let newSubtasks = [...task.subTasks];
    setTask((prev) => {
      return {
        ...prev,
        subTasks: [
          ...newSubtasks,
          { title: "", isCompleted: false, id: newId },
        ],
      };
    });
  };

  const pullSubCols = (id) => {
    let newData = task.subTasks.filter((item) => (item._id || item.id) !== id);
    setTask((prev) => {
      return {
        ...prev,
        subTasks: newData,
      };
    });
  };

  const settings = (data) => {
    dispatch(changeData(data));
  };

  const createTask = async () => {
    if (
      task.title === "" ||
      task.status === "" ||
      task.subTasks.length === 0 ||
      task.subTasks.some((item) => !item.title)
    ) {
      return;
    }
    await add2Task(task, taskId, board._id, cid, token, settings);
    closeFrame();
  };

  return (
    <section
      ref={theRef}
      className="sm:w-[343px] rounded-lg bg-nav absolute top-[20%] z-[900] flex flex-col gap-6 md:w-[480px] py-[32px] px-[32px]"
    >
      <h2 className="text-lg text-texts">Add New Task</h2>
      {taskTitle(task, handleChange)}
      {taskDescription(task, handleChange)}
      <div role="presentation" className="flex flex-col gap-3">
        {theSubtasks(task.subTasks, handleSubChange, pullSubCols)}
        {iregButton("+Add New Subtask", addNewSubtask, "Add Subtask")}
      </div>
      <Status taskId={taskId} handleChange={handleChange} />
      {regButton("Create Task", createTask, "Create Task")}
    </section>
  );
}
