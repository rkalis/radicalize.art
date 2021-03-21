import React from 'react';
import { useQuery, gql } from "@apollo/client";
import RadicalTokenListing from './partials/RadicalTokenListing'
import PatrionageTokenMarket from './partials/PatrionageTokenMarket'
import CardGroup from "react-bootstrap/CardGroup"

export default function Marketplace({ address, userProvider }) {
  const query = `
    {
      radicalTokens(limit: 25 orderBy: createdAt orderDirection: desc) {
        id
        tokenURI
        price
        rate
        owner {
          id
        }
      }
    }
  `;

  const graphQuery = gql(query);
  const result = useQuery(graphQuery, { pollInterval: 2500 });
  const { radicalTokens } = result.data || { radicalTokens: [] };

  const listings = radicalTokens.map(token => (
    <RadicalTokenListing
      tokenId={token.id}
      tokenURI={token.tokenURI}
      price={token.price}
      rate={token.rate}
      owner={token.owner.id}
      userProvider={userProvider}
    />
  ));

  return (
    <div className="container">
      <div className="title">MARKETPLACE</div>
      <hr className="horizontal-line" />

      <CardGroup>{listings}</CardGroup>
    </div>
  );
}
