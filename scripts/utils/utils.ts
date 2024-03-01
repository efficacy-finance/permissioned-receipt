import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { RPC } from "./constants";
import { SuiClient } from "@mysten/sui.js/client";
import { createInterface } from "readline";

function base64ToUint8Array(base64: string) {
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

export class Utils {
    public static provider: SuiClient = new SuiClient({ url: RPC.get() });

    public static async getSigner(): Promise<Ed25519Keypair> {
        // create interface for input and output
        const rl = createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        return new Promise((resolve, reject) => {
            // question user to enter name
            let pk = "";

            rl.question("Enter private key. \n", function (string) {
                pk = string;
                resolve(Ed25519Keypair.fromSecretKey(base64ToUint8Array(pk)));
                rl.close();
            });
        });
    }
}
