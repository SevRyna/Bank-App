import "./index.css";

export default function Component({back}) {
  return (   
        <div className='table-list'>
            <div className='sender-sign'>
                <img src="/png/S.png" alt="s" />
            </div>
            <div className="sender">
                Stripe
            </div>
            <div className="amount">
                +$125.00
            </div>
        </div>
);
}
