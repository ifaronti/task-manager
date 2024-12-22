import { useState, useRef, useEffect } from "react";
import { regButton } from "./buttons";
import { iregButton } from "./buttons";
import { BoardName, theColumns } from "./modalExports";
import ClickOutside from "./clickOutside";
import { putBoard } from "../API-Calls/createBoard";
import { useDispatch } from "react-redux";
import { showModal } from "../features/modalSlice";
import { changeFrame } from "../features/currentModal";
import { changeBoardsInfo } from "../features/boardsInfo";
import { changeBoard } from "../features/boardSlice";
import { changeData } from "../features/dataSlice";

export default function AddBoard() {
  const [board, setBoard] = useState({
    name: "",
    columns: [
      { name: "Todo", tasks: [], id: 4 },
      { name: "Doing", tasks: [], id: 5 },
    ],
  });
  const [taskId, setTaskId] = useState("");
  const [token, setToken] = useState("");
  const theRef = useRef();
  const dispatch = useDispatch();
  const newId = Math.floor(Math.random() * 70000000);

  const closeModal = () => {
    dispatch(showModal(false));
    dispatch(changeFrame(""));
    window.scrollTo(
      window.scrollTo({
        top: 100,
        left: 100,
        behavior: "smooth",
      })
    );
  };
  ClickOutside(theRef, closeModal);

  useEffect(() => {
    if (localStorage.getItem("taskId")) {
      setTaskId(localStorage.getItem("taskId"));
    }
    setToken(localStorage.getItem("token"));
  }, []);

  const handleChange = (e) => {
    let { value } = e.target;
    setBoard((prev) => {
      return {
        ...prev,
        name: value,
      };
    });
  };

  const handleColumnChange = (e, id) => {
    let { value } = e.target;
    let newCols = board.columns.map((col) => {
      return col.id === id ? { ...col, name: value } : col;
    });
    setBoard((prev) => {
      return {
        ...prev,
        columns: newCols,
      };
    });
  };

  const AddColumns = () => {
    let newColumns = [...board.columns, { name: "", tasks: [], id: newId }];
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

  const settings = (data) => {
    dispatch(changeBoardsInfo(data.boards));
  };

  const settings2 = (data) => {
    dispatch(changeBoardsInfo(data.boards));
    dispatch(changeData(data.boards));
    dispatch(
      changeBoard({ name: data.boards[0].name, _id: data.boards[0]._id })
    );
  };

  const createBoard = async () => {
    if (
      board.name === "" ||
      !board.columns.length ||
      board.columns.some((item) => !item.name)
    ) {
      return;
    } else {
      await putBoard(board, taskId, settings, settings2, token);
      closeModal();
    }
  };

  return (
    <section
      ref={theRef}
      className="sm:w-[343px] rounded-lg bg-nav absolute top-[10%] z-[900] flex flex-col gap-6 md:w-[480px] py-[32px] px-[32px]"
    >
      <h2 className="text-lg text-texts">Add New Board</h2>
      {BoardName(board.columns, handleChange)}
      <div role="presentation" className="flex flex-col gap-3">
        {theColumns(board.columns, handleColumnChange, pullSubCols)}
        {iregButton("+Add New Column", AddColumns, "Add Columns")}
      </div>
      {regButton("Create New Board", createBoard, "Create Board")}
    </section>
  );
}
