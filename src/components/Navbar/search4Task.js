import { changeFrame } from "../features/currentModal";
import { showModal } from "../features/modalSlice";
import { changeCurrent } from "../features/currentTask";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchFrame } from "./searchExport";
import ClickOutside from "../modalComponents/clickOutside";

export default function SearchBar() {
  const [searchParam, setSearchParam] = useState("");
  const [autocomplete, setAutoComplete] = useState([]);
  const data = useSelector((state) => state.data.value);
  const dispatch = useDispatch();
  const theRef = useRef();
  ClickOutside(theRef, closeSearch);

  function closeSearch() {
    dispatch(showModal(false));
    dispatch(changeFrame(""));
  }

  const handleChange = (e) => {
    let { value } = e.target;
    setSearchParam(value);
  };

  useEffect(() => {
    let found = [];
    data[0]?.columns.map((item) => {
      return item.tasks.map((task) => {
        return task.title.toLowerCase().includes(searchParam.toLowerCase()) &&
          searchParam.length > 2
          ? found.push(task.title)
          : "";
      });
    });

    if (found.length > 0) {
      setAutoComplete(found);
    } else {
      setAutoComplete(["No task found"]);
    }
  }, [searchParam, data]);

  const handleSubmit = async (title) => {
    await data[0]?.columns.map((item) => {
      return item.tasks.map((task) => {
        return task.title === title ? dispatch(changeCurrent(task)) : "";
      });
    });
    dispatch(changeFrame("viewTask"));
    dispatch(showModal(true));
  };

  let autoCompletFrame = (
    <div
      role="presentation" className="bg-nav px-3 relative rounded-lg flex flex-col min-h-20 w-[300px] py-3">
      {autocomplete.map((title, index) => {
        return title === "No task found" ? (
          <p key={index+3}>{title}</p>
        ) : (
          <p onClick={() => handleSubmit(title)} key={index + 1} className="text-texts hover:text-[#635FC7] cursor-pointer">
            {title}
          </p>
        );
      })}
    </div>
  );

  let searchRender = (
    <div role="presentation" className="flex relative flex-col gap-4">
      {searchFrame(handleChange, searchParam)}
      {searchParam && autoCompletFrame}
    </div>
  );

  return (
    <div
      ref={theRef}
      role="presentation"
      className="absolute top-[25%] z-[200455555]"
    >
      {searchRender}
    </div>
  );
}
