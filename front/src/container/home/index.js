import "./index.css";
import { Link } from "react-router-dom";
// import BackButton from "../../component/back-button";
import Menu from "../../component/menu";
import Heading from "../../component/heading";

export default function Component() {
  return (
    <div className="container main">
      <Menu />

      {/* <Heading 
        title="Hello!"
        info="Welcome to bank app<"
      /> */}

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
