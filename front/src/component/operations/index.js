import "./index.css";

export default function Component({back}) {
  return (        
        // <table className="table-list">
        //     <tr>
        //         <td className='sender-sign'><img src="/png/S.png" alt="img" /></td> 
        //         <td className='sender'>Stripe</td>
        //         <td className='amount'>$125.00</td>
        //     </tr>
        // </table>
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
