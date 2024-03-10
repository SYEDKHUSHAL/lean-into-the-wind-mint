import React, { useEffect } from "react";
const Mint = (props) => {
  
  return (
    <div className="mint">
      <div className="mint-content">
        <p>LITW MINT</p>
        {!props.connectedAccount && <button onClick={props.connectToMetamask} className="mobile-connect-wallet-btn"> Connect Wallet</button>}
        <p>Total Supply: {props.totalSupply}/3333</p>
        <button className="minus-button" onClick={props.decreament}>
          -
        </button>{" "}
        <span className="num-mints">{props.amountMinting}</span>{" "}
        <button className="plus-button" onClick={props.increament}>
          +
        </button>
        {props.saleStatus === "OG Mint"?<button className="mint-btn" onClick={props.ogMint}>
          Mint
        </button>: <p></p>}
        {props.saleStatus === "Whitelist Mint"?<button className="mint-btn" onClick={props.whiteListMint}>
          Mint
        </button>: <p></p>}
        {props.saleStatus === "Publist Mint"?<button className="mint-btn" onClick={props.pubListMint}>
          Mint
        </button>: <p></p>}
        {props.saleStatus === "Public Mint"?<button className="mint-btn" onClick={props.publicMint}>
          Mint
        </button>: <p></p>}
        {props.saleStatus === "Public Mint"? <p></p>: <p>WhiteList Status: {props.whiteListStatus}</p>}
        <p>Max Allowed Mints: {props.maxAllowedMints}</p>
        <p>Sale Status: {props.saleStatus}</p>
        {props.error &&  <p>{props.error}</p>}
      </div>
    </div>
  );
};

export default Mint;
