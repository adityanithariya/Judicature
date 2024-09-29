#!/bin/bash

if [ $# -lt 1 -o $1 == "-h" ]; then
    echo "Usage: ./createChannel.sh <create|join|update|all> [-org1 <domain> <mspID> <port>] [-org2 <domain> <mspID> <port>] [-ch <channelName>] [-p <profile>]"
    exit 1
fi

. initVars.sh "$@"
. utils.sh

if [[ $COMMAND -eq "update" || $COMMAND -eq "all" ]]; then
    if [ -z "$PROFILE" ]; then
        echo "PROFILE is not set"
        exit 1
    fi
fi

createChannel(){
    echo "===================== Channel '$CHANNEL_NAME' creating ===================== "
    setGlobalsForPeer0Org1

    peer channel create -o localhost:7050 -c $CHANNEL_NAME \
    --ordererTLSHostnameOverride orderer.sci.gov.in \
    -f ./channel-artifacts/${CHANNEL_NAME}.tx --outputBlock ./channel-artifacts/${CHANNEL_NAME}.block \
    --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA

    echo "===================== Channel '$CHANNEL_NAME' created ===================== "
}

removeOldCrypto(){
    rm -rf ./api-1.4/crypto/*
    rm -rf ./api-1.4/fabric-client-kv-org1/*
    rm -rf ./api-2.0/org1-wallet/*
    rm -rf ./api-2.0/org2-wallet/*
}

joinChannel(){
    setGlobalsForPeer0Org1
    echo "===================== Channel '$CHANNEL_NAME' joining ===================== "
    set -x
    peer channel join -b ./channel-artifacts/$CHANNEL_NAME.block
    set +x

    setGlobalsForPeer0Org2
    set -x
    peer channel join -b ./channel-artifacts/$CHANNEL_NAME.block
    set +x
    echo "===================== Channel '$CHANNEL_NAME' joined ===================== "
}

updateAnchorPeers(){
    echo "===================== Channel '$CHANNEL_NAME' updating anchor peers ===================== "
    configtxgen -profile $PROFILE -configPath . -outputAnchorPeersUpdate ./channel-artifacts/anchors/${ORG1_MSPID}Anchors.tx -channelID $CHANNEL_NAME -asOrg $ORG1_MSPID

    configtxgen -profile $PROFILE -configPath . -outputAnchorPeersUpdate ./channel-artifacts/anchors/${ORG2_MSPID}Anchors.tx -channelID $CHANNEL_NAME -asOrg $ORG2_MSPID

    setGlobalsForPeer0Org1
    peer channel update -o localhost:7050 --ordererTLSHostnameOverride orderer.sci.gov.in -c $CHANNEL_NAME -f ./channel-artifacts/anchors/${ORG1_MSPID}Anchors.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA

    setGlobalsForPeer0Org2
    peer channel update -o localhost:7050 --ordererTLSHostnameOverride orderer.sci.gov.in -c $CHANNEL_NAME -f ./channel-artifacts/anchors/${ORG2_MSPID}Anchors.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA
    echo "===================== Channel '$CHANNEL_NAME' anchor peers updated ===================== "
}

generateCCP() {
    setGlobalsForPeer0Org1 true
    create_ccp

    setGlobalsForPeer0Org2 true
    create_ccp

    if [[ $PROD == "prod" ]]; then
        [ -d "../../server/connection-profile" ] && rm -rf ../../server/connection-profile
        cp -r ./connection-profile/json/ ../../server/connection-profile
    fi
}

# chmod +x ./init.sh
# . init.sh

if [ "$COMMAND" == "create" ]; then
    createChannel
elif [ "$COMMAND" == "join" ]; then
    joinChannel
elif [ "$COMMAND" == "update" ]; then
    updateAnchorPeers
elif [ "$COMMAND" == "all" ]; then
    generateCCP
    sleep 30
    createChannel
    sleep 20
    joinChannel
    sleep 20
    updateAnchorPeers
fi
