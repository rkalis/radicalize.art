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
    user.radicalTokens.forEach(radical => {
      radicals.push(
        <RadicalToken tokenId={radical.id} tokenURI={radical.tokenURI} price={radical.price} rate={radical.rate} />,
      );
    });

    user.patronageTokens.forEach(patronage => {
      radicals.push(
        <PatronageToken
          tokenId={patronage.id}
          tokenURI={patronage.tokenURI}
          price={patronage.radicalToken.price}
          rate={patronage.radicalToken.rate}
        />,
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
