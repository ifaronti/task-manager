import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../features/modalSlice";
import { changeFrame } from "../features/currentModal";

export default function NoColumns() {
  const dispatch = useDispatch();
  let data = useSelector((state) => state.data.value);

  const addColumns = () => {
    dispatch(showModal(true));
    dispatch(changeFrame("editBoard"));
    return;
  };

  let text = !data[0]?.name
    ? `Click Create New Board from 
                            the sidebar to get started or click on
                            a board name if one is above the +Create
                            New Board button`
    : "This board is empty. Create a new column to get started";

  return (
    <div
      role="presentation"
      className="w-full relative sm:gap-6 xl:gap-8 flex flex-col min-h-screen items-center justify-center"
    >
      <p className="text-[#828FA3] sm:px-4 md:px-[unset] sm:text-center text-lg">
        {text}
      </p>
      <button
        aria-label="Add-Column"
        disabled={!data[0] ? true : false}
        onClick={addColumns}
        className="bg-[#635fc7] hover:bg-[#A8A4FF] text-[.9375rem] rounded-3xl w-[174px] h-12 text-[white]"
      >
        + Add New Column
      </button>
    </div>
  );
}
