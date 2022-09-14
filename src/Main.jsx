import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/login/Login'
import Signup from './components/login/Signup'
import AddTrip from './components/trips/AddTrip'
import EditTrip from './components/trips/EditTrip'
import Profile from './components/trips/Profile'

export default function Main() {
    return (
        <div className="main-container">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/addtrip" element={<AddTrip />} />
                <Route path="/:tripid" element={<EditTrip />} />
                {/* <Route index element={<Home />} />
                    <Route path="teams" element={<Teams />}>
                        <Route path=":teamId" element={<Team />} />
                        <Route path="new" element={<NewTeamForm />} />
                        <Route index element={<LeagueStandings />} />
                    </Route> */}
            </Routes>
        </div>
    )
}
