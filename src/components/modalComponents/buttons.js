
export const regButton = (text, event, name)=>{
    return <button 
                onClick={event} 
                aria-label={name}
                className="h-10 text-[white] text-[.8125rem] hover:bg-[#a8a4ff] bg-[#635fc7] w-full rounded-3xl"
            >
                {text}
            </button>
}

export const iregButton = (text, event, name)=>{
    return <button 
                onClick={event} 
                aria-label={name}
                className="h-10 text-[#635fc7] text-[.8125rem] hover:bg-[#635FC7]/25 bg-buttons w-full rounded-3xl"
            >
                {text}
            </button>
}