import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const VendorEditForm = () => {
    const localMarketUser = localStorage.getItem("market_user")
    const localUser = JSON.parse(localMarketUser)

    const [vendor, setEditVendor] = useState({
        vendorName:"",
            description:"", 
            img:"",
            productTypeId: "", // may need to change 
            eventId: 0, 
            userId:localUser.id
    })


const navigate = useNavigate()
const {vendorId} = useParams()

useEffect(() => {
    fetch(`http://localhost:8088/vendors?id=${vendorId}`)
    .then(response => response.json())
    .then((data) => {
        setEditVendor(data[0])
    })
}, [])

const handleSaveButtonClick = (clickEvent) => {
    clickEvent.preventDefault()

    return fetch(`http://localhost:8088/vendors/${vendor.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(vendor)
    })
        .then(response => response.json())
    //     .then (() => {
    //         return fetch(`http://localhost:8088/retailOwners/${retailOwner.id}`, {
    //     method: "PUT",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(retailOwner)
    // })
    //     })
        .then(() => {
            navigate("/events")
        })
    }

    return (
        <main style={{ textAlign: "left" }}>
            <form className="form--login"> 
                <h1 className="h3 mb-3 font-weight-normal">Vendor Form </h1>
                <fieldset>
                <div className="form-group">
                    <label htmlFor="vendorName"> Vendor Name </label>
                    <input type="text" id="vendorName" className="form-control"
                        placeholder="Vendor name" required autoFocus 
                        value={vendor.vendorName}
                            onChange={
                                (evt) => {
                                    const copy = {...vendor}
                                    copy.vendorName = evt.target.value
                                    setEditVendor(copy)
                                }
                            } />
                </div>
                </fieldset>
                <fieldset>
                <div className="form-group">
                    <label htmlFor="description"> Description</label>
                    <textarea id="description" maxLength={100} rows={5} cols={10} className="form-control" 
                        placeholder="Brief description of your buisness" required 
                        defaultValue={vendor.description}
                            onChange={
                                (evt) => {
                                    const copy = {...vendor}
                                    copy.vendordescription = evt.target.value
                                    setEditVendor(copy)
                                }
                            } /> 
                </div>
                </fieldset>
                <fieldset>
                        <div className="form-group">
                            <label htmlFor="image"> Upload Image </label>
                            <input type="img" id="image" className="form-control"
                            placeholder="Upload Image" required 
                            value={vendor.img}
                            onChange={
                                (evt) => {
                                    const copy = {...vendor}
                                    copy.img = evt.target.value
                                    setEditVendor(copy)
                                }
                            } />
                        </div>
                    </fieldset>
                {/* <fieldset>
                    <label htmlFor="productType"> Product Type</label><br></br>
                    <select onChange={evt}>
                        <option> value={0} type="select" id="productType" className="form-control" required</option>
                            {
                            productTypes.map((productType) => {
                                return <option key="productType--{productType.id}" value={productType.name}>{productType.name}</option>
                            }
                        )
                    }
                    </select>
                </fieldset> */}
                {/* <fieldset>
                    <label htmlFor="eventVendors"> Select Event </label><br></br>
                    <select onChange={evt}>
                        <option> value={0} type="select" id="eventVendors" className="form-control" required</option>
                            {
                            events.map((event) => {
                                return <option key="event--{event.id}" value={event.name}>{event.name}</option>
                            }
                        )
                    }
                    </select>
                </fieldset> */}
                 <fieldset>
                        <button type="submit"
                        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                        className="btn btn-primary">Submit </button>
                    </fieldset>
            </form>
        </main>
    )
    }