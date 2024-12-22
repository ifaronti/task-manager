import { useEffect, useRef, useState } from "react";
import { regButton } from "./buttons";
import { iregButton } from "./buttons";
import { BoardName } from "./modalExports";
import { theColumns } from "./modalExports";
import { useDispatch, useSelector } from "react-redux";
import ClickOutside from "./clickOutside";
import { patchBoard } from "../API-Calls/editBoard";
import { showModal } from "../features/modalSlice";
import { changeFrame } from "../features/currentModal";
import { changeBoardsInfo } from "../features/boardsInfo";
import { changeData } from "../features/dataSlice";
import { changeBoard } from "../features/boardSlice";

export default function EditBoard() {
  const [board, setBoard] = useState({ name: "", columns: [], _id: "" });
  const [taskId, setTaskId] = useState("");
  const [token, setToken] = useState("");
  let data = useSelector((state) => state.data.value);

  const theRef = useRef();
  let dispatch = useDispatch();
  ClickOutside(theRef, closeModal);
  const newId = Math.floor(Math.random() * 70000000);

  const handleChange = (e) => {
    let { value, name } = e.target;
    setBoard((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  function closeModal() {
    dispatch(showModal(false));
    dispatch(changeFrame(""));
  }

  useEffect(() => {
    setBoard({
      name: data[0]?.name,
      columns: data[0]?.columns,
      _id: data[0]?._id,
    });
    setTaskId(localStorage.getItem("taskId"));
    setToken(localStorage.getItem("token"));
    // eslint-disable-next-line
  }, []);

  const handleColumnChange = (e, id) => {
    let { value } = e.target;
    let newCols = board.columns.map((col) => {
      return col._id === id || col.id === id ? { ...col, name: value } : col;
    });
    setBoard((prev) => {
      return {
        ...prev,
        columns: newCols,
      };
    });
  };

  const AddColumns = () => {
    let newColumns = [...board?.columns, { name: "", tasks: [], id: newId }];
    setBoard((prev) => {
      return {
        ...prev,
        columns: newColumns,
      };
    });
  };

  const pullSubCols = (id) => {
    let newData = board.columns.filter((item) => (item._id || item.id) !== id);
    setBoard((prev) => {
      return {
        ...prev,
        columns: newData,
      };
    });
  };

  const settings = (data, theData) => {
    dispatch(changeBoardsInfo(data));
    dispatch(changeData(theData));
    dispatch(changeBoard(theData[0]));
  };

  const saveBoardchanges = async () => {
    if (
      board.columns?.some((col) => col.name === "") ||
      board.name === "" ||
      !board._id ||
      !board.columns.length ||
      board.columns.some((item) => !item.name)
    ) {
      return;
    } else {
      await patchBoard(board, taskId, board._id, token, settings);
      closeModal();
    }
  };

  return (
    <section
      ref={theRef}
      className="sm:w-[343px] top-[20%] rounded-lg bg-nav absolute z-[900] flex flex-col gap-6 md:w-[480px] py-[32px] px-[32px]"
    >
      <h2 className="text-lg text-texts">Edit Board</h2>
      {BoardName(board, handleChange)}
      <div role="presentation" className="flex flex-col gap-3">
        {theColumns(board.columns, handleColumnChange, pullSubCols)}
        {iregButton("+Add New Column", AddColumns, "Add-Column")}
      </div>
      {regButton("Save Changes", saveBoardchanges, "Save-Changes")}
    </section>
  );
}
