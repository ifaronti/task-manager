import { ellipsis } from "../SVGs";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../features/modalSlice";
import { addTaskSVG } from "../SVGs";
import { changeFrame } from "../features/currentModal";
import { changeCurrent } from "../features/currentTask";

export default function RightNavButtons({ showMini, notMini }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.value);

  const createTask = () => {
    dispatch(showModal(true));
    dispatch(changeFrame("addTask"));
    dispatch(changeCurrent({}))
    notMini();
  };

  return (
    <div role="presentation" className="flex items-center sm:gap-[34px] md:gap-[24px]">
      <button
        aria-label="add-Task"
        onClick={createTask}
        disabled={!data[0]?.columns?.length ? true : false}
        className={`text-[white] hover:bg-[#A8A4FF] text-[.9375rem] sm:w-[48px] ${
          !data[0]?.columns?.length ? "bg-[#A8A4FF]" : "bg-[#635FC7]"
        } sm:h-[32px] md:w-[164px] md:h-[48px] sm:rounded-full md:rounded-3xl`}
      >
        <span className="sm:hidden md:block">+ Add New Task</span>
        <span className="sm:block w-fit mx-auto md:hidden">{addTaskSVG}</span>
      </button>
      <button aria-label="show-menu" onClick={() => showMini()}>
        {ellipsis}
      </button>
    </div>
  );
}
