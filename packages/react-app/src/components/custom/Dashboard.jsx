import React from 'react';
import "./Main.css"
import RadicalToken from './partials/RadicalToken'
import PatrionageToken from './partials/PatrionageToken'


export default function Dashboard() {
    const radicals = [];
    const patrionages = [];

    for(let i=0;i<8;i++){
        radicals.push(<RadicalToken/>)
    }
    for(let i=0;i<8;i++){
        patrionages.push(<PatrionageToken/>)
    }

    return (

     <div className="container">


        <div className="title" >PATRONAGE</div>

        <hr className="horizontal-line"/>
         <div className="row">

            {patrionages}

         </div>
        <div className="title">RADICAL</div>
        <hr className="horizontal-line" />
        <div className="row">
            {radicals}

      </div>
     </div>


      );

    }