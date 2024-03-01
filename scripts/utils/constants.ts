export class Constants {
    public static readonly GAS_BUDGET = 50000000;
    public static readonly DEFAULT_TX_OPTIONS: any =
        {
            showEffects: true,
            showEvents: true,
            showObjectChanges: true,
            showBalanceChanges: true,
            showInput: true,
        };

    public static readonly SUI_SCALLING = Math.pow(10, 9);

    /// PRIVATE VARIABLES
    private static readonly BUILD_CMD =
        "sui move build --dump-bytecode-as-base64";
    private static readonly SPOT_BUILD_TARGET_PATH = "../sources/";

    public static getSpotBuildCommand() {
        return Constants.BUILD_CMD;
    }
}

export class RPC {
    public static readonly is_mainnet = true;

    /// PRIVATE VARIABLES
    private static readonly shinami_testnet =
        "https://fullnode.testnet.sui.io:443";
    private static readonly shinami_mainnet =
        "https://api.shinami.com/node/v1/sui_mainnet_c2e92c2147bf347c4ef0808b5e11f0c1";
    private static readonly fullnode_mainnet = "https://fullnode.mainnet.sui.io:443";

    public static get() {
        if (RPC.is_mainnet) {
            return RPC.shinami_mainnet;
        } else {
            return RPC.shinami_testnet;
        }
    }
}

export class PackageConstants {
    public static readonly packageId =
        "0x88701243d0445aa38c0a13f02a9af49a58092dfadb93af9754edb41c52f40085";

    public static readonly upgrade_cap =
        "0x2c513d4053c5c6416fad6d5605444a021e863f492f2632d6b0c58886e4278e1b";

    public static readonly upgraded_packageId =
        "0x08cdc32c81ff28bc300695502118401ed2384d2bef53500b172babd2fdfabeba";

    public static readonly adminCap =
        "0xfae5126a20120a7611eada8931f9a8320b70fb7deb85abec38643de28408385c";

    public static readonly usdcSuiFarm =
        "0x9027b4f4732da39feae74d2f0aa1914c994ce1145a003c26dec1b47d85ffbfe0";

    public static readonly suiCoinType =
        "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI";

    public static readonly usdcCoinType =
        "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN";

}

export class TestnetPackageConstants {
    public static readonly testnet_packageId =
        "0xa9c57b84220313279590618d66a4bcafd2d64957dd9db234ad0d4859d736d4e6";

    public static readonly upgraded_packageId =
        "0x3d95b53cd8a86c665c7366a1456c9526d612bd6b6c0760a0a933a5a8dacaff29";

    public static readonly testnet_adminCap =
        "0x0f616cf7b044a31f402a8a8c5eec643842f647bc4bcf12383201391ebb6249ec";

    public static readonly testnet_upgarade_cap =
        "0xa240a2b352e918bf7557df02ee3a2acad346ca1c8fdb35dd984068ecf52844f5";

    public static readonly usdcSuiFarm =
        "0x9027b4f4732da39feae74d2f0aa1914c994ce1145a003c26dec1b47d85ffbfe0";

    public static readonly suiCoinType =
        "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI";

    public static readonly usdcCoinType =
        "0x219d80b1be5d586ff3bdbfeaf4d051ec721442c3a6498a3222773c6945a73d9f::usdc::USDC"


}

// sui client upgrade --gas-budget 1000000 --upgrade-capability 0x3f5620306d54f7ca7fa03b566b6d529896bb8284f032caed2d1fa0e578af85e0