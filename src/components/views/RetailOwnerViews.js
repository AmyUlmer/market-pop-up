import { Outlet, Route, Routes } from "react-router-dom"
import { EventEditForm } from "../events/EventEditForm"
import { EventForm } from "../events/EventForm"
import { EventList } from "../events/EventList"
import { VendorList } from "../vendors/VendorList"
    
    export const RetailOwnerViews = () => {
        return (
            <Routes>
                <Route path="/" element={
                    <>
                        <h1 className="center">Market Pop-Up</h1>
    
                        <Outlet />
                    </>
                }>
                    
                    <Route path="/vendor/list" element={ <VendorList/>} />
                    <Route path="/event/create" element={ <EventForm/>} />
                    <Route path="/events" element={ <EventList/>} />
                    <Route path="/events/edit/:eventId" element={ <EventEditForm/>} />
                    <Route path="/events/edit/:retailOwnerId" element={ <EventEditForm/>} />
                </Route>
            </Routes>
        )
    }