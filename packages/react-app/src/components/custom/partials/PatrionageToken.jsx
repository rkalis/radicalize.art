import React from 'react';
import  "./Partials.css"

export default function PatrionageToken() {
   return (
   <div className="col-md-3">

    <div className="card patrionage-token">
        <img src="assets/img/testimage.png" className="card-img-top" alt="..."/>
               <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                </div>
        <div class="card-body">
               <div>
               <span className="card-body-left">Annualized income</span>
               <span className="card-body-right">Generated since inception</span>
               </div>

               <div>
               <span className="card-body-left">3.4 ETH</span>
               <span className="card-body-right">2.5 ETH</span>
               </div>
               <div>
               <span className="card-body-left">$ 5,484.46</span>
               <span className="card-body-right">$ 3,484.46</span>
               </div>


        </div>

      </div>
      </div>
       );

     }