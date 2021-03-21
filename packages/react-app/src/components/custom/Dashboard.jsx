import React, { useState } from 'react';
import { useUserAddress, useUserProvider } from 'eth-hooks';
import "./Main.css"
import RadicalToken from './partials/RadicalToken'
import PatrionageToken from './partials/PatrionageToken'
import { useQuery, gql } from '@apollo/client';


export default function Dashboard({ address, userProvider }) {
    console.log(`---------------------------- Dashboard: ${address}`);

    const radicals = [];
    const patronages = [];

    // for(let i=0;i<8;i++){
    //     radicals.push(<RadicalToken/>)
    // }
    // for(let i=0;i<8;i++){
    //     patronages.push(<PatrionageToken/>)
    // }

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
