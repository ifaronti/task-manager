import NavBar from "./components/Navbar/nav";
import SideBar from "./components/Navbar/sideBar";
import { changeData } from "./components/features/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import GlobalModal from "./components/modal";
import GlobalModalFrames from "./components/modalComponents/globalModalFrames";
import Columns from "./components/tasks/columns";
import { getCurrentBoard } from "./components/API-Calls/getCurrentBoard";
import SwitchDisplay from "./components/tasks/switchDisplay";

export default function TaskManager() {
  const [token, setToken] = useState("");
  const [taskId, setTaskId] = useState("");
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modal.value);
  const board = useSelector((state) => state.board.value);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setTaskId(localStorage.getItem("taskId"));
  }, []);

  const settings = (data) => {
    dispatch(changeData(data.boards));
  };

  useEffect(() => {
    if (!taskId || taskId === null || taskId === undefined) {
      return;
    }
    getCurrentBoard(board._id, settings, taskId, token);

    const abortController = new AbortController()

    return abortController.abort()
    // eslint-disable-next-line
  }, [board]);

  return (
    <main
      id="scrollbar"
      className={`xl:w-[1440px] scroll-smooth overflow-y-scroll h-screen md:w-full mx-auto sm:w-full relative bg-tasks`}
    >
      {showModal && <GlobalModal />}
      {showModal && <GlobalModalFrames />}
      <nav
        className={"h-fit relative flex sm:landscape:hidden md:landscape:flex"}
      >
        <NavBar />
      </nav>
      <div className="sm:landscape:hidden md:landscape:flex">
        <SwitchDisplay />
      </div>
      <div id="scrollbar" className="flex w-full sm:landscape:hidden md:landscape:flex h-screen overflow-y-scroll">
        <SideBar />
        <div
          id="scrollbar"
          className="relative w-full top-[121px] overflow-x-auto overflow-y-scroll"
        >
          <Columns />
        </div>
      </div>
      <h1 className="sm:landscape:block px-6 absolute sm:portrait:hidden md:portrait:hidden top-[50vh] md:landscape:hidden text-center text-texts">
        Mobile Devices do not make good landscape view for this app
      </h1>
    </main>
  );
}
