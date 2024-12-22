import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../taskExports";
import TaskCard from "../taskCard";
import { countComplete } from "../taskExports";
import { showModal } from "../../features/modalSlice";
import { changeCurrent } from "../../features/currentTask";
import { changeFrame } from "../../features/currentModal";

export default function StatusRender({ status, oval }) {
  const [statusData, setStatusData] = useState([]);
  const reduxData = useSelector((state) => state.data.value);
  const dispatch = useDispatch();
  let theDoings = getTasks(status, reduxData);

  const cardEvent = (data) => {
    dispatch(showModal(true));
    dispatch(changeFrame("viewTask"));
    dispatch(changeCurrent(data));
  };

  useEffect(() => {
    setStatusData(theDoings);
    // eslint-disable-next-line
  }, [reduxData]);

  const render = statusData?.map((item, index) => {
    return (
      <div
        className="relative"
        autoFocus={
          Number(index + 1) - Number(statusData.length) === 0 ? true : false
        }
      >
        <TaskCard
          event={() => cardEvent(item)}
          key={index}
          text={item.title}
          subText={countComplete(item.subTasks)}
        />
      </div>
    );
  });

  return (
    <article className="flex flex-col flex-shrink-0 gap-[24px]">
      <h2 className="flex w-[280px] text-[#828FA3] items-center gap-[12px]">
        {oval} {status} ({statusData.length})
      </h2>
      <div role="presentation" className="flex gap-[20px] flex-col">
        {render}
      </div>
    </article>
  );
}
