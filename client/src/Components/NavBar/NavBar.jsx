import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";
import { Link } from "react-router-dom";

const NavBar = ({ onSearch }) => {
    return(
        <nav className={style.nav} >
            <div className={style.btns}>
                <Link to='/dog' className={style.home} >Home</Link>
                <Link to='/form' className={style.home} >Dog Form</Link>
            </div>

            <SearchBar onSearch={onSearch} />
        </nav>
    )
}

export default NavBar;