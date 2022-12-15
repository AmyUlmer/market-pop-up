// this component makes a form that allows a vendor to create & submit a new vendor Form
// add a button that will redirect to the form, where information can be edited, then as soon as form is submitted
// the information will be sent to API, 
// submit button has toogle that says "your form has been successfully submitted"
// application will be sent to Retail Owners 
// this component watches the browser URL and displays the correct component

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const VendorForm = () => {
        const [vendors, updateVendors] = useState({
            //add property for each one of the form fields w/ default value
            vendorName:"",
            description:"", 
            img:"",
            productTypeId: "", // may need to change 
            eventId: 0, 
            userId:0
            

    })


    //     const [productTypes, updateProductTypes] = useState({
    //         //add property for each one of the form fields w/ default value
    //         // name:"", 

    // })

    const [productTypes, setProductTypes] = useState({})

const localMarketUser = localStorage.getItem("market_user")
const localUser = JSON.parse(localMarketUser)

const navigate = useNavigate ()

//Get current vendor info from API and set state

// useEffect(() => {
//     fetch(`http://localhost:8088/vendors`) 
//     .then(response => response.json())
//     .then((vendorArray) => {
//         updateVendors(vendorArray)
//     })
// }, [])

// useEffect(() => {
//     fetch(`http://localhost:8088/productTypes`) 
//     .then(response => response.json())
//     .then((productArray) => {
//         updateVendors(productArray)
//     })
// }, [])

useEffect(() => {
    fetch(`http://localhost:8088/productTypes`) 
    .then(response => response.json())
    .then((productTypesData) => {
        setProductTypes(productTypesData)
    })
}, [])

const handleSubmitClick = (event) => {
    event.preventDefault()

    const vendorInfoToSendToAPI = {
        vendorName:vendors.vendorName,
        description:vendors.description, 
        img:vendors.img,
        productTypeId:vendors?.productTypeId, //from productTypes table
        eventId: vendors?.eventId,
        userId:localUser.id
    }

    // const productInfoToSendToAPI = {
    //     name:productTypes.name
    // }

    return fetch(`http://localhost:8088/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(vendorInfoToSendToAPI)
    })
        .then(response => response.json())
        .then (() => {
            navigate("/vendor/list")
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
                    value={vendors.vendorName}
                        onChange={
                            (evt) => {
                                const copy = {...vendors}
                                copy.vendorName = evt.target.value
                                updateVendors(copy)
                            }
                        } />
            </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
                <label htmlFor="description"> Description</label>
                <textarea id="description" maxLength={100} rows={5} cols={10} className="form-control" 
                    placeholder="Brief description of your buisness" required 
                    defaultValue={vendors.description}
                        onChange={
                            (evt) => {
                                const copy = {...vendors}
                                copy.vendordescription = evt.target.value
                                updateVendors(copy)
                            }
                        } /> 
            </div>
            </fieldset>
            <fieldset>
                    <div className="form-group">
                        <label htmlFor="image"> Upload Image </label>
                        <input type="img" id="image" className="form-control"
                        placeholder="Upload Image" required 
                        value={vendors.img}
                        onChange={
                            (evt) => {
                                const copy = {...vendors}
                                copy.img = evt.target.value
                                updateVendors(copy)
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
        </form>
    </main>
)
}