import React, { useEffect, useState } from "react";
import { utils, BigNumber } from "ethers";
import "./Partials.css";
import { getFromIPFS, getFromIpfsGateway } from "../../../helpers/ipfs";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

export default function RadicalToken({ tokenId, tokenURI, price, rate }) {
  const annualPatronage = Number(utils.formatEther(BigNumber.from(rate).mul(price).div(1000))).toFixed(2);
  const priceInEth = Number(utils.formatEther(price)).toFixed(2);

  const [radicalMetadata, setRadicalMetadata] = useState({})

  useEffect(() => {
    if (!radicalMetadata[tokenId]) {
      getMetadata();
    }
  }, []);

  const getMetadata = async () => {
    const thisMetadata = await getFromIpfsGateway(tokenURI)
    const newMetadata = { ...radicalMetadata, [tokenId]: thisMetadata }

    setRadicalMetadata(newMetadata)
  }

  const thisMetadata = radicalMetadata[tokenId] || {};

  return (
    <div className="col-md-4">
      <Card style={{ marginBottom: "20px" }}>
        <Card.Img src={thisMetadata.image} variant="top" />
        <Card.Body>
          <Card.Title style={{ fontSize: "1rem" }}>{thisMetadata.name}</Card.Title>
          <Card.Subtitle style={{ fontSize: "0.8rem" }}>{priceInEth}Ξ</Card.Subtitle>
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>Paying {annualPatronage}Ξ/y</ListGroup.Item>
          <ListGroup.Item>Enough patronage deposited until 0000</ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}
