import React from 'react';
import  "./Partials.css"

export default function PatrionageToken({ tokenId, tokenURI, price, rate }) {
    const annualPatronage = ((rate / 1000) * price).toFixed(2)

    return (
        <div className="col-md-3">

            <div className="card patrionage-token">
                <img src="assets/img/testimage.png" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                </div>
                <div class="card-body">
                    <div>
                        <div className="card-body-right">Patronage/y: {annualPatronage} Ξ</div>
                        <div className="card-body-right">Historic patronage collected: x Ξ </div>
                        <div className="card-body-right">Collectable patronage: x Ξ </div>
                    </div>
                </div>

            </div>
        </div>
    );

}
