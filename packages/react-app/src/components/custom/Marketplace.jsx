import React from 'react';
import RadicalTokenMarket from './partials/RadicalTokenMarket'
import PatrionageTokenMarket from './partials/PatrionageTokenMarket'

export default function Marketplace() {
   const radicals = [];
   const patrionages = [];

   for(let i=0;i<8;i++){
       radicals.push(<RadicalTokenMarket/>)
   }
   for(let i=0;i<8;i++){
       patrionages.push(<PatrionageTokenMarket/>)
   }

   return (

    <div className="container">


       <div className="title" >ALWAYS ON SALE</div>

       <hr className="horizontal-line"/>
        <div className="row">

           {patrionages}

        </div>
       <div className="title">RECENT SALES</div>
       <hr className="horizontal-line" />
       <div className="row">
           {radicals}

     </div>
    </div>


     );

    }