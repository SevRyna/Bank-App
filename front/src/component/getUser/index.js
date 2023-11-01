import "./index.css";

export default function Component({back}) {
  
  const email = localStorage.getItem("email")
  console.log('email-user=',email)

  return (
    <div className="email-name">      
      {email}
    </div>
  );
}
