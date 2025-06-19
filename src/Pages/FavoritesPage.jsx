import { Link } from 'react-router-dom';
import { useState } from 'react';
import './FavoritesPage.css'
import useFavorites from '../Hooks/useFavorites'
import PoemCard from '../Components/PoemCard'
import PoemDisplay from '../Components/PoemDisplay'



function FavoritesPage () {

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPoem, setSelectedPoem] = useState(null);

    const { favorites } = useFavorites();

    return (
        <div className = "favorites-page">
            <div className = "favorites-content">
                <div className = 'favorites-title-bar'>
                    <h1 className = 'favorites-text'>Favorites</h1> 
                    <div className = 'favorites-button-bar'> 
                        <Link to= "/">Home</Link>
                        <div className = "vertical-line">|</div>
                        <Link to= "/favorites">Favorites</Link>
                        <div className = "vertical-line">|</div>
                        <Link to= "/explore">Explore</Link>
                    </div>
                </div>

                <p>Poems may be edited or deleted only on the Explore page ~</p>

                <input  className = "favorites-search-bar" 
                        placeholder = "Search poem..."
                        value = {searchTerm}
                        onChange = {(e) => setSearchTerm(e.target.value)
                }/>

                <div className = 'favorites-library'>
                    {favorites.length === 0 ? 
                            (<p>No Favorites Yet</p>
                            ) : (
                                //get the array of favorited poems and render them
                                favorites.map((p) => 
                                    <PoemCard poem = {p} onClick = {() => setSelectedPoem(p)}/>)
                                )
                    }    
                        
                </div>

                <PoemDisplay poem = {selectedPoem} onClose = {() =>setSelectedPoem(null)}/>
            </div>
        </div>
    )
}

export default FavoritesPage