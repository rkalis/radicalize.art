import React from "react";
import { utils, BigNumber } from "ethers";
import "./Partials.css";

export default function PatronageToken({ tokenId, tokenURI, price, rate, totalPatronageCollected }) {
  const annualPatronage = Number(utils.formatEther(BigNumber.from(rate).mul(price).div(1000))).toFixed(2);
  const historicPatronage = Number(utils.formatEther(totalPatronageCollected)).toFixed(2);

  return (
    <div className="col-md-3">
      <div className="card patrionage-token">
        <img src="assets/img/testimage.png" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
        </div>
        <div className="card-body">
          <div>
            <div className="card-body-right">Patronage/y: {annualPatronage} Ξ</div>
            {/* TODO: Add this to thegraph mapping */}
            <div className="card-body-right">Historic patronage collected: {historicPatronage} Ξ </div>
            {/* TODO: Retrieve this directly from the contract 'collectableRentFor' */}
            <div className="card-body-right">Collectable patronage: x Ξ </div>
          </div>
        </div>
      </div>
    </div>
  );
}
