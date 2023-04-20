import { useLocation, useNavigate } from "react-router-dom"
import ProblemDetail from "./ProblemDetail";
import ClientDetailob from "components/problem/ClientDetailob";
import ClientDetailsb from "components/problem/ClientDetailsb";

const ProblemSolved = () => {
    const location = useLocation();
    
    const navigate = useNavigate();
    return (
        <>
        {location.state.type === "answer" ? <ClientDetailsb/> : <ClientDetailob/>}
        </>
    )
}

export default ProblemSolved;