import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Cards from "../Cards/Cards";
import { getDogs } from "../../redux/actions";


function Home (search){
    const dispatch= useDispatch()

    let apiData = useSelector((state) => state.allDogsShown);

    useEffect(() => {
         dispatch(getDogs())
        },[dispatch])

    return (
        <div>{
        apiData.length ?
        <Cards data={apiData} search={search}/>
        : ""
        }
    </div>
    )
}

export default Home