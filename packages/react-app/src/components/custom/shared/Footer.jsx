import React from 'react';
import './Footer.css'

export default function Footer() {
return (
 <div className="row footer">
     <div className="col-md-5"></div>
     <div className="col-md-2 footer-images">
     <span className="m-3"><a><img src="assets/img/twitter.svg"></img></a></span>
     <span className="m-3"><a><img src="assets/img/github.svg"></img></a></span>
     <span className="m-3"><a><img src="assets/img/discord.svg"></img></a></span>
     </div>
     <div className="col-md-5"></div>

 </div>
  );

}
