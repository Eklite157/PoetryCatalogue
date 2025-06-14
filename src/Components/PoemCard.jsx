import './PoemCard.css'

//accepts a prop (which in this case is a json object)
function PoemCard ({ poem, onClick }) {
    return(
        <div className = "poem-card" onClick = {onClick}>
            <h1>{poem.title}</h1>

            <div className = "poet-info">
                <h1>{poem.poet}</h1>
                <h1>{poem.poet_en}</h1>
            </div>
            
            <h1>{poem.dynasty}</h1>
        </div>
    )
}

export default PoemCard;