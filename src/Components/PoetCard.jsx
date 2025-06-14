import './PoetCard.css'

function PoetCard ( {poetName, image} ) {

    return (
        <div className="poet-card" style={{ backgroundImage: `url(${image})` }}>
            <div className = "poet-name">
                <h1>{poetName}</h1>
            </div>
        </div>
    )

}

export default PoetCard;