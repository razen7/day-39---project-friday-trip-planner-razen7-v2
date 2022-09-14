import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { addTripToFirestore, deleteTrip, editTripToFirestore, getTripDetail } from '../../firebase-functions';
import { addSelectedLocation, setSuggestions } from '../../slices/tripSlice';

export default function EditTrip() {
    let { selectedLocations, suggestions } = useSelector((state) => state.tripS);
    let { tripid } = useParams();
    const [title, settitle] = useState();
    const [desc, setDesc] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setendDate] = useState();
    const [status, setstatus] = useState()
    useEffect(() => {
        (async function () {
            let data = await getTripDetail(tripid);
            let selectedLocationsTmp = JSON.parse(data.tripDetails[4]);
            dispatch(addSelectedLocation(selectedLocationsTmp));
            settitle(data.tripDetails[2]);
            setDesc(data.tripDetails[3]);
            setStartDate(data.tripDetails[0]);
            setendDate(data.tripDetails[1]);
            setstatus(data.type)
            console.log(status);
        })();
    }, [])


    let dispatch = useDispatch();
    let goTo = useNavigate();
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
    let editTrip = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        const { title, desc, status, start, end } = formProps;
        let tripDetails = [start, end, title, desc, JSON.stringify(formData.getAll('selectedLocations'))];
        await editTripToFirestore(status, localStorage.getItem('email'), tripDetails, tripid);
        goTo('/profile')
        // [e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].value, e.target[4].value, e.target[5].value] = ['', '', '', '', '', ''];
    }
    return (
        <div className="addtrip-container">
            <h3>Plan a Trip</h3>
            <form id='myForm' onSubmit={(event) => editTrip(event)}>
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
                    <input type="text" name="title" defaultValue={title} required />
                </label>
                <label>
                    Description
                    <input type="text" name="desc" defaultValue={desc} required />
                </label>
                <label>
                    Status
                    <select name="status" required>
                        <option value=""> none </option>
                        {/* selected= */}
                        <option value="planning" selected={status === "planning" ? true : ""} > Planning </option>
                        <option value="completed" selected={status === "completed" ? true : ""} > Completed </option>
                        <option value="cancelled" selected={status === "cancelled" ? true : ""} > Cancelled </option>
                    </select>
                </label>

                <label>Start date:
                    <input type="date" name="start" value={startDate} required />
                </label>

                <label>End date:
                    <input type="date" name="end" value={endDate} required />
                </label>


                <input type="submit" value="Save" />
            </form>
        </div >
    )
}
