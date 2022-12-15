import { RetailOwnerViews } from "./RetailOwnerViews"
import { VendorViews } from "./VendorViews"



export const ApplicationViews = () => {
        const localMarketUser = localStorage.getItem("market_user")
        const localUser = JSON.parse(localMarketUser)

        if (localUser.vendor) {
            return <>
                <VendorViews />
            </>
        } 
        else {
            return <>
                <RetailOwnerViews />
            </>
        }
    }



