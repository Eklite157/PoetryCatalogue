import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './Pages/HomePage';
import FavoritesPage from './Pages/FavoritesPage';
import ExplorePage from './Pages/ExplorePage';
import PoetPage from './Pages/PoetPage'; 
import { FavoritesProvider } from './Hooks/useFavorites';

//keep poems list state centralized in App.jsx and do GET call here so poems can be used across multiple pages
//by passing poems and setPoems down as prop
function App() {

    //store fetched poems in an initial empty array with no poems
    //update this array with poems from backend once API data arrives
    const [poems, setPoems] = useState([]);

    //GET: fetch all poems from backend once component loads
    //good to useEffect to do this so it only runs once when mounted
    //use async so the rest of React app still runs while useEffect is awaiting promise

    const fetchPoems = async() => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/poem`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();// turns JSON response body into array of JavaScriptobjects
            setPoems(data); // replaces poems array with this array 

        } catch (error) {
            console.error("Error fetching poems:", error);
        }
    }

    useEffect(() => {
        fetchPoems();
    }, []);

    return(
        <FavoritesProvider>
        <BrowserRouter>
        <Routes>
            <Route  path = "/" 
                    element = {<HomePage 
                                    poems={poems}/>}/>

            <Route  path = "/favorites" 
                    element = {<FavoritesPage 
                                    refetchPoems={fetchPoems}/>}/>

            <Route  path = "/explore" 
                    element = {<ExplorePage 
                                    poems = {poems}
                                    setPoems = {setPoems}/>}/>

            <Route  path = "/poet/:poetName" 
                    element = {<PoetPage poems = {poems}/>}/>
                    
        </Routes>
        </BrowserRouter>
        </FavoritesProvider>
    )
};

export default App
