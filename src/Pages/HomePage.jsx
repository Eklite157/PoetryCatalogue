import './HomePage.css'
import '../Components/PoetCard.css'
import LiBai from '../assets/LiBai.jpg';
import WangWei from '../assets/WangWei.jpg';
import SuShi from '../assets/SuShi.jpg';
import PoetCard from '../Components/PoetCard';
import { Link } from 'react-router-dom';


function HomePage() {

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
                        <Link to = "/poet/LiBai" >
                            <PoetCard poetName = 'Li Bai' image = {LiBai}/>
                        </Link>
                        <Link to = "/poet/WangWei">
                            <PoetCard poetName = 'Wang Wei' image = {WangWei}/>
                        </Link>
                        <Link to = "/poet/SuShi">
                            <PoetCard poetName = 'Su Shi' image = {SuShi}/>
                        </Link>
                        <Link to = "/poet/SuShi">
                            <PoetCard poetName = 'Su Shi' image = {SuShi}/>
                        </Link>
                    </div>

                    </div>

                    <h1 className="scroll notification">Scrollable→</h1>
                </div>
            </div>
    
        </div>
    )

}

export default HomePage
