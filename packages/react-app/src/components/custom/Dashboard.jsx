import { useQuery, gql } from "@apollo/client";
import React from "react";
import CardDeck from "react-bootstrap/CardDeck";
import CardGroup from "react-bootstrap/CardGroup";
import "./Main.css";
import RadicalToken from "./partials/RadicalToken";
import PatronageToken from "./partials/PatrionageToken";

export default function Dashboard({ address, userProvider }) {
  const radicals = [];
  const patronages = [];

  const query = `
    {
      user(id: "${String(address).toLowerCase()}") {
        id
        radicalTokens {
          id
          tokenURI
          price
          rate
        }
        patronageTokens {
          id
          tokenURI
          totalPatronageCollected
          radicalToken {
            price
            rate
          }
        }
      }
    }
`;

  const graphQuery = gql(query);
  const result = useQuery(graphQuery, { pollInterval: 2500 });
  const { user } = result.data || {};

  if (user) {
    user.radicalTokens.forEach((radicalToken) => {
      radicals.push(
        <RadicalToken
          tokenId={radicalToken.id}
          tokenURI={radicalToken.tokenURI}
          price={radicalToken.price}
          rate={radicalToken.rate}
        />
      );
    });

    user.patronageTokens.forEach((patronageToken) => {
      patronages.push(
        <PatronageToken
          tokenId={patronageToken.id}
          tokenURI={patronageToken.tokenURI}
          price={patronageToken.radicalToken.price}
          rate={patronageToken.radicalToken.rate}
          totalPatronageCollected={patronageToken.totalPatronageCollected}
        />
      );
    });
  }

  if (!address) {
    return (
      <div className="container no-address">
        <h1 style={{ marginTop: "100px" }}>
          Please connect your Metamask wallet
        </h1>
      </div>
    );
  }

  return (
    <div className="container page">
      <div className="title">PATRONAGE</div>
      <hr className="horizontal-line" />

      <CardGroup>{patronages}</CardGroup>

      <div className="title">RADICAL</div>
      <hr className="horizontal-line" />

      <CardGroup>{radicals}</CardGroup>
    </div>
  );
}
