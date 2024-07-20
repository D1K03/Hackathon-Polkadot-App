const { ApiPromise } = require("@polkadot/api");

const api = await ApiPromise.create();

api.rpc.chain.subscribeNewHeads((header) => {
  console.log(`Chain is at #${header.number}`);
});
