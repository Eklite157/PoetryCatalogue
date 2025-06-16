import "./ExplorePage.css"
import PoemCard from "../Components/PoemCard"
import PoemDisplay from "../Components/PoemDisplay";
import AddPoemCard from "../Components/AddPoemCard";
import { Link } from 'react-router-dom';
import { useState } from "react";
import useFavorites from "../Hooks/useFavorites"

//receives the poems list from App as a prop
function ExplorePage ({ poems, setPoems }) {

    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    const handleToggleFavorite = (poem) => {
        if (isFavorite(poem.id)) {
            removeFavorite(poem.id);
        } else {
        addFavorite(poem);
    }
    };

    //for search feature
    const [searchTerm, setSearchTerm] = useState ("");

    //for poem display feature
    const [selectedPoem, setSelectedPoem] = useState(null);

    //for adding to database feature
    const [isCreating, setIsCreating] = useState(false);
    

    //deletes poem from database
    const handleDelete = async (id) => {
        try {
            //delete poem from database
            await fetch(`http://localhost:8080/api/v1/poem/${id}`, {
                method:'DELETE'
            });

            //notify user
            alert(`Poem deleted`);

            //re-render UI upon state change
            setPoems((prev) => prev.filter((p) => (p.id !== id)));

            setSelectedPoem(null);

        } catch (error) {
            console.error ("Delete failed:", error);
        }
    };


    //updates database
    const handleUpdate = async (editedPoem)=> {
        try {
            //update poem in database
            const response = await fetch(`http://localhost:8080/api/v1/poem/${editedPoem.id}`, {
                method:'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(editedPoem)
            })

            //if successful, refresh and display new version in UI
            if (response.ok) {
                const updatedPoem = await response.json(); //convert returned response body JSON into Javascript object

                //update local array of poems, replacing old poem with new and keeping index in array
                setPoems(prev=>prev.map((p) => (p.id === updatedPoem.id ? updatedPoem : p)))
                
                //Displays updated poem automatically for user
                setSelectedPoem(updatedPoem);
            }

        } catch (error) {
            console.error("Update failed", error);
        }
    }

    
    const handlePost = async(newPoem) => {

        try {
            const response = await fetch('http://localhost:8080/api/v1/poem', {
                method:'POST',
                headers: { 'Content-Type':'application/json'},
                body:JSON.stringify(newPoem)
            })

            const savedPoem = await response.json();
            
            if (!response.ok) {
                const errorText = await response.text();  // like "Null or Duplicate"
                alert(`Failed to save poem: ${errorText}`);
                return;
            }

            //notify user
            alert(`Saved at ${savedPoem.id}`);

            //re-render UI
            setPoems(prev => [...prev, newPoem]);

            //close the AddPoem window
            setIsCreating(false);

        } catch {
            console.error('Failed to save poem', error)
        }
    }


    return (

        <div className = "explore-page">
            <div className = "explore-content">
                <div className = 'explore-title-bar'>
                    <h1 className = 'explore-text'>Explore</h1>
                    <div className = 'explore-button-bar'> 
                        <Link to= "/">Home</Link>
                        <div className = "vertical-line">|</div>
                        <Link to= "/favorites">Favorites</Link>
                        <div className = "vertical-line">|</div>
                        <Link to= "/explore">Explore</Link>
                    </div>
                </div>

                <button className = "create-button" onClick = {() => setIsCreating(true)}>Create </button>

                <input  className = "search-bar" 
                        placeholder = "Search poem..."
                        value = {searchTerm}
                        onChange = {(e) => setSearchTerm(e.target.value)}/>

                <div className = 'poem-library'>
                        {poems
                            // This will return ALL poems upon mount because every string includes initial state ""
                            .filter((p) => 
                                p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                p.content.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                        
                            .map((p) => (
                            <PoemCard   key={p.id} 
                                        poem={p} 
                                        onClick = {() => setSelectedPoem(p)}
                                        onToggleFavorite = {() => handleToggleFavorite(p)}/>
                            ))}
                </div>

                <PoemDisplay    poem = {selectedPoem} 
                                onClose = {() =>setSelectedPoem(null)}
                                onUpdate = {handleUpdate}
                                onDelete = {handleDelete}
                                onAllowUpdateAndDelete={true}/>

                
                <AddPoemCard    isCreating = {isCreating} 
                                onClose = {() => setIsCreating(false)}
                                onSubmit = {handlePost}/>

            </div>
        </div>
    )
}

export default ExplorePage;