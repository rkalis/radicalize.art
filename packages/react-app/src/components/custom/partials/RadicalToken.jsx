import React from 'react';
import  "./Partials.css"

export default function RadicalToken({ tokenId, tokenURI, price, rate }) {
    const annualPatronage = ((rate / 1000) * price).toFixed(2)

    return (
       <div className="col-md-3">
        <div className="card radical-token">
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                </div>

                <div class="card-body">
                    <div>
                        {/* <span className="card-body-left">Patronage due date</span> */}
                        <span className="card-body-right">Patronage/year: {annualPatronage} Ξ</span>
                    </div>

                    <div>
                        {/* <span className="card-body-left">14/12/2021</span> */}
                        <span className="card-body-right">Price: {price} Ξ</span>
                    </div>
                </div>
                <img src="assets/img/testimage.png" className="card-img-bottom" alt="..."/>
            </div>
        </div>
    );

    }
