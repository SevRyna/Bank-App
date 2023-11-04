import "./index.css";

export default function Component() {
  return (
    <div className="menu menu-balance">
      {/* menuBalance */}
      <div className="settings-button" >
          <a href="/settings" >
            <img src="/svg/two-lines.svg" alt="<" width="24" height="24" />
          </a>      
      </div>      
        <div className="notification-button" >
          <a href="/notifications" >
            <img src="/png/bell-ringing.png" className="notification-png" alt="bell" />
          </a>
        </div>

    </div>
  );
}
