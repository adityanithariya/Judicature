if [ -z "$1" ]; then
    echo -e "Usage: ./deployChaincode.sh -lang <language> -v <version> -src <path> -name <name>"
    exit 1
fi

. initVars.sh "$@"

if [ -z "$CC_RUNTIME_LANGUAGE" ]; then
    echo -e "CC_RUNTIME_LANGUAGE is not set"
    exit 1
elif [ -z "$VERSION" ]; then
    echo -e "VERSION is not set"
    exit 1
elif [ -z "$CC_SRC_PATH" ]; then
    echo -e "CC_SRC_PATH is not set"
    exit 1
elif [ -z "$CC_NAME" ]; then
    echo -e "CC_NAME is not set"
    exit 1
elif [ -z "$PRIVATE_DATA_CONFIG" ]; then
    echo -e "PRIVATE_DATA_CONFIG is not set"
    exit 1
fi

preDeploy() {
    # jq --version > /dev/null 2>&1
    # if [ $? -ne 0 ]; then
    #     echo -e "Missing Dependencies...\nPlease Install 'jq' using 'sudo apt install jq'"
    #     echo
    #     exit 1
    # fi
    echo -e "Installing dependencies..."
    pushd $CC_SRC_PATH
    yarn
    yarn build
    popd
    echo Finished installing dependencies
}

setGlobalsForPeer0Org2
ORG2_ADDRESS=$CORE_PEER_ADDRESS
setGlobalsForPeer0Org1
ORG1_ADDRESS=$CORE_PEER_ADDRESS

packageChaincode() {
    rm -rf ${CC_NAME}.tar.gz
    setGlobalsForPeer0Org1
    peer lifecycle chaincode package ${CC_NAME}.tar.gz \
        --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} \
        --label ${CC_NAME}_${VERSION}
    echo -e "===================== Chaincode is packaged on peer0.org1 =====================\n\n"
}

installChaincode() {
    setGlobalsForPeer0Org1
    peer lifecycle chaincode install ${CC_NAME}.tar.gz
    echo -e "===================== Chaincode is installed on peer0.org1 =====================\n\n"

    # setGlobalsForPeer1Org1
    # peer lifecycle chaincode install ${CC_NAME}.tar.gz
    # echo -e "===================== Chaincode is installed on peer1.org1 =====================\n\n"

    setGlobalsForPeer0Org2
    peer lifecycle chaincode install ${CC_NAME}.tar.gz
    echo -e "===================== Chaincode is installed on peer0.org2 =====================\n\n"

    # setGlobalsForPeer1Org2
    # peer lifecycle chaincode install ${CC_NAME}.tar.gz
    # echo -e "===================== Chaincode is installed on peer1.org2 =====================\n\n"
}

queryInstalled() {
    setGlobalsForPeer0Org1
    peer lifecycle chaincode queryinstalled --output json >&package.log
    # cat deploy.log
    PACKAGE_ID=$(jq -r '.installed_chaincodes[0].package_id' package.log)
    # PACKAGE_ID=$(sed -n "/${CC_NAME}_${VERSION}/{s/^Package ID: //; s/, Label:.*$//; p;}" deploy.log)
    echo PackageID is ${PACKAGE_ID}
    echo -e "===================== Query installed successful on peer0.org1 on channel =====================\n\n"
}

approveForMyOrg1() {
    setGlobalsForPeer0Org1

    peer lifecycle chaincode approveformyorg -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.sci.gov.in --tls \
        --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name ${CC_NAME} \
        --version ${VERSION} --package-id ${PACKAGE_ID} \
        --sequence ${VERSION}
        # --collections-config $PRIVATE_DATA_CONFIG \

    echo -e "===================== chaincode approved from org 1 =====================\n\n"
}

getBlock() {
    setGlobalsForPeer0Org1

    peer channel getinfo -c mychannel -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.sci.gov.in --tls \
        --cafile $ORDERER_CA
}

approveForMyOrg2() {
    setGlobalsForPeer0Org2

    peer lifecycle chaincode approveformyorg -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.sci.gov.in --tls $CORE_PEER_TLS_ENABLED \
        --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name ${CC_NAME} \
        --version ${VERSION} --package-id ${PACKAGE_ID} \
        --sequence ${VERSION}
        # --collections-config $PRIVATE_DATA_CONFIG \

    echo -e "===================== chaincode approved from org 2 =====================\n\n"
}

checkCommitReadyness() {
    setGlobalsForPeer0Org1
    peer lifecycle chaincode checkcommitreadiness --channelID $CHANNEL_NAME \
        --name ${CC_NAME} --version ${VERSION} --sequence ${VERSION} --output json
        # --collections-config $PRIVATE_DATA_CONFIG \
    echo -e "===================== checking commit readyness from org 1 =====================\n\n"
}

commitChaincodeDefination() {
    peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.sci.gov.in \
        --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA \
        --channelID $CHANNEL_NAME --name ${CC_NAME} \
        --peerAddresses $ORG1_ADDRESS --tlsRootCertFiles $PEER0_ORG1_CA \
        --peerAddresses $ORG2_ADDRESS --tlsRootCertFiles $PEER0_ORG2_CA \
        --version ${VERSION} --sequence ${VERSION} 
        # --collections-config $PRIVATE_DATA_CONFIG \
}

queryCommitted() {
    setGlobalsForPeer0Org1
    peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME}
    setGlobalsForPeer0Org2
    peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME}
}

# chaincodeInvokeInit() {
#     setGlobalsForPeer0Org1
#     ORG1_ADDRESS=$CORE_PEER_ADDRESS

#     peer chaincode instantiate -o localhost:7050 \
#         --ordererTLSHostnameOverride orderer.sci.gov.in \
#         --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA \
#         -C $CHANNEL_NAME -n ${CC_NAME} \
#         --peerAddresses $ORG1_ADDRESS --tlsRootCertFiles $PEER0_ORG1_CA \
#         -v ${VERSION} -c '{"Args":[]}'

#     setGlobalsForPeer0Org2
#     ORG2_ADDRESS=$CORE_PEER_ADDRESS

#     peer chaincode instantiate -o localhost:7050 \
#         --ordererTLSHostnameOverride orderer.sci.gov.in \
#         --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA \
#         -C $CHANNEL_NAME -n ${CC_NAME} \
#         --peerAddresses $ORG2_ADDRESS --tlsRootCertFiles $PEER0_ORG2_CA \
#         -v ${VERSION} -c '{"Args":[]}'
# }

# chaincodeInvoke() {
#     setGlobalsForPeer0Org2
#     ORG2_ADDRESS=$CORE_PEER_ADDRESS
#     setGlobalsForPeer0Org1
#     ORG1_ADDRESS=$CORE_PEER_ADDRESS

#     ## Init ledger
#     peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.sci.gov.in \
#     --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} \
#     --peerAddresses $ORG1_ADDRESS --tlsRootCertFiles $PEER0_ORG1_CA \
#     -c '{"function": "DocExists", "Args":["123"]}'
#     # --peerAddresses $ORG2_ADDRESS --tlsRootCertFiles $PEER0_ORG2_CA  \

#     ## Add private data
#     # export CAR=$(echo -e "{\"key\":\"1111\", \"make\":\"Tesla\",\"model\":\"Tesla A1\",\"color\":\"White\",\"owner\":\"pavan\",\"price\":\"10000\"}" | base64 | tr -d \\n)
#     # peer chaincode invoke -o localhost:7050 \
#     #     --ordererTLSHostnameOverride orderer.sci.gov.in \
#     #     --tls $CORE_PEER_TLS_ENABLED \
#     #     --cafile $ORDERER_CA \
#     #     -C $CHANNEL_NAME -n ${CC_NAME} \
#     #     --peerAddresses $ORG1_ADDRESS --tlsRootCertFiles $PEER0_ORG1_CA \
#     #     --peerAddresses $ORG2_ADDRESS --tlsRootCertFiles $PEER0_ORG2_CA \
#     #     -c '{"function": "CreateAsset", "Args":[]}' \
#     #     --transient "{\"car\":\"$CAR\"}"
# }

# chaincodeQuery() {
#     setGlobalsForPeer0Org2

#     # Query all cars
#     # peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"Args":["queryAllCars"]}'

#     # Query Car by Id
#     peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"function": "queryCar","Args":["CAR0"]}'
#     #'{"Args":["GetSampleData","Key1"]}'

#     # Query Private Car by Id
#     # peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"function": "readPrivateCar","Args":["1111"]}'
#     # peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"function": "readCarPrivateDetails","Args":["1111"]}'
# }

# set -x
preDeploy
packageChaincode
installChaincode
queryInstalled
approveForMyOrg1
checkCommitReadyness
approveForMyOrg2
checkCommitReadyness
commitChaincodeDefination
queryCommitted
# set +x
