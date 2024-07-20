import { Link } from "react-router-dom";

export function Landingpage(): JSX.Element {
  return (
    <>
      <h1>Polka Chatt</h1>
      <div className="landing-page">
        <div className="content">
          <h1
            style={{
              color: "white",
            }}
          >
            Welcome to Polkadot Chating Dapp
          </h1>
          <Link to="/auth">
            <button className="start-button">Start Chatting</button>
          </Link>
        </div>
      </div>
    </>
  );
}
