import React from 'react';
import "./Main.css"
import RadicalToken from './partials/RadicalToken'
import PatrionageToken from './partials/PatrionageToken'
import { useQuery, gql } from '@apollo/client';


export default function Dashboard({ address, userProvider }) {
    const radicals = [];
    const patronages = [];

    const query =
    `
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
          }
        }
      }
    `;

    const graphQuery = gql(query)
    const result = useQuery(graphQuery, { pollInterval: 2500 })
    const { user } = result.data || {}

    if (user) {
        for (const radical of user.radicalTokens) {
            radicals.push(<RadicalToken
                tokenId={radical.id}
                tokenURI={radical.tokenURI}
                price={radical.price}
                rate={radical.rate}
            />)
        }

        for (const patronage of user.patronageTokens) {
            patronages.push(<PatrionageToken />)
        }
    }

    return (
        <div className="container">
            <div className="title" >PATRONAGE</div>
            <hr className="horizontal-line"/>

            <div className="row">
            {patronages}
            </div>

            <div className="title">RADICAL</div>
            <hr className="horizontal-line" />

            <div className="row">
                {radicals}
            </div>
        </div>
    );
}
