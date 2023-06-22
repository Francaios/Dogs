import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getDogs, getTemperaments } from "../../redux/actions";
import { useDispatch } from "react-redux";
import style from './Landing.module.css'

const Landing = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDogs())
        dispatch(getTemperaments())
    },[dispatch])

    return(
        <div className={style.container}>
            <h1> Welcome to Dogs PI</h1>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsoQlinx7-2J0DLUrRs1MH5LIkKBJVxVJOJg&usqp=CAU' alt=''/>
            <button className={style.btn}>
                <Link to='/dog' >Here we go again</Link>
            </button>
        </div>
    )
}


export default Landing;