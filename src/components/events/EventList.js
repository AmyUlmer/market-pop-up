//this component will show list of events for specific retail owner.
// state will be managed at the component level. Each component will fetch the data it needs to display in the DOM, and then manipulate that state depending on user interactions.
//this component shows list of all events
//vendors can choose from these events
// main page will show all events for unauthorized users to see
//TOO DO
//include clickable link in JSX to route to list of vendors who will be at that specific event

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const EventList = () => {
  const [events, setEvents] = useState([]);
  // const [owners, setOwners] = useState([]);
  // const [filteredOwners, setFilteredOwners] = useState([]);
  const [filteredEvents, setFiltered] = useState([]);

  const localMarketUser = localStorage.getItem("market_user");
  const localUser = JSON.parse(localMarketUser);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8088/events?_expand=retailOwner`)
      .then((response) => response.json())
      .then((eventArray) => {
        //parameter to capture data after json processing is done
        setEvents(eventArray);
      });
  }, []);

  //  useEffect(() => {
  //   fetch(`http://localhost:8088/events`)
  //     .then((response) => response.json())
  //     .then((eventArray) => {
  //       //parameter to capture data after json processing is done
  //       setEvents(eventArray);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch(`http://localhost:8088/retailOwners`)
  //     .then((response) => response.json())
  //     .then((ownerArray) => {
  //       //parameter to capture data after json processing is done
  //       setOwners(ownerArray);
  //     });
  // }, []);

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

  // useEffect(() => {
  //   if (localUser.retailOwner) {
  //     //if a vendor we want to see all events
  //     const myOwners = owners.filter((owner) => owner.userId === localUser.id);
  //     setFiltered(myOwners);
  //   }
  // }, []);

  const getAllEvents = () => {
    fetch(`http://localhost:8088/events?_expand=retailOwner`)
      .then((res) => res.json())
      .then((eventArray) => {
        setEvents(eventArray);
      });
  };

  const deleteButton = (id) => {
    return <button onClick={() => {
        fetch(`http://localhost:8088/events/${id}`, {
            method: "DELETE",
        })
            .then(response => response.json())
            .then(() => {
                getAllEvents()
        })
    }} className="event_delete">Delete</button>
}


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
        {/* {filteredEvents.map((event) => {
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
        })} */}
      </div>
      <div className="events-container">
        {filteredEvents.map((eventObj) => {
          // return event.events?.map((eventObj) => {
            return ( <div>
              <div>
                <img
                  src={eventObj.img}
                  alt={eventObj.name}
                  className="event-img"
                />
                <p>Location: {eventObj?.retailOwner?.retailName}</p>
                <p>
                  Address: {eventObj?.retailOwner?.streetAddress},{eventObj?.retailOwner?.city},
                  {eventObj?.retailOwner?.state},{eventObj?.retailOwner?.zipCode}
                </p>
                <p>Date:{eventObj.date}</p>
                <p>Start Time:{eventObj.startTime}</p>
                <p>End Time:{eventObj.endTime}</p>
                <p>Vendor Location:{eventObj.vendorLocation}</p>
                </div>
        {localUser.id === eventObj.userId ? (
          <> 
            <button
              className="edit_button"
              onClick={() =>
                navigate(`/events/edit/${eventObj.id}`)
                
              }
            >
              Edit Event
            </button>
            
            {deleteButton(eventObj.id)}
          </>
        ) : (
          <></>
        )}
      </div>
              
              
            )
          // }
          // )
        })}
      </div>
      
      
    </>
  )
}
