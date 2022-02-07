import { Link } from "react-router-dom";

function Nav() {
    return (
        <div id="navDiv">
            <nav>
                <Link to="/">Finance</Link>  
                {" "}
                <Link to="/Saving">Saving</Link>
            </nav>
        </div>
    );
}

export default Nav;