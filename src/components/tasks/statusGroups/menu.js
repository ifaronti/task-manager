import { useSelector, useDispatch } from "react-redux"
import { changeFrame } from "../../features/currentModal"
import { showModal } from "../../features/modalSlice"
import ClickOutside from "../../modalComponents/clickOutside"
import { useRef } from "react"
import { useNavigate } from "react-router"
import { searchIcon } from "../../SVGs"

export default function CRUDMenu({closeMenu}){
    let frame = useSelector(state=> state.frame.value)
    const data = useSelector(state => state.data.value)
    let dispatch = useDispatch()
    let theRef = useRef()
    ClickOutside(theRef, closeMenu)
    const navTo = useNavigate()

    const searchBar = ()=>{
        dispatch(showModal(true))
        dispatch(changeFrame('searchTask'))
    }
    const searchBtn = <button aria-label="search" onClick={searchBar} className="absolute left-[65%]">{searchIcon}</button>

    let editText = frame === '' ? 'Edit Board':'Edit Task'
    let deleteText = frame === ''? 'Delete Board':'Delete Task'

    const editLoad = ()=>{
        if(frame === ''){
            dispatch(showModal(true))
            dispatch(changeFrame('editBoard'))
            closeMenu()
        }
        else{
            dispatch(changeFrame('editTask'))
            closeMenu()
        }
    }

    const deleteLoad = ()=>{
        if(frame===''){
            dispatch(showModal(true))
            dispatch(changeFrame('deleteBoard'))
            closeMenu()
        }
        else{
            if(frame === 'viewTask'){
                dispatch(changeFrame('deleteTask'))
                closeMenu()

            }
        }
    }

    const goTo = async()=>{
        localStorage.clear()
        navTo('/', {replace:true})
        window.location.reload()
    }

    const editBtn = <button disabled={!data[0]? true:false} aria-label="Edit" className="text-[#828fa3] hover:text-[red] cursor-pointer w-full text-left text-[.8125rem]" onClick={editLoad}>{editText}</button>
    const deleteBtn = <button disabled={!data[0]? true:false} aria-label="Delete" className="text-[#ea5555] hover:text-[red] cursor-pointer w-full text-left text-[.8125rem]" onClick={deleteLoad}>{deleteText}</button>

 return( 
        <div role="presentation" ref={theRef} className="px-4 z-[500] relative flex-shrink-0 rounded-lg w-48 gap-4 shadow-2xl bg-nav flex flex-col pb-4 py-4">
            {editBtn}
            {deleteBtn}
            <button aria-label="log out" onClick={goTo} className="text-left hover:text-[red] text-[.8125rem] pb-1">Log Out</button>
            {searchBtn}
        </div>
    )
 
}