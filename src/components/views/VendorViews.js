import { Outlet, Route, Routes } from "react-router-dom"
import { EventList } from "../events/EventList"
import { VendorEditForm } from "../vendors/VendorEditForm"
import { VendorForm } from "../vendors/VendorForm"
import { VendorList } from "../vendors/VendorList"

export const VendorViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1 className="center">Market Pop-Up</h1>

                    <Outlet />
                </>
            }>
                
                <Route path="/events" element={ <EventList/>} />
                <Route path="/vendor/create" element={ <VendorForm/>} />

                </Route>
            </Routes>
        )
    }