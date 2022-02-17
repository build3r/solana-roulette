var web3 = require("@solana/web3.js");
const connection = new web3.Connection("http://127.0.0.1:8899", "confirmed");
//For checking whether the connection is successfully made
console.log(connection.getSlot());
const dWallet = web3.Keypair.fromSecretKey(
  Uint8Array.from(
    Uint8Array.from([
      173, 212, 194, 66, 241, 46, 249, 59, 115, 78, 97, 188, 226, 86, 130, 221,
      21, 129, 183, 137, 226, 117, 148, 90, 198, 243, 82, 29, 61, 155, 115, 92,
      248, 98, 190, 139, 6, 18, 87, 4, 190, 82, 2, 126, 32, 250, 51, 170, 61,
      252, 41, 102, 48, 9, 76, 79, 39, 60, 228, 15, 90, 153, 193, 135,
    ])
  )
);
const getBal = async (pKey) => {
  var balance = await connection.getBalance(pKey);
  console.log("Balance = ", balance / web3.LAMPORTS_PER_SOL);
};
getBal(dWallet.publicKey);

const user2Wallet = web3.Keypair.fromSecretKey(
    Uint8Array.from([
      188, 144, 25, 68, 59, 15, 121, 152, 46, 163, 207, 135, 43, 184, 246, 73, 4,
      182, 243, 131, 75, 23, 168, 209, 182, 150, 237, 255, 98, 240, 6, 208, 111,
      141, 162, 32, 238, 161, 12, 58, 10, 77, 35, 220, 5, 202, 64, 5, 78, 97, 247,
      204, 227, 85, 147, 150, 87, 48, 125, 199, 137, 85, 158, 10,
    ])
  );
  console.log("User2 pub Key = ", user2Wallet.publicKey.toString());
  getBal(user2Wallet.publicKey);
  const transaction = new web3.Transaction().add(
    web3.SystemProgram.transfer({
      fromPubkey: dWallet.publicKey,
      toPubkey: user2Wallet.publicKey,
      lamports: 1 * web3.LAMPORTS_PER_SOL,
    })
  );
  var transsfer = async () => {
    const signature = await web3.sendAndConfirmTransaction(
      connection,
      transaction,
      [dWallet]
    );
  
    console.log("Signature is ", signature);
    getBal(dWallet.publicKey);
    getBal(user2Wallet.publicKey);
  };
  transsfer();

  