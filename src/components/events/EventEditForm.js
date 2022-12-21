// edit components in EventList

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EventEditForm = () => {
    const localMarketUser = localStorage.getItem("market_user")
    const localUser = JSON.parse(localMarketUser)

    const [event, setEditEvent] = useState({
        name: "",
        startTime: "",
        endTime: "",
        vendorLocation: "", 
        date: "",
        img:"",
        userId: localUser.id,
        retailOwnerId: 0
    })

    const [retailOwner, setEditRetailOwner] = useState({
            //add property for each one of the form fields w/ default value
            retailName: "",
            streetAddress: "",
            city: "",
            state: "",
            zipCode: "",
            userId: localUser.id
        })

const navigate = useNavigate()
const {eventId} = useParams()


useEffect(() => {
    fetch(`http://localhost:8088/events?id=${eventId}`)
    .then(response => response.json())
    .then((data) => {
        setEditEvent(data[0])
    })
}, [])

useEffect(() => {
    fetch(`http://localhost:8088/retailOwners?id=${localUser.id}`)
    .then(response => response.json())
    .then((data) => {
        setEditRetailOwner(data[0])
    })
}, [])


const handleSaveButtonClick = (clickEvent) => {
    clickEvent.preventDefault()

    // fetch(`http://localhost:8088/events/${event.id}`, {
    //     method: "PUT",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(event)
    // })
    //     .then(response => response.json())
    //     .then(() => {
    //         setFeedback("Event changes successfully saved")
    //     })
    //     .then(() => {
    //         navigate("/events")
    //     })

    return fetch(`http://localhost:8088/events/${event.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    })
        .then(response => response.json())
        .then (() => {
            return fetch(`http://localhost:8088/retailOwners/${retailOwner.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(retailOwner)
    })
        })
        .then(() => {
            navigate("/events")
        })
    }

        

        return (
            <>
            <form className="eventEdit"> 
                <h2 className="h3 mb-3 font-weight-normal">Update Event Information </h2>
                <fieldset>
                <div className="form-group">
                    <label htmlFor="retailName"> Retail Name: </label>
                    <input type="text" id="retailName" className="form-control"
                        placeholder="Retail name" required autoFocus 
                        value={retailOwner.retailName}
                        onChange={
                            (evt) => {
                                const copy = {...retailOwner}
                                copy.retailName = evt.target.value
                                setEditRetailOwner(copy)
                            }
                        } />
                    </div>
                </fieldset>
                <fieldset>
                <div className="form-group">
                    <label htmlFor="streetAddress"> Street Address: </label>
                    <input type="sreetAddress" id="streetAddress" className="form-control"
                        placeholder="Street Address" required 
                        value={retailOwner.streetAddress}
                        onChange={
                            (evt) => {
                                const copy = {...retailOwner}
                                copy.streetAddress = evt.target.value
                                setEditRetailOwner(copy)
                            }
                        } />
                        </div>
                </fieldset>
                <fieldset>
                <div className="form-group">
                    <label htmlFor="city"> City: </label>
                    <input type="city" id="city" className="form-control"
                        placeholder="City" required 
                        value={retailOwner.city}
                        onChange={
                            (evt) => {
                                const copy = {...retailOwner}
                                copy.city = evt.target.value
                                setEditRetailOwner(copy)
                            }
                        } />
                        </div>
                </fieldset>
                <fieldset>
                <div className="form-group">
                    <label htmlFor="state"> State: </label>
                    <input type="state" id="state" className="form-control"
                        placeholder="State" required 
                        value={retailOwner.state}
                        onChange={
                            (evt) => {
                                const copy = {...retailOwner}
                                copy.state = evt.target.value
                                setEditRetailOwner(copy)
                            }
                        } />
                        </div>
                </fieldset>
                <fieldset>
                <div className="form-group">
                    <label htmlFor="zipCode"> Zip Code: </label>
                    <input type="zipCode" id="zipCode" className="form-control"
                        placeholder="zipCode" required 
                        value={retailOwner.zipCode}
                        onChange={
                            (evt) => {
                                const copy = {...retailOwner}
                                copy.zipCode = evt.target.value
                                setEditRetailOwner(copy)
                            }
                        } />
                        </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name"> Event Name: </label>
                        <input type="text" id="name" className="form-control"
                        placeholder="Event Name" required 
                        value={event.name}
                        onChange={
                            (evt) => {
                                const copy = {...event}
                                copy.name = evt.target.value
                                setEditEvent(copy)
                            }
                        } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="date"> Date: </label>
                        <input type="text" id="date" className="form-control"
                        placeholder="date" required 
                        value={event.date}
                        onChange={
                            (evt) => {
                                const copy = {...event}
                                copy.date = evt.target.value
                                setEditEvent(copy)
                            }
                        } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="startTime"> Start Time: </label>
                        <input type="text" id="startTime" className="form-control"
                        placeholder="start time" required 
                        value={event.startTime}
                        onChange={
                            (evt) => {
                                const copy = {...event}
                                copy.startTime = evt.target.value
                                setEditEvent(copy)
                            }
                        } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="endTime"> End Time: </label>
                        <input type="text" id="endTime" className="form-control"
                        placeholder="end time" required 
                        value={event.endTime}
                        onChange={
                            (evt) => {
                                const copy = {...event}
                                copy.endTime = evt.target.value
                                setEditEvent(copy)
                            }
                        } />
                    </div>
                </fieldset>
                <fieldset>
                    <label htmlFor="location"> Location: </label><br></br>
                    <select onChange={
                            (evt) => {
                                const copy = {...event}
                                copy.vendorLocation = evt.target.value
                                setEditEvent(copy)
                            }
                            } >
                        <option value={0} type="select" id="location" className="form-control" required>Vendor Location</option>
                        <option value={"Indoors"} type="select" id="location" className="form-control" required>Indoors</option>
                        <option value={"Outdoors"} type="select" id="location" className="form-control" required>Outdoors</option>
                    </select>
                    </fieldset>
                    <fieldset>
                    <div className="form-group">
                        <label htmlFor="image"> Upload Image: </label>
                        <input type="img" id="image" className="form-control"
                        placeholder="Upload Image" required 
                        value={event.img}
                        onChange={
                            (evt) => {
                                const copy = {...event}
                                copy.img = evt.target.value
                                setEditEvent(copy)
                            }
                        } />
                    </div>
                </fieldset>
                <fieldset>
                    <button type="submit"
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">Save Edits </button>
                </fieldset>
            </form>
    </>
    ) 
} 
