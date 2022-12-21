
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

//2 useStates drom 2 seperate tables:
    //one for retailOwner info
    //one for event info
export const EventForm = () => {
    const [retailOwners, updateRetailOwners] = useState({
        //add property for each one of the form fields w/ default value
        retailName: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        userId: 0
    })

    // already have [events,setEvents] in EventList
    const [events, updateEvents] = useState({
        name: "",
        startTime: "",
        endTime: "",
        vendorLocation: "", 
        date: "",
        img:"",
        userId: 0,
        retailOwnerId:0
    })

    const localMarketUser = localStorage.getItem("market_user")
    const localUser = JSON.parse(localMarketUser)

// use navigate to direct back to eventList
const navigate = useNavigate () 

useEffect(
    () => {
        fetch (`http://localhost:8088/events`)
            .then(response => response.json())
            .then((eventArray) => { //parameter to capture data after json processing is done
                updateEvents(eventArray)
            })
    },
    []
)

useEffect(
    () => {
        fetch (`http://localhost:8088/retailOwners`)
            .then(response => response.json())
            .then((retailOwnersArray) => { //parameter to capture data after json processing is done
                updateRetailOwners(retailOwnersArray)
            })
    },
    []
)


    const handleSubmitClick = (event) => {
        event.preventDefault()

    // TODO: Create the object to be saved to the API
    
    const eventInfoToSendToAPI = {
        name: events.name,
        startTime: events.startTime,
        endTime: events.endTime,
        date: events.date,
        vendorLocation: events.vendorLocation,
        img: "", 
        userId: localUser.id
        // retailOwnerId: events.retailOwnerId
    }

    const ownerInfoToSendToAPI = {
        retailName: retailOwners.retailName,
        streetAddress: retailOwners.streetAddress,
        city: retailOwners.city,
        state: retailOwners.state,
        zipCode: retailOwners.zipCode,
        userId: localUser.id
    }
    // TODO: Perform the fetch() to POST the object to the API

     fetch(`http://localhost:8088/retailOwners`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ownerInfoToSendToAPI)
    })
        .then(response => response.json())
        .then ((createdRetailOwner) => {
            if (createdRetailOwner.hasOwnProperty("id")){
            fetch(`http://localhost:8088/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({retailOwnerId: createdRetailOwner.id})
    })
    .then(response => response.json())
    .then ((createdEvent) => {
        if (createdEvent.hasOwnProperty("id")) {
            fetch (`http://localhost:8088/events/${createdEvent.id}`, {
                method: "PATCH",
                headers: {
                     "Content-Type": "application/json"
        },
        body: JSON.stringify(eventInfoToSendToAPI)
    })
            .then(response => response.json())
        .then(() => {
            navigate("/events")
        })
    } })}})}
    


    return (
        <main style={{ textAlign: "left" }}>
            <form className="eventForm"> 
                <h1 className="h3 mb-3 font-weight-normal">Event Form </h1>
                <fieldset>
                <div className="form-group">
                    <label htmlFor="retailName"> Retail Name </label>
                    <input type="text" id="retailName" className="form-control"
                        placeholder="Retail name" required autoFocus 
                        value={retailOwners.name}
                        onChange={
                            (evt) => {
                                const copy = {...retailOwners}
                                copy.retailName = evt.target.value
                                updateRetailOwners(copy)
                            }
                        } />
                    </div>
                </fieldset>
                <fieldset>
                <div className="form-group">
                    <label htmlFor="streetAddress"> Street Address </label>
                    <input type="sreetAddress" id="streetAddress" className="form-control"
                        placeholder="Street Address" required 
                        value={retailOwners.streetAddress}
                        onChange={
                            (evt) => {
                                const copy = {...retailOwners}
                                copy.streetAddress = evt.target.value
                                updateRetailOwners(copy)
                            }
                        } />
                        </div>
                </fieldset>
                <fieldset>
                <div className="form-group">
                    <label htmlFor="city"> City </label>
                    <input type="city" id="city" className="form-control"
                        placeholder="City" required 
                        value={retailOwners.city}
                        onChange={
                            (evt) => {
                                const copy = {...retailOwners}
                                copy.city = evt.target.value
                                updateRetailOwners(copy)
                            }
                        } />
                        </div>
                </fieldset>
                <fieldset>
                <div className="form-group">
                    <label htmlFor="state"> State </label>
                    <input type="state" id="state" className="form-control"
                        placeholder="State" required 
                        value={retailOwners.state}
                        onChange={
                            (evt) => {
                                const copy = {...retailOwners}
                                copy.state = evt.target.value
                                updateRetailOwners(copy)
                            }
                        } />
                        </div>
                </fieldset>
                <fieldset>
                <div className="form-group">
                    <label htmlFor="zipCode"> Zip Code </label>
                    <input type="zipCode" id="zipCode" className="form-control"
                        placeholder="Zip Code" required 
                        value={retailOwners.zipCode}
                        onChange={
                            (evt) => {
                                const copy = {...retailOwners}
                                copy.city = evt.target.value
                                updateRetailOwners(copy)
                            }
                        } />
                        </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name"> Event Name </label>
                        <input type="text" id="name" className="form-control"
                        placeholder="Event Name" required 
                        value={events.name}
                        onChange={
                            (evt) => {
                                const copy = {...events}
                                copy.name = evt.target.value
                                updateEvents(copy)
                            }
                        } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="date"> date </label>
                        <input type="text" id="date" className="form-control"
                        placeholder="date" required 
                        value={events.date}
                        onChange={
                            (evt) => {
                                const copy = {...events}
                                copy.date = evt.target.value
                                updateEvents(copy)
                            }
                        } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="startTime"> startTime </label>
                        <input type="text" id="startTime" className="form-control"
                        placeholder="start time" required 
                        value={events.startTime}
                        onChange={
                            (evt) => {
                                const copy = {...events}
                                copy.startTime = evt.target.value
                                updateEvents(copy)
                            }
                        } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="endTime"> endTime</label>
                        <input type="text" id="endTime" className="form-control"
                        placeholder="end time" required 
                        value={events.endTime}
                        onChange={
                            (evt) => {
                                const copy = {...events}
                                copy.endTime = evt.target.value
                                updateEvents(copy)
                            }
                        } />
                    </div>
                </fieldset>
                <fieldset>
                    <label htmlFor="vendorLocation"> Vendor Location </label><br></br>
                    <select onChange={
                            (evt) => {
                                const copy = {...events}
                                copy.vendorLocation = evt.target.value
                                updateEvents(copy)
                            }
                            } >
                        <option value={0} type="select" id="location" className="form-control" required>Vendor Location</option>
                        <option value={"Indoors"} type="select" id="location" className="form-control" required>Indoors</option>
                        <option value={"Outdoors"} type="select" id="location" className="form-control" required>Outdoors</option>
                    </select>
                    </fieldset>
                    <fieldset>
                    <div className="form-group">
                        <label htmlFor="image"> Upload Image </label>
                        <input type="img" id="image" className="form-control"
                        placeholder="Upload Image" required 
                        value={events.img}
                        onChange={
                            (evt) => {
                                const copy = {...events}
                                copy.img = evt.target.value
                                updateEvents(copy)
                            }
                        } />
                    </div>
                </fieldset>
                <fieldset>
                    <button type="submit"
                    onClick={(clickEvent) => handleSubmitClick(clickEvent)}
                    className="btn btn-primary">Submit </button>
                </fieldset>
            </form>
        </main>
    )
}