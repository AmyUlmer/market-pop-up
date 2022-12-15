//this component will show list of events for specific retail owner.
// state will be managed at the component level. Each component will fetch the data it needs to display in the DOM, and then manipulate that state depending on user interactions.
//this component shows list of all events
//vendors can choose from these events
// main page will show all events for unauthorized users to see
//TOO DO
//include clickable link in JSX to route to list of vendors who will be at that specific event

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFiltered] = useState([]);

  const localMarketUser = localStorage.getItem("market_user");
  const localUser = JSON.parse(localMarketUser);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8088/users?_embed=retailOwners&_embed=events`)
      .then((response) => response.json())
      .then((eventArray) => {
        //parameter to capture data after json processing is done
        setEvents(eventArray);
      });
  }, []);

  //do not want to modify original array of events from API but still want to display list of events
  // this is just checking if the current user is a vendor or retailOwner
  useEffect(() => {
    if (localUser.vendor) {
      //if a vendor we want to see all events
      setFiltered(events);
    } else {
      // retail owners can only see their events when logged in
      const myEvents = events.filter((event) => event.userId === localUser.id);
      setFiltered(myEvents);
    }
  }, [events]);

  // const getAllEvents = () => {
  //   fetch(`http://localhost:8088/users?_embed=retailOwners&_embed=events`)
  //     .then((res) => res.json())
  //     .then((eventArray) => {
  //       setEvents(eventArray);
  //     });
  // };

//   const deleteButton = (id) => {
//     return <button onClick={() => {
//         fetch(`http://localhost:8088/activities/${id}`, {
//             method: "DELETE",
//         })
//             .then(response => response.json())
//             .then (() => {
//         fetch(`http://localhost:8088/retailOwners/${id}`, {
//             method: "DELETE",
//         })
//             .then(() => {
//                 getAllEvents()
//         })
//     }} className="event_delete">Delete</button>
// }


  return (
    <>
      {localUser.vendor ? (
        <><button onClick={() => navigate("/vendor/create")}>Submit Vendor Form</button></>
      ) : (
        <>
          <button onClick={() => navigate("/event/create")}>Add Event</button>
        </>
      )}

      <h2>List of Events</h2>
      <div className="retailOwner-container">
        {filteredEvents.map((event) => {
          return event.retailOwners?.map((ownerObj) => {
            return (
              <div>
                <p>Location: {ownerObj.retailName}</p>
                <p>
                  Address: {ownerObj.streetAddress},{ownerObj.city},
                  {ownerObj.state},{ownerObj.zipCode}
                </p>
              </div>
            );
          });
        })}
      </div>
      <div className="events-container">
        {filteredEvents.events?.map((event) => {
          return event.events?.map((eventObj) => {
            return (
              <div>
                <img
                  src={eventObj.img}
                  alt={eventObj.name}
                  className="event-img"
                />
                <p>Date:{eventObj.date}</p>
                <p>Start Time:{eventObj.startTime}</p>
                <p>End Time:{eventObj.endTime}</p>
                <p>Vendor Location:{eventObj.vendorLocation}</p>
              </div>
            );
          });
        })}
      </div>
      {/* <div>
        {localUser.id === eventObj.userId && ownerObj.userId ? (
          <>
            <button
              className="edit_button"
              onClick={() =>
                navigate(`/events/${eventObj.id}${ownerObj.id}`)
              }
            >
              Edit Event
            </button>

            {deleteButton(eventObj,ownerObj.id)}
          </>
        ) : (
          <></>
        )}
      </div> */}
    </>
  );
};
