import { useEffect } from "react"

function Scroll() {

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    
}

export default Scroll
