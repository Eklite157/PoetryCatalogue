import './PoemCard.css'
import InkBranch from '../assets/InkBranch.png'

//accepts a prop (which in this case is a json object)
function PoemCard ({ poem, onClick }) {
    return(
        <div className = "poem-card" onClick = {onClick} style={{ backgroundImage: `url(${InkBranch})`}}>

            <div className = "poemcard-info">

                <p className = "poem-dynasty">{poem.dynasty}</p>

                <h1>{poem.title}</h1>

                <div className = "poet-info">
                    <p className = "poet-name-cn">{poem.poet}</p>
                    <p className =  "poet-name-en">{poem.poet_en}</p>
                </div>

            </div>
        </div>
    )
}

export default PoemCard;