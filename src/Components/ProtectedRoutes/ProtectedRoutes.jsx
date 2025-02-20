import { Navigate } from "react-router-dom"

function ProtectedRoutes({children}) {

    if(localStorage.getItem('userData')){return children};
    return <Navigate to='/login' replace />
    
    
}

export default ProtectedRoutes
