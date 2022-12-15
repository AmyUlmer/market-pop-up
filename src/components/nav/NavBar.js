import { RetailOwnerNav } from "./RetailOwnerNav"
import { VendorNav } from "./VendorNav"
import "./NavBar.css"

import { Link, useNavigate } from "react-router-dom"

export const NavBar = () => {
        const localMarketUser = localStorage.getItem("market_user")
        const localUser = JSON.parse(localMarketUser) //localUser is a property of honeyUserObject
        
        // if localUser is not logged-in
        if (localUser.vendor) {
            return <>
                <VendorNav />
            </>
        } 
        else {
            return <>
                <RetailOwnerNav />
            </>
        }
    }





