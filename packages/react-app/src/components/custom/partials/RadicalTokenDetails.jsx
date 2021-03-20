import React from 'react';
import './Partials.css'

export default function RadicalTokenDetails() {
    return (
     <div className="row">

      <div className="radical-token-details">
            <div className="image">
            </div>
            <div className="title"> Radical Token</div>

            <div className="info">

               <h3>Patrionage due date <span className="date">14/12/2021</span></h3>
               <h3>Patrionage provision <span className="date">0.5 ETH</span></h3>
               <h3>Annual patronage <span className="date">0.13 ETH</span></h3>
               <h3>Patrionage recipient<span className="date">address clickable to etherscan</span></h3>
            </div>
            <hr/>
            <div className="deposit">
            <h3>Your deposit <span className="date">= 0 USD</span></h3>
            <h3>4,6 <span className="date">= 0 USD</span></h3>

            </div>

            <div className="buttons">
               <button>
                  Deposit patrionage
               </button>
               <button>
                  See on Marketplace
               </button>
            </div>

      </div>

     </div>
      );

    }