import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../features/modalSlice";
import { changeCurrent } from "../../features/currentTask";
import { changeFrame } from "../../features/currentModal";
import TaskCard from "../taskCard";
import { useEffect, useState } from "react";
import { countComplete } from "../taskExports";
import { doneOval, todoOval, doingOval } from "../../SVGs";

export default function ColumnsDisplay() {
  const [displayData, setDisplayData] = useState([]);
  const reduxData = useSelector((state) => state.data.value);
  const dispatch = useDispatch();

  const cardEvent = (data) => {
    dispatch(showModal(true));
    dispatch(changeFrame("viewTask"));
    dispatch(changeCurrent(data));
  };

  const selectOval = (task) => {
    if (
      task.subTasks.some((sub) => sub.isCompleted) &&
      task.subTasks.some((item) => !item.isCompleted)
    ) {
      return doingOval;
    }
    if (!task.subTasks.some((sub) => !sub.isCompleted)) {
      return doneOval;
    }
    if (!task.subTasks.some((sub) => sub.isCompleted)) {
      return todoOval;
    }
  };

  useEffect(() => {
    setDisplayData(reduxData[0]?.columns);
  }, [reduxData]);

  let render = displayData?.map((col, index) => {
    return (
      <article
        key={index + 1}
        className="flex flex-col flex-shrink-0 gap-[24px]"
      >
        <h2 className="flex w-[280px] text-[#828FA3] items-center gap-[12px]">
          {col.name} ({col.tasks.length})
        </h2>
        <div role="presentation" className="flex gap-[20px] flex-col">
          {col.tasks.map((task, index) => {
            return (
              <div
                role="presentation"
                key={index * 2}
                autoFocus={
                  Number(index + 1) - Number(col.tasks.length) === 0
                    ? true
                    : false
                }
                className="relative"
              >
                <span className="absolute left-[2px] top-[2px]">
                  {selectOval(task)}
                </span>
                <TaskCard
                  text={task.title}
                  key={index}
                  event={() => cardEvent(task)}
                  subText={countComplete(task.subTasks)}
                />
              </div>
            );
          })}
        </div>
      </article>
    );
  });

  return render;
}
