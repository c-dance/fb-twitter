import react from 'react';
import { Link } from  'react-router-dom';


const Navigation = () => (


        <nav>
            <ul>
            <li>
                <Link to ="/">Homt</Link>
            </li>
            <li>
                <Link to ="/profile">Profile</Link>
            </li>
            </ul>
        </nav>

);

export default Navigation;