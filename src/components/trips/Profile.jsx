import React, { useEffect, useState } from 'react'
import { deleteTrip, getPlacesFirestore } from '../../firebase-functions'

export default function Profile() {
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    (async function () {
      setTrips(await getPlacesFirestore());
      // console.log(trips);
    })();
  }, [])

  return (
    <>
      <a href="addtrip">Add a trip</a>
      <div>Profile</div>
      {
        trips.map((trip, idx) =>
          <div key={idx}>
            Trip {idx + 1}: {trip.tripDetails[2]}
            <button onClick={() => deleteTrip(trip.id, setTrips)}>Delete</button>
            <a href={trip.id}>Edit Trip</a>
          </div>
        )
      }
    </>

  )
}
