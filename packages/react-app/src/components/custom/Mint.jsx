import React, { useState } from 'react';
import { utils } from "ethers"
import "./Main.css"
import { useContractLoader } from '../../hooks';
import { Transactor } from '../../helpers';
const ipfsAPI = require('ipfs-http-client');

const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https' });



export default function Mint({ address, userProvider }) {
  const writeContracts = useContractLoader(userProvider)
  const tx = Transactor(userProvider)

  const initialFormData = Object.freeze({
    name: "Chimp",
    description: "Chimp",
    file: "https://images.squarespace-cdn.com/content/v1/575fa285e321408871d8ed19/1594709938301-QHU9O68TY77LR2F00FGV/ke17ZwdGBToddI8pDm48kE2GkdnIr5SO-CACT9XyGZlZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVGVc7K5CECqctQZfnE8sPkLF_B0_4y0xtJXb2emPG5POEtYYWjJQ7oNp_jeQjbXLko/Chimp1_moncur_0.7mx1m.jpg?format=2500w",
    patronageRate: "50",
    newPrice: "0.25",
    checked: false
  })

  const [formData, updateFormData] = useState(initialFormData);


  const handleChange = (e) => {
    updateFormData({
      ...formData,

      [e.target.name]: e.target.value

    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData);
    await mintFromFormOutput(formData);
  };


  const mintFromFormOutput = async (data) => {
    const {
      name,
      description,
      image,
      artist,
      patronageRate,
      newPrice,
    } = data;

    const radicalToken = {
      name,
      description,
      image,
      attributes: [
        {
          trait_type: "artist",
          value: artist
        }
      ]
    };

    const patronageToken = {
      name: `${patronageRate}% patronage on ${name}`,
      description: `Pay to the bearer on demand ${patronageRate}%`,
      image,
      attributes: [
        {
          trait_type: "Patronage Rate",
          value: patronageRate
        }
      ]
    };

    console.log("Uploading radical ..")
    console.log("Uploading patronage...")
    const r = await ipfs.add(JSON.stringify(radicalToken))
    const p = await ipfs.add(JSON.stringify(patronageToken))
    console.log(r, p);

    await tx(writeContracts.RadicalManager.mint(address, utils.parseEther(newPrice), parseInt(patronageRate), p.path, r.path))
  }


    return (

     <div className="row">
       <div className="col-md-4"></div>

       <div className="col-md-4">

        <form className="form-align" action="">
        <div className="title" >MINT</div>
        <hr/>

        <div class="form-group">
              <input type="string" className="form-control" id="image" name="image" rows="2" placeholder="Add your image URL..." required onChange={handleChange}>
              </input>
          </div>

          <div class="form-group">
              <textarea className="form-control" id="name" name="name" rows="2" placeholder="Name your NFT..."  required onChange={handleChange}>
              </textarea>
          </div>

          <div class="form-group">
              <textarea className="form-control" id="description" name="description" rows="6" placeholder="Describe your NFT.." required onChange={handleChange}></textarea>
          </div>

          <div className="title" >RADICALIZE</div>
          <hr/>

          <div className="row">
            <div className="col-md-6">
              <div class="form-group textarea-radical">
                <textarea className="form-control" id="newprice" name="newPrice" rows="3" placeholder="New price..." required onChange={handleChange}></textarea>
              </div>
            </div>
            <div className="col-md-6">
              <div class="form-group textarea-radical ">
                <textarea className="form-control" id="patronageprice"  name="patronageRate" placeholder="Patronage rate..." rows="3" required onChange={handleChange}></textarea>
              </div>
            </div>


          </div>

          <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="checkbox" name="checked" required onChange={handleChange} readOnly/>
          <label class="form-check-label" for="checkbox">
              Use decreasing price function for price discovery mechanism
          </label>
          </div>

          <hr/>

          <p className="note"> NOTE: WHILE YOU KEEP THE RADICAL TOKEN, YOU WILL NOT HAVE TO PAY THE PATRONAGE</p>
          <button className="btn btn-primary" type="submit" onClick={handleSubmit}>CREATE NFT</button>

          </form>
       </div>
       <div className="col-md-4"></div>


     </div>
      );

    }
