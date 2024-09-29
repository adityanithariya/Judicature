#!/bin/bash

generateCryptoMaterial() {
    echo "Generating crypto material"

    : ${CRYPTOGEN_PATH:="organizations"}

    # Remove previous crypto material
    rm -rf ./${CRYPTOGEN_PATH}/peerOrganizations
    rm -rf ./${CRYPTOGEN_PATH}/ordererOrganizations

    cryptogen generate --config=./cryptogen/config-judicature.yaml --output=$CRYPTOGEN_PATH

    cryptogen generate --config=./cryptogen/config-orderer.yaml --output=$CRYPTOGEN_PATH
}

generateGenesisBlock() {
    echo "Generating genesis block"

    : ${ARTIFACTS_PATH:="channel-artifacts"}

    configtxgen -profile ChannelUsingRaft -channelID main -outputBlock ./$ARTIFACTS_PATH/genesis_block.pb -configPath ./config/
}
