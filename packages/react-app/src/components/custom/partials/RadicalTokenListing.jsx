import React, { useEffect, useState } from "react";
import { utils, BigNumber } from "ethers";
import "./Partials.css";
import { getFromIPFS, getFromIpfsGateway } from "../../../helpers/ipfs";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useContractLoader } from "../../../hooks";
import { Transactor } from "../../../helpers";


export default function RadicalTokenListing({ tokenId, tokenURI, price, rate, owner, userProvider }) {
  const writeContracts = useContractLoader(userProvider)
  const tx = Transactor(userProvider)

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

  const buy = async () => {
    const safePrice = BigNumber.from(price).mul(11).div(10);
    const totalAmount = BigNumber.from(price).mul(15).div(10);
    await tx(writeContracts.RadicalManager.forceBuy(Number(tokenId), safePrice, { value: totalAmount }))
  }

  return (
    <div className="col-md-4">
      <Card style={{ marginBottom: "20px" }}>
        <Card.Img src={thisMetadata.image} variant="top" />
        <Card.Body>
          <Card.Title style={{ fontSize: "1rem" }}>{thisMetadata.name}</Card.Title>
          <Card.Subtitle style={{ fontSize: "0.8rem" }}>{priceInEth}Ξ</Card.Subtitle>
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>Paying {annualPatronage}Ξ/y ({(rate / 10).toFixed(1)}%)</ListGroup.Item>
          <ListGroup.Item>Owned by {owner}</ListGroup.Item>
          <ListGroup.Item>
          <Button variant="dark" onClick={buy}>Buy</Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}
