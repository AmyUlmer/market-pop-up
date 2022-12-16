// this component makes a form that allows a vendor to create & submit a new vendor Form
// add a button that will redirect to the form, where information can be edited, then as soon as form is submitted
// the information will be sent to API,
// submit button has toogle that says "your form has been successfully submitted"
// application will be sent to Retail Owners
// this component watches the browser URL and displays the correct component

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const VendorForm = () => {
  const [vendors, updateVendors] = useState({
    //add property for each one of the form fields w/ default value
    vendorName: "",
    description: "",
    img: "",
    userId: 0,
  });

  const [events, setEvents] = useState([]);

  const [productTypes, setProductTypes] = useState([]);
  const [vendorProducts, setVendorProducts] = useState([]);
  const [eventVendor, setEventVendor] = useState({});

  const localMarketUser = localStorage.getItem("market_user");
  const localUser = JSON.parse(localMarketUser);

  const navigate = useNavigate();

  //Get current vendor info from API and set state
  const newVendorProducts = (element) => {
    fetch(`http://localhost:8088/vendorProducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(element),
    }).then((res) => res.json());
  };

  useEffect(() => {
    fetch(`http://localhost:8088/events`)
      .then((response) => response.json())
      .then((eventArray) => {
        setEvents(eventArray);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8088/productTypes`)
      .then((response) => response.json())
      .then((productTypesData) => {
        setProductTypes(productTypesData);
      });
  }, []);

  const handleSubmitClick = (event) => {
    event.preventDefault();

    const vendorInfoToSendToAPI = {
      vendorName: vendors.vendorName,
      description: vendors.description,
      img: vendors.img,
      userId: localUser.id,
    };

    const productInfoToSendToAPI = {
      productTypeId: 0,
      vendorId: 0,
    };

    return fetch(`http://localhost:8088/vendors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vendorInfoToSendToAPI),
    })
      .then((response) => response.json())
      .then((res) => {
        const copy = { ...eventVendor };
        copy.vendorId = res.id;

        return fetch(`http://localhost:8088/eventVendors`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(copy),
        });
      })
      .then((response) => response.json())
      .then((res) => {
        const copy = [...vendorProducts];
        const payload = copy.map((element) => ({
          ...element,
          vendorId: res.id,
        }));
        Promise.all(
          payload.map((obj) => {
            newVendorProducts(obj);
          })
        );
      })
      .then(() => {
        navigate("/vendor/list");
      });
  };

  return (
    <main style={{ textAlign: "left" }}>
      <form className="form--login">
        <h1 className="h3 mb-3 font-weight-normal">Vendor Form </h1>
        <fieldset>
          <div className="form-group">
            <label htmlFor="vendorName"> Vendor Name </label>
            <input
              type="text"
              id="vendorName"
              className="form-control"
              placeholder="Vendor name"
              required
              autoFocus
              value={vendors.vendorName}
              onChange={(evt) => {
                const copy = { ...vendors };
                copy.vendorName = evt.target.value;
                updateVendors(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="description"> Description</label>
            <textarea
              id="description"
              maxLength={100}
              rows={5}
              cols={10}
              className="form-control"
              placeholder="Brief description of your buisness"
              required
              defaultValue={vendors.description}
              onChange={(evt) => {
                const copy = { ...vendors };
                copy.description = evt.target.value;
                updateVendors(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="image"> Upload Image </label>
            <input
              type="img"
              id="image"
              className="form-control"
              placeholder="Upload Image"
              required
              value={vendors.img}
              onChange={(evt) => {
                const copy = { ...vendors };
                copy.img = evt.target.value;
                updateVendors(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <label htmlFor="productType"> Product Type</label>
          <br></br>

          {productTypes.map((productType) => {
            return (
              <>
                <input
                  onChange={(evt) => {
                    const productObj = {
                      productTypeId: parseInt(evt.target.value),
                    };
                    const copy = [...vendorProducts];
                    copy.push(productObj);
                    setVendorProducts(copy);
                  }}
                  value={productType.id}
                  key="productType--{productType.id}"
                  type="checkbox"
                  id="isVendor"
                />
                <label htmlFor="email"> {productType.name} </label>
              </>
            );
          })}
        </fieldset>
        <fieldset>
          <label htmlFor="eventVendors"> Select Event </label>
          <br></br>
          <select
            onChange={(e) => {
              const copy = { ...eventVendor };
              copy.eventId = parseInt(e.target.value);
              setEventVendor(copy);
              console.log(eventVendor);
            }}
          >
            {" "}
            <option>Select Option</option>
            {events.map((event) => {
              return (
                <option key="event--{event.id}" value={event.id}>
                  {event.name}
                </option>
              );
            })}
          </select>
        </fieldset>
        <fieldset>
          <button
            type="submit"
            onClick={(clickEvent) => handleSubmitClick(clickEvent)}
            className="btn btn-primary"
          >
            Submit{" "}
          </button>
        </fieldset>
      </form>
    </main>
  );
};
