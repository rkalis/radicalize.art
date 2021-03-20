import React from 'react';
import "./Main.css"

export default function Mint() {
    return (
     <div className="row">
       <div className="col-md-4"></div>

       <div className="col-md-4">

        <form className="form-align">
        <div className="title" >MINT</div>
        <hr/>

          <div className="form-group">
            <input type="file" className="form-control-file" id="file" name="file" />
          </div>

          <div class="form-group">
              <textarea className="form-control" id="name" name="name" rows="2" placeholder="Name your NFT...">
              </textarea>
          </div>

          <div class="form-group">
              <textarea className="form-control" id="description" name="description" rows="6" placeholder="Describe your NFT.."></textarea>
          </div>

          <div className="title" >RADICALIZE</div>
          <hr/>

          <div className="row">
            <div className="col-md-6">
              <div class="form-group textarea-radical">
                <textarea className="form-control" id="newprice" name="price"rows="3" placeholder="New price..."></textarea>
              </div>
            </div>
            <div className="col-md-6">
              <div class="form-group textarea-radical ">
                <textarea className="form-control" id="patronageprice"  name="patronagerate" placeholder="Patronage rate..." rows="3"></textarea>
              </div>
            </div>


          </div>

          <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="checkbox" name="checkbox"/>
          <label class="form-check-label" for="checkbox">
          Use decreasing price function for price discovery mechanism
          </label>
          </div>

          <hr/>

          <p className="note"> NOTE: WHILE YOU KEEP THE RADICAL TOKEN, YOU WILL NOT HAVE TO PAY THE PATRONAGE</p>
          <button className="btn btn-primary">CREATE NFT</button>

          </form>
       </div>
       <div className="col-md-4"></div>


     </div>
      );

    }