import { useEffect} from "react";

export default function ClickOutside(ref, handler){
  useEffect(()=>{
    function checkAreaClicked(event){
        if(ref.current.contains(event.target)){
            return
        }
        handler(event)
    }
    document.addEventListener('touchstart', checkAreaClicked)
    document.addEventListener('mousedown', checkAreaClicked)

    return ()=>{
        document.removeEventListener('touchstart', checkAreaClicked)
        document.removeEventListener('mousedown', checkAreaClicked)
    }
  }, [ref, handler])
}