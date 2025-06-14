import './PoemDisplay.css'
import { useState, useEffect } from 'react';
import useFavorites from '../Hooks/useFavorites' //like useState etc. but your own custom hook!

//take poem and onClose from ExplorePage as props
function PoemDisplay ({ poem, onClose, onUpdate, onDelete, onAllowUpdateAndDelete = false }) {

    const favoritesHook = useFavorites(); //useFavorites returns an object //CAN DO WITH OBJECT DESTRUCTRING BTW

    //mark if a poem is in a "being edited" state
    const [isEditing, setIsEditing] = useState(false);

    //temporarily store state of updated poem
    // copy the poem object into state; intially going to be identical to all key:values as OG
    const [editedPoem, setEditedPoem] = useState({...poem});

    //fill in editing fields with current poem data, not whatever was stored in state before
    //triggered every time poem prop changes (i.e new poem selected and new PoemDisplay rendered)
    useEffect(() => {
        setEditedPoem({...poem});
        setIsEditing(false);
    }, [poem]);


    //if no poem selected, don't render the following display
    if (poem === null) return null;


    //add to favorites list inside; on the display
    const handleToggleFavorite = (poem) => {
        if (favoritesHook.isFavorite(poem.id)) {
            favoritesHook.removeFavorite(poem.id);
        } else {
            favoritesHook.addFavorite(poem)
        }
    }

    //make necesary replacements when editing poem
    //event is 'user typing', target is the actual element user interacted with
    const handleEdit = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        //in event, will replace whatever the specified edited field is with its new version (value)
        setEditedPoem(prev => ({...prev, [name]: value}))
    }
    
    //save poem and change editing status
    const handleSave = () => {
        //send updated poem to database via prop function
        onUpdate(editedPoem);
        setIsEditing(false);
    }


    //modal-overlay refers to the for the temporary pop-up feature over the app
    return (
        <div className = "modal-overlay">
            <div className = "modal-content">
                
                <button className = "close-button" 
                        onClick = {onClose}>Close</button>

                <button className = "favorite-button" onClick = {() => handleToggleFavorite(poem)}>
                        {favoritesHook.isFavorite(poem.id) ? '★ Remove Favorite' : '☆ Add to Favorites'}
                </button>


                {isEditing ? (
                    <div>
                        <input  name = "title" 
                                value = {editedPoem.title}
                                onChange = {handleEdit}/>
                        <input  name = "poet" 
                                value = {editedPoem.poet}
                                onChange = {handleEdit}/>
                        <input  name = "dynasty" 
                                value = {editedPoem.dynasty || ""}
                                onChange = {handleEdit}/>
                        <textarea   name = "content" 
                                    value = {editedPoem.content}
                                    onChange = {handleEdit}/>

                        <button onClick = {handleSave}>Save</button>
                        <button onClick = {() => setIsEditing(false)}>Cancel</button>
                        
                    </div>
                    
                ): (

                    <div className = "poem-body">
                        <h1 className = "poem-title">{poem.title}</h1>
                        <h2 className = "poem-poet">{poem.poet}</h2>
                        <h2 className = "poem-dynasty">{poem.dynasty}</h2>
                         <p className = "poem-content">{poem.content}</p>


                        {onAllowUpdateAndDelete && (
                            <div className = "controls">
                            <button className = "edit-button" 
                                onClick = {() => {
                                    setIsEditing(true)
                                    //set fields with prop poem values upon render
                                    setEditedPoem(poem)
                                }}>
                                Edit Poem
                            </button>
                    
                            <button className = "delete-button" onClick = {() => onDelete(poem.id)}>
                                Delete Poem
                            </button>
                        </div>)

                        }
                     </div>
                     
                )}

            </div>
        </div>
    )

}

export default PoemDisplay;