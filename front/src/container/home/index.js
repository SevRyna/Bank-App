import "./index.css";
import { Link } from "react-router-dom";
import Menu from "../../component/menu";

export default function Component() {
  return (
    <div className="container main">
      <Menu />

      <h1>Hello!</h1>

      <h3>Welcome to bank app</h3>

      <div class="main-center"></div>

      <div className="buttons">
        <Link className="App-link active" to="/signup">
          Sign Up
        </Link>
        <Link className="App-link" to="/signin">
          Sign in
        </Link>
      </div>

      <ul />
    </div>
  );
}
