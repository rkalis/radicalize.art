import React from "react";
import "./Global.css"
import { Link , Redirect, BrowserRouter }  from 'react-router-dom';

import { PageHeader, Button } from "antd";

// displays a page header

export default function Header() {
  return (

    <div className="ant-page-header ant-page-header-ghost" style={{ backgroundColor:"#FFFAE1" }}>
      <div className="ant-page-header-heading">
        <div className="ant-page-header-heading-left">
          <span className="ant-page-header-heading-title" title="radicalize.art">radicalize.art</span>
          <span className="ant-page-header-heading-sub-title"
          title="GENERATE LIFELONG INCOME BY MINTING AND COLLECTING NFT">
            GENERATE LIFELONG INCOME BY MINTING AND COLLECTING NFT
            </span>
        </div>
        <span className="ant-page-header-heading-extra" style={{ paddingRight: "100px" }}>
              <Link to= "/dashboard" className="navbar-brand" style={{ color:"rgba(0, 0, 0, 0.45)" }}  >Dashboard</Link>
              <Link to= "/marketplace" className="navbar-brand" style={{ color:"rgba(0, 0, 0, 0.45)" }} >Marketplace</Link>
              <Link to= "/mint" className="navbar-brand" style={{ color:"rgba(0, 0, 0, 0.45)" }}> Mint</Link>
        </span>
      </div>
    </div>



  );
}

