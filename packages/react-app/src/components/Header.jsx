import React from "react";
import { PageHeader, Button } from "antd";

// displays a page header

export default function Header() {
  return (

    <div style={{ backgroundColor:"#FFFAE1" }}>
      <PageHeader
        title="radicalize.art"
        subTitle="GENERATE LIFELONG INCOME BY MINTING AND COLLECTING NFT"
        style={{ cursor: "default", color:"red" }}
        extra={[
          <Button key="3">MARKETPLACE</Button>,
          <Button key="2">DASHBOARD</Button>,
          <Button key="2">MINT</Button>,
          <Button key="1" type="primary">
            Primary
          </Button>,
        ]}
      />
    </div>


  );
}

