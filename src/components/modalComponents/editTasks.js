import { useEffect, useRef, useState } from "react";
import { regButton, iregButton } from "./buttons";
import { theSubtasks } from "./modalExports";
import { taskTitle } from "./modalExports";
import { taskDescription } from "./modalExports";
import { useSelector, useDispatch } from "react-redux";
import ClickOutside from "./clickOutside";
import { taskEdit } from "../API-Calls/editTask";
import Status from "./statusSelect.js/statusSelect";
import { showModal } from "../features/modalSlice";
import { changeFrame } from "../features/currentModal";
import { changedStatus } from "../features/statusSwitched";
import { changeCurrent } from "../features/currentTask";
import { changeData } from "../features/dataSlice";

export default function EditTask() {
  const [taskId, setTaskId] = useState("");
  const [token, setToken] = useState("");
  const theRef = useRef();
  const dispatch = useDispatch();
  ClickOutside(theRef, modalClose);
  const reduxTask = useSelector((state) => state.current.value);
  const newId = Math.floor(Math.random() * 70000000);
  let board = useSelector((state) => state.board.value);
  let cid = useSelector((state) => state.columnId.value);

  function modalClose() {
    dispatch(showModal(false));
    dispatch(changeFrame(""));
    dispatch(changedStatus({ changed: false, name: "" }));
  }

  useEffect(() => {
    setTaskId(localStorage.getItem("taskId"));
    setToken(localStorage.getItem("token"));
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    let { value, name } = e.target;
    dispatch(changeCurrent({ ...reduxTask, [name]: value }));
  };

  const addSubTask = () => {
    let newSubtask = [
      ...reduxTask?.subTasks,
      { title: "", isCompleted: false, id: newId },
    ];
    dispatch(changeCurrent({ ...reduxTask, subTasks: newSubtask }));
  };

  const pullSubCols = (id) => {
    let newData = reduxTask?.subTasks.filter(
      (item) => (item._id || item.id) !== id
    );
    dispatch(changeCurrent({ ...reduxTask, subTasks: newData }));
  };

  const handleSubChange = (e, id) => {
    let { value } = e.target;
    const newSubtask = reduxTask.subTasks?.map((sub) => {
      return (sub._id || sub.id) === id ? { ...sub, title: value } : sub;
    });
    dispatch(changeCurrent({ ...reduxTask, subTasks: newSubtask }));
  };

  const settings = (data) => {
    dispatch(changeData(data));
  };

  const saveTask = async () => {
    if (
      reduxTask.title === "" ||
      reduxTask.status === "" ||
      !reduxTask.subTasks.length ||
      reduxTask.subTasks.some((item) => !item.title)
    ) {
      return;
    } else {
      await taskEdit(
        reduxTask,
        taskId,
        board._id,
        cid,
        reduxTask._id,
        token,
        settings
      );
      modalClose();
    }
  };

  return (
    <section
      ref={theRef}
      className="sm:w-[343px] rounded-lg bg-nav absolute top-[15%] z-[900] flex flex-col gap-6 md:w-[480px] py-[32px] px-[32px]"
    >
      <h2 className="text-lg text-texts">Edit Task</h2>
      {taskTitle(reduxTask, handleChange)}
      {taskDescription(reduxTask, handleChange)}
      <div role="presentation" className="flex flex-col gap-3">
        {theSubtasks(reduxTask.subTasks, handleSubChange, pullSubCols)}
        {iregButton("+Add New Subtask", addSubTask, "Add-Subtask")}
      </div>
      <Status taskId={taskId} handleChange={handleChange} />
      {regButton("Save Task", saveTask, "Save-Task")}
    </section>
  );
}
