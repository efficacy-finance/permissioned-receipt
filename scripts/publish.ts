import { TransactionBlock } from "@mysten/sui.js/transactions";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { execSync } from "child_process";
import { SuiClient } from "@mysten/sui.js/client";
import { RPC } from "./utils/constants";
import { normalizeSuiObjectId } from "@mysten/sui.js/utils";
import path from "path";
import { Utils } from "./utils/utils";

const sourcesPath = path.join(__dirname, "../../pricer/sources/pricer");

const deploy = async (signer: Ed25519Keypair) => {
    const signerAddress = signer.toSuiAddress();
    const compiledModulesAndDependencies = JSON.parse(
        execSync("cd ./strats-receipt | sui move build --dump-bytecode-as-base64", {
            encoding: "utf-8",
        })
    );

    const tx = new TransactionBlock();

    const res = tx.publish({
        modules: compiledModulesAndDependencies.modules.map((m) =>
            Array.from(Buffer.from(m, "base64"))
        ),
        dependencies: compiledModulesAndDependencies.dependencies.map((addr) =>
            normalizeSuiObjectId(addr)
        ),
    });

    tx.transferObjects([res], tx.pure(signerAddress));

    const provider = new SuiClient({ url: RPC.get() });

    const result = await provider.signAndExecuteTransactionBlock({
        transactionBlock: tx,
        signer: signer,
        options: { showObjectChanges: true },
    });

    console.log(result);

    const packageId = result.objectChanges.find((change) => {
        return change.type === "published";
    })["packageId"];

    const pricerObjectId = result.objectChanges.find((change) => {
        return (
            change.type === "created" && change.objectType.includes("Pricer")
        );
    })["objectId"];

    const adminCapObjectId = result.objectChanges?.find((change) => {
        return (
            change.type === "created" && change.objectType.includes("AdminCap")
        );
    })?.["objectId"];

    return [packageId, pricerObjectId, adminCapObjectId];
};

const main = async () => {
    let signer = await Utils.getSigner();
    const [packageId, pricerObjectId, adminCapObjectId] = await deploy(signer);
    console.log("Package published successfully. \n");
    console.log("packageId: " + packageId);
    console.log("pricerObjectId: " + pricerObjectId);
    console.log("adminCapObjectId: " + adminCapObjectId);
};

main();