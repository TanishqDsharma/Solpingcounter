import {Connection,Transaction,SystemProgram,sendAndConfirmTransaction,PublicKey,Keypair,TransactionInstruction} from "@solana/web3.js";
import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/node-helpers";

const WalletKeypair = getKeypairFromEnvironment("SECRET_KEY");

const connection = new Connection("https://api.devnet.solana.com","confirmed")
console.log("Loaded our Keypair successfully and connected to the network")


const transaction =new Transaction()
const pingcounter_program_id = new PublicKey('ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa')
const pingcounter_data_account = new PublicKey('Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod')

const instruction = new TransactionInstruction({
    keys:[{
        pubkey:pingcounter_data_account,
        isSigner:false,
        isWritable:true
    }],
    programId:pingcounter_program_id,
    
})

transaction.add(instruction)

const transactionID = await sendAndConfirmTransaction(connection,transaction,[WalletKeypair])
console.log("The transaction id is: " + transactionID)