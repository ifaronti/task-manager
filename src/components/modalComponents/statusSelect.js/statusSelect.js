import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { statusUpdate } from "../../API-Calls/statusUpdate";
import { changeCID } from "../../features/columnId";
import { changeData } from "../../features/dataSlice";

export default function Status({ taskId }) {
  const [token, setToken] = useState("");
  let dispatch = useDispatch();
  let reduxData = useSelector((state) => state.data.value);
  let reduxTask = useSelector((state) => state.current.value);
  const CID = useSelector((state) => state.columnId.value);
  const board = useSelector((state) => state.board.value);
  const frame = useSelector((state) => state.frame.value);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const settings = (data) => {
    dispatch(changeData(data));
  };

  let columns = reduxData[0]?.columns.map((col, index) => (
    <option key={index} className="text-texts" value={col.name}>{col.name}</option>
  ));
  
  const changeStatus = async (e) => {
    const { value } = e.target
    let putIn = reduxData[0].columns.filter(item => item.name === value)[0]._id
    
    if (frame === "addTask") {
      return dispatch(changeCID(putIn))
    }
    await statusUpdate(taskId, reduxTask, board._id, reduxTask._id, CID, putIn, token, settings);
    dispatch(changeCID(putIn))
  }

  return (
    <select
      name="status"
      onChange={changeStatus}
      defaultValue={reduxTask?.status}
      className="md:w-[416px] sm:w-[295px] hover:border-[#635FC7] bg-nav rounded border border-[#828fa3]/25 px-[12px] text-texts h-10"
    >
      {columns}
    </select>
  );
}
