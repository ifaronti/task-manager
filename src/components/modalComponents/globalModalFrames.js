import {useSelector} from "react-redux"
import AddBoard from './addNewBoard'
import EditBoard from './editBoard'
import DeleteThings from "./deleteModal"
import ViewTask from "./viewTasks"
import EditTask from "./editTasks"
import AddTask from "./addTask"
import SearchBar from "../Navbar/search4Task"

export default function GlobalModalFrames(){
    let frame = useSelector(state=>state.frame.value)

    return(
        <div role='presentation' className="w-full h-full z-[10000] flex items-center justify-center">
            {frame === 'addBoard' && <AddBoard/>}
            {frame === 'editBoard' && <EditBoard/>}
            {frame === 'viewTask' && <ViewTask/>}
            {frame === 'editTask' && <EditTask/>}
            {frame === 'addTask' && <AddTask/>}
            {frame === 'deleteBoard' && <DeleteThings/>}
            {frame === 'deleteTask' && <DeleteThings/>}
            {frame === 'searchTask' && <SearchBar/>}
        </div>
    )
}