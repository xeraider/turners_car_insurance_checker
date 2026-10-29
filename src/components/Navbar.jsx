import "../styles/Navibar.css";
import logo from "../assets/turnerscars_logo.png";

const Navbar = () => {

    return (
        <div className="navbar">

            <div className="navbar-brand">
                <img className="navbar-logo" href="" src={logo} />
            </div>

            <div className="navbar-menu"></div>

        </div>
    )
}
export default Navbar
