generateCryptoMaterial() {
    echo "Generating crypto material"

    : ${CRYPTOGEN_PATH:="organizations"}

    # Remove previous crypto material
    rm -rf ./${CRYPTOGEN_PATH}

    # eVault Orgs
    cryptogen generate --config=./cryptogen/evault/config-india.yaml --output=$CRYPTOGEN_PATH
    cryptogen generate --config=./cryptogen/evault/config-raj.yaml --output=$CRYPTOGEN_PATH

    # Judiciary Orgs
    cryptogen generate --config=./cryptogen/judiciary/config-sci.yaml --output=$CRYPTOGEN_PATH
    cryptogen generate --config=./cryptogen/judiciary/config-hcraj.yaml --output=$CRYPTOGEN_PATH

    cryptogen generate --config=./cryptogen/config-orderer.yaml --output=$CRYPTOGEN_PATH
}

generateGenesisBlock() {
    echo "Generating genesis block"

    cp ./config/configtx.yaml .

    : ${ARTIFACTS_PATH:="channel-artifacts"}
    export FABRIC_CFG_PATH=.

    configtxgen -profile OrdererGenesis -channelID system-channel -outputBlock ./$ARTIFACTS_PATH/genesis.block

    configtxgen -profile Raj -outputCreateChannelTx ./$ARTIFACTS_PATH/raj.tx -channelID raj

    configtxgen -profile HCRaj -outputCreateChannelTx ./$ARTIFACTS_PATH/hcraj.tx -channelID hcraj

    rm ./configtx.yaml
}
