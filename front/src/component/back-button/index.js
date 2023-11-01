// class BackButton {
//   static back() {
//     return window.history.back()
//   }
// }

// window.backButton = BackButton
// import "./index.css";

export default function Component({ to }) {
  return (
    <div className="back-button" onclick="backButton.back();">
      <a href={to} >
        <img src="/svg/back-button.svg" alt="<" width="24" height="24" />
      </a>      
    </div>
  );
}
