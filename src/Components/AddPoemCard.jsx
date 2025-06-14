import './AddPoemCard.css'
import { useState } from 'react';



function AddPoemCard ( {isCreating, onClose, onSubmit} ) {


    //to temporarily store state of fields to be added
    const [newPoem, setNewPoem] = useState({
        title: '',
        poet: '',
        poet_en: '',
        dynasty: '',
        content:''
    });


    if (!isCreating) return null;


    return (

        <div className = "modal-overlay-creation-screen">

            <div className = "creation-screen">

                <button className = "creation-screen-close-button" 
                        onClick = {onClose}> Close</button>

                <div className = 'creation-screen-data'>
                    
                    <input  className = "add-title" 
                            placeholder = "Title"
                            value = {newPoem.title}
                            onChange = {(e) => setNewPoem({...newPoem, title: e.target.value})}/>

                    <input  className = "add-poet" 
                            placeholder = "Poet"
                            value = {newPoem.poet}
                            onChange = {(e) => setNewPoem({...newPoem, poet: e.target.value})}/>

                    <input  className = "add-poet_en" 
                            placeholder = "Poet Romanization"
                            value = {newPoem.poet_en}
                            onChange = {(e) => setNewPoem({...newPoem, poet_en: e.target.value})}/>


                    <input  className = "add-dynasty" 
                            placeholder = "Dynasty"
                            value = {newPoem.dynasty}
                            onChange = {(e) => setNewPoem({...newPoem, dynasty: e.target.value})}/>
                            
                    <textarea   className = "add-content" 
                                placeholder = "Verse"
                                value = {newPoem.content}
                                onChange = {(e) => setNewPoem({...newPoem, content: e.target.value})}/>

                </div>

                <button onClick = {
                    //Send newPoem data back up to handlePost
                    () => onSubmit(newPoem)}>Add!
                </button>
                
            </div>

            <button>Cancel</button>

        </div>
    )


}

export default AddPoemCard;