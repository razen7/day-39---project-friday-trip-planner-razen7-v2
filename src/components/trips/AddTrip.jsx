import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addTripToFirestore } from '../../firebase-functions';
import { addSelectedLocation, clear, setSuggestions } from '../../slices/tripSlice';

export default function AddTrip() {
    let { selectedLocations, suggestions } = useSelector((state) => state.tripS);
    let dispatch = useDispatch();
    let goTo=useNavigate();
    // console.log(localStorage.getItem('email'));
    let getSuggestions = async (e) => {
        let url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?access_token=pk.eyJ1IjoiYXJuYXZwdXJpIiwiYSI6ImNrZHNhb3ppYTBkNDYyeHFza3diMXZtdnkifQ.fCuBiUZ9JjgUbBlaBDvPrw`;
        let suggestions = [];
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                data.features.forEach((obj, idx) => {
                    if (idx < 3) {
                        suggestions.push(obj.place_name)
                    }
                });
                // console.log(suggestions);
                dispatch(setSuggestions(suggestions))
            })
            .catch(err => console.error(err));
        // setFunc(suggestion);
    }
    let addTrip = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        const { title, desc, status, start, end } = formProps;
        let tripDetails = [start, end, title, desc,JSON.stringify(formData.getAll('selectedLocations'))];
        addTripToFirestore(status, localStorage.getItem('email'),tripDetails);
        dispatch(clear());
        goTo('/profile');
    }
    return (
        <div className="addtrip-container">
            <h3>Plan a Trip</h3>
            <form id='myForm' onSubmit={(event) => addTrip(event)}>
                <div className="selected-locations-container">
                    Selected Locations :
                    <div id="selected-locations">
                        {
                            selectedLocations.map((location, idx) =>
                                <div key={idx}>
                                    <input type="checkbox" name="selectedLocations" value={location} defaultChecked />
                                    <label> {location}</label>
                                    <br />
                                </div>
                            )
                        }
                    </div>
                </div>

                <label>
                    Search Location : &nbsp;
                    <input type="text" name="location" id='location' onKeyUp={(event) => getSuggestions(event)} />
                </label>
                <div className="suggested-locations">
                    {
                        suggestions.map((suggestion, idx) =>
                            <div key={idx} onClick={() => dispatch(addSelectedLocation(suggestion))}>
                                {suggestion} -- Click to select
                            </div>
                        )
                    }
                </div>

                <label>
                    Trip Title
                    <input type="text" name="title" required />
                </label>
                <label>
                    Description
                    <input type="text" name="desc" required />
                </label>
                <label>
                    Status
                    <select name="status" required>
                        <option value=""> none </option>
                        <option value="planning"> Planning </option>
                        <option value="completed"> Completed </option>
                        <option value="cancelled"> Cancelled </option>
                    </select>
                </label>

                <label>Start date:
                    <input type="date" name="start" required />
                </label>

                <label>End date:
                    <input type="date" name="end" required />
                </label>


                <input type="submit" value="Save" />
            </form>
        </div >
    )
}
