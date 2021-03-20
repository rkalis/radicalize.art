import React from 'react';
import  "./Partials.css"

export default function RadicalToken() {
    return (
       <div className="col-md-3">

       <div className="card radical-token">
              <div className="card-body">
                     <h5 className="card-title">Card title</h5>
                     {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
               </div>

       <div class="card-body">
               <div>
               <span className="card-body-left">Patronage due date</span>
               <span className="card-body-right">Annual patronage</span>
               </div>

               <div>
               <span className="card-body-left">14/12/2021</span>
               <span className="card-body-right">1 ETH</span>
       </div>
       <div>
               <span className="card-body-right">$ 1,8000.00</span>
       </div>
       </div>
       <img src="assets/img/testimage.png" className="card-img-bottom" alt="..."/>


     </div>
     </div>
      );

    }