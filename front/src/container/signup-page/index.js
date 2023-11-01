import "./index.css";
import { Link } from 'react-router-dom';

export default function Component() {
  return <div className="page main">
    <h1>Hello!</h1>

    <h3>Welcom to bank app</h3>

    <button>Sign Up</button>
    <button>Sign In</button>

    <div>
        <Link className="App-link" to="/signup">
          *Login !*
        </Link>
      </div>


  </div>;
}

