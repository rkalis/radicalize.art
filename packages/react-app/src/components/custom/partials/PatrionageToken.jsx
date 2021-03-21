import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import { utils, BigNumber } from "ethers";
import "./Partials.css";
import { getFromIPFS, getFromIpfsGateway } from "../../../helpers/ipfs";

export default function PatronageToken({ tokenId, tokenURI, price, rate, totalPatronageCollected }) {
  const annualPatronage = Number(utils.formatEther(BigNumber.from(rate).mul(price).div(1000))).toFixed(2);
  const historicPatronage = Number(utils.formatEther(totalPatronageCollected)).toFixed(2);

  const [patronageMetadata, setPatronageMetadata] = useState({})

  useEffect(() => {
    if (!patronageMetadata[tokenId]) {
      getMetadata();
    }
  }, []);

  const getMetadata = async () => {
    const thisMetadata = await getFromIpfsGateway(tokenURI)
    const newMetadata = { ...patronageMetadata, [tokenId]: thisMetadata }

    setPatronageMetadata(newMetadata)
  }

  const thisMetadata = patronageMetadata[tokenId] || {};

  return (
    <div className="col-md-4">
      <Card style={{ marginBottom: "20px" }}>
        <Card.Img src={thisMetadata.image} variant="top" />
        <Card.ImgOverlay>
          {/* <Card.Text style={{ fontSize: "2rem" }}>
            {(rate / 1000).toFixed(1)}%
          </Card.Text> */}
          <Card.Img src="/assets/img/percentage.png" style={{width: "10rem" }} />
        </Card.ImgOverlay>
        <Card.Body>
          <Card.Title style={{ fontSize: "1rem" }}>{thisMetadata.name}</Card.Title>
          <Card.Subtitle style={{ fontSize: "0.8rem" }}>Receiving {annualPatronage}Ξ/y</Card.Subtitle>
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>Collected {historicPatronage}Ξ in total</ListGroup.Item>
          <ListGroup.Item>Can currently collect 0.00Ξ</ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}
