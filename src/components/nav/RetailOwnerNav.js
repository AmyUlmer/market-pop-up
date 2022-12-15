import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const RetailOwnerNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/vendor/list">Vendor List</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/events">Event List</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/event/create">Event Form</Link>
            </li>

            {   // below is where building the logout.
                localStorage.getItem("market_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("market_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}