import { useSelector } from "react-redux";
import NoColumns from "./noColumns";
import NewColumn from "./addColumn";
import StatusRender from "./statusGroups/statusGroup";
import { doingOval, todoOval, doneOval } from "../SVGs";
import ColumnsDisplay from "./colNameGroups.js/columnDisplay";

export default function Columns() {
  const data = useSelector((state) => state.data.value);
  const display = useSelector((state) => state.display.value);

  return !data[0]?.columns?.length ? (
    <NoColumns />
  ) : (
    <section className="w-full flex gap-[24px] px-[24px] py-[24px]">
      {display === "progress" && (
        <>
          <StatusRender oval={todoOval} status={"Todo"} />
          <StatusRender oval={doingOval} status={"Doing"} />
          <StatusRender oval={doneOval} status={"Done"} />
        </>
      )}
      {display === "status" && (
        <>
          <ColumnsDisplay />
          <NewColumn />
        </>
      )}
    </section>
  );
}
