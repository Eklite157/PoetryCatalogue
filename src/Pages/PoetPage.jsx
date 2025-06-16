import './PoetPage.css'
import PoemCard from '../Components/PoemCard'
import PoemDisplay from '../Components/PoemDisplay';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

function PoetPage ({ poems }) {

    const [selectedPoem, setSelectedPoem] = useState(null);

    // /poet/:poetName was dynamic URL routing, poetName was marked as a parameter
    //change to Javascript object
    const { poetName } = useParams(); 
    const actualName = decodeURIComponent(poetName);

    const filteredPoems = poems.filter(p => p.poet_en === actualName);

    return (

      <div className = "poet-page">
        <div className = "poet-content">
          <div className = 'poet-title-bar'>

            <h1 className = 'poet-text'>{actualName}</h1> 

            <div className = 'poet-button-bar'> 
                <Link to= "/">Home</Link>
                  <div className = "vertical-line">|</div>
                <Link to= "/favorites">Favorites</Link>
                  <div className = "vertical-line">|</div>
                <Link to= "/explore">Explore</Link>
          </div>

          </div>

          <div className = "poet-library">

              {filteredPoems.length === 0 ? (
                <p>No poems found for this poet.</p>
              ) : (
                filteredPoems.map((p) => (
                <PoemCard key = {p.id} poem={p} onClick = {() => {setSelectedPoem(p)}}/>
                ))
              )}

              <PoemDisplay poem = {selectedPoem} onClose = {() =>setSelectedPoem(null)}/>
            
          </div>

        </div>
      </div>
    )
}

export default PoetPage;