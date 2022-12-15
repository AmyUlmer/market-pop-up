//this module will show list of vendors for retailOwners to choose from 

import { useEffect, useState } from "react"

export const VendorList = () => {
    const [vendors, setVendors] = useState([])
    const [filteredVendors, setFiltered] = useState([])

useEffect(
    () => {
        fetch (`http://localhost:8088/vendors`)
            .then(response => response.json())
            .then((vendorArray) => { //parameter to capture data after json processing is done
                setVendors(vendorArray)
            })
    },
    []
)

return <>

    <h2>Vendor Applications</h2>
        <article className="vendors-container">
            {
                vendors.map(
                    (vendor) => {
                        return <section className="vendors_all" key={`vendor--${vendor.id}`}>
                            <img
                                src={vendor.imageUrl}
                                alt={vendor.name}
                                className="vendor-img"
                            />
                            <h3>{vendor.vendorName}</h3>
                                    <div>Description: {vendor.description}</div>
                        </section>
            })
        }
        </article>

    </>
}