import { Link } from "react-router-dom";
import Web3 from "web3";
const providerRPC = {
  moonbase: "https://rpc.api.moonbase.moonbeam.network",
};
const web3 = new Web3(providerRPC.moonbase);
export const getBalance = async (address: string) => {
  const balance = web3.utils.fromWei(
    await web3.eth.getBalance(address),
    "ether"
  );
  return balance;
};

export default function Auth() {
  return (
    <>
      <Link to="/">
        <h1>Auth</h1>
        <h4>Join Chat</h4>
        <h4>Create Chat</h4>
      </Link>
    </>
  );
}
