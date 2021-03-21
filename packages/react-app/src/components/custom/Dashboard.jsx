import { useQuery, gql } from "@apollo/client";
import React from "react";
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

  return (
    <div className="container">
      <div className="title">PATRONAGE</div>
      <hr className="horizontal-line" />

      <div className="row">{patronages}</div>

      <div className="title">RADICAL</div>
      <hr className="horizontal-line" />

      <div className="row">{radicals}</div>
    </div>
  );
}
