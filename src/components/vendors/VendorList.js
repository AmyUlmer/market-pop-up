//this module will show list of vendors for retailOwners to choose from

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [events, setEvents] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [filteredVendors, setFiltered] = useState([]);

  const localMarketUser = localStorage.getItem("market_user");
  const localUser = JSON.parse(localMarketUser);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8088/vendors`)
      .then((response) => response.json())
      .then((vendorArray) => {
        //parameter to capture data after json processing is done
        setVendors(vendorArray);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8088/vendorProducts?_expand=productType`)
      .then((response) => response.json())
      .then((vendorArray) => {
        //parameter to capture data after json processing is done
        setProductTypes(vendorArray);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8088/eventVendors?_expand=event`)
      .then((response) => response.json())
      .then((vendorArray) => {
        //parameter to capture data after json processing is done
        setEvents(vendorArray);
      });
  }, []);

  const getAllVendors = () => {
    fetch(`http://localhost:8088/vendors`) //need to change
      .then((res) => res.json())
      .then((vendorArray) => {
        setVendors(vendorArray);
      });
  };

  const deleteButton = (id) => {
    return (
      <button
        onClick={() => {
          fetch(`http://localhost:8088/vendors/${id}`, {
            method: "DELETE",
          })
            .then((response) => response.json())
            .then(() => {
              getAllVendors();
            });
        }}
        className="vendor_delete"
      >
        Delete
      </button>
    );
  };

  const eventType = (vendorId) => {
    const foundEvent = events.find((event) => vendorId === event.vendorId);
    if (foundEvent) {
      return <div>{foundEvent?.event?.name}</div>;
    } else {
    }
  };

  const productType = (vendorId) => {
    const foundProduct = productTypes.map(
      (event) => vendorId === event.vendorId
    );
    if (foundProduct) {
      return (
        <div>
          {productTypes.map((event) => {
            return <div>{event?.productType?.name}</div>;
          })}
        </div>
      );
    } else {
    }
  };
  return (
    <>
      <h2>List of Vendors</h2>
      <div className="vendors-container">
        {vendors.map((vendorObj) => {
          return (
            <div>
              <div>
                <img
                  src={vendorObj.img}
                  alt={vendorObj.name}
                  className="vendor-img"
                />
                <h3>{vendorObj.vendorName}</h3>
                <p>Description: {vendorObj.description}</p>
                <p>Product Type:{vendorObj?.productType?.productType.name}</p>
                {productType(vendorObj.id)}
                <p>
                  Select Event: {vendorObj?.event?.name}
                  {eventType(vendorObj.id)}
                </p>
              </div>
              {localUser.id === vendorObj.userId ? (
                <>
                  <button
                    className="edit_button"
                    onClick={() => navigate(`/vendors/${vendorObj.id}`)}
                  >
                    Edit Event
                  </button>

                  {deleteButton(vendorObj.id)}
                </>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
