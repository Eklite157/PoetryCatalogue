import './HomePage.css'
import '../Components/PoetCard.css'
import MountainSun from '../assets/MountainSun.jpg';
import MountainStream from '../assets/MountainStream.jpg';
import MountainBlossoms from '../assets/MountainBlossoms.jpg';
import PoetCard from '../Components/PoetCard';
import { Link } from 'react-router-dom';


function HomePage({poems}) {

    //poet image rotation array
    const poetImages = [MountainSun, MountainBlossoms, MountainStream];

    //array of distinct poets by spreading Set into array
    const uniquePoets = [...new Set(poems.map(poem => poem.poet_en))];

    return (
        <div className = 'homepage'>

            <div className = "content">
                <div className = 'title-bar'>
                    <h1 className = 'welcome-text'>Welcome Back!</h1>
                    <div className = 'button-bar'> 
                        <Link to= "/">Home</Link>
                        <div className = "vertical-line">|</div>
                        <Link to= "/favorites">Favorites</Link>
                        <div className = "vertical-line">|</div>
                        <Link to= "/explore">Explore</Link>
                    </div>
                </div>

                <div className = 'imgBackground'></div>


                <div className = "collection">

                    <h1> The Collection:</h1>

                    <div className = "poet-wheel">

                    <div className = 'poet-wheel-data'>

                        {uniquePoets.map((poetName, index) => {

                            const image = poetImages[index % poetImages.length]; //rotate images

                            return (
                                <Link key = {poetName} to = {`/poet/${encodeURIComponent(poetName)}`}>
                                    <PoetCard poetName = {poetName} image = {image}/>
                                </Link>
                            )
                        })};

                    </div>

                    </div>

                    <h1 className="scroll notification">Scrollable→</h1>
                </div>
            </div>
    
        </div>
    )

}

export default HomePage
