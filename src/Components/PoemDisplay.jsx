import './PoemDisplay.css'
import { useState, useEffect } from 'react';
import useFavorites from '../Hooks/useFavorites' //like useState etc. but your own custom hook!

//take poem and onClose from ExplorePage as props
function PoemDisplay ({ poem, onClose, onUpdate, onDelete, onAllowUpdateAndDelete = false }) {

    const { isFavorite, removeFavorite, addFavorite } = useFavorites(); 

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
        if (isFavorite(poem.id)) {
            removeFavorite(poem.id);
        } else {
            addFavorite(poem)
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
                
                <div className = "quick-action">
                <button className = "close-button" 
                        onClick = {onClose}>Close</button>

                <button className = "favorite-button" onClick = {() => handleToggleFavorite(poem)}>
                        {isFavorite(poem.id) ? '★ Remove Favorite' : '☆ Add to Favorites'}
                </button>
                </div>


                {isEditing ? (
                    <div className = "editing-fields">

                        <h1>In Poem-Editing Mode:</h1>

                        <label htmlFor="title">Poem Title:</label>
                        <input  name = "title" 
                                value = {editedPoem.title}
                                onChange = {handleEdit}/>
                        <label htmlFor="poet">Poet Name:</label>
                        <input  name = "poet" 
                                value = {editedPoem.poet}
                                onChange = {handleEdit}/>
                        <label htmlFor="poet_en">English Romanization:</label>
                        <input  name = "poet_en" 
                                value = {editedPoem.poet_en}
                                onChange = {handleEdit}/>
                        <label htmlFor="dynasty">Dynasty:</label>
                        <input  name = "dynasty" 
                                value = {editedPoem.dynasty || ""}
                                onChange = {handleEdit}/>
                        <label htmlFor="content">Verses:</label> 
                        <textarea   name = "content" 
                                    value = {editedPoem.content}
                                    onChange = {handleEdit}/>

                        <div className = "editing-buttons">
                            <button className = "editing-button" onClick = {handleSave}>Save</button>
                            <button className = "editing-button" onClick = {() => setIsEditing(false)}>Cancel</button>
                        </div>
                    
                        
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