export COMMAND="$1"

if [[ $COMMAND != -* ]]; then
    shift 1
else
    COMMAND="all"
fi

while [ "$#" -gt 0 ]; do
    case "$1" in
        --org1)
            export ORG1=$2
            export ORG1_DOMAIN=$3
            export ORG1_MSPID="${2}MSP"
            export ORG1_PORT=$4
            export ORG1_CANAME=$5
            export ORG1_CA_PORT=$6
            shift 6
            ;;
        --org2)
            export ORG2=$2
            export ORG2_DOMAIN=$3
            export ORG2_MSPID="${2}MSP"
            export ORG2_PORT=$4
            export ORG2_CANAME=$5
            export ORG2_CA_PORT=$6
            shift 6
            ;;
        --channel|-c)
            export CHANNEL_NAME=$2
            shift 2
            ;;
        --profile|-p)
            export PROFILE=$2
            shift 2
            ;;
        --lang|-l)
            export CC_RUNTIME_LANGUAGE=$2
            shift 2
            ;;
        --version|-v)
            export VERSION=$2
            shift 2
            ;;
        --src|-s)
            export CC_SRC_PATH=$2
            shift 2
            ;;
        --name|-n)
            export CC_NAME=$2
            shift 2
            ;;
        --pvt-config)
            export PRIVATE_DATA_CONFIG=$2
            shift 2
            ;;
    esac
done

if [ -z "$ORG1_DOMAIN" ]; then
    echo "ORG1_DOMAIN is not set"
    exit 1
elif [ -z "$ORG1_MSPID" ]; then
    echo "ORG1_MSPID is not set"
    exit 1
elif [ -z "$ORG1_PORT" ]; then
    echo "ORG1_PORT is not set"
    exit 1
elif [ -z "$ORG2_DOMAIN" ]; then
    echo "ORG2_DOMAIN is not set"
    exit 1
elif [ -z "$ORG2_MSPID" ]; then
    echo "ORG2_MSPID is not set"
    exit 1
elif [ -z "$ORG2_PORT" ]; then
    echo "ORG2_PORT is not set"
    exit 1
elif [ -z "$CHANNEL_NAME" ]; then
    echo "CHANNEL_NAME is not set"
    exit 1
fi

export CORE_PEER_TLS_ENABLED=true
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/sci.gov.in/orderers/orderer.sci.gov.in/msp/tlscacerts/tlsca.sci.gov.in-cert.pem
export PEER0_ORG1_CA=${PWD}/organizations/peerOrganizations/${ORG1_DOMAIN}/peers/peer0.${ORG1_DOMAIN}/tls/ca.crt
export PEER0_ORG2_CA=${PWD}/organizations/peerOrganizations/${ORG2_DOMAIN}/peers/peer0.${ORG2_DOMAIN}/tls/ca.crt
export FABRIC_CFG_PATH=${PWD}/config/

setGlobalsForPeer0Org1(){
    export CORE_PEER_LOCALMSPID=$ORG1_MSPID
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG1_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/${ORG1_DOMAIN}/users/Admin@${ORG1_DOMAIN}/msp
    export CORE_PEER_ADDRESS=localhost:${ORG1_PORT}
    if [[ $1 == true ]]; then
        export ORG=$ORG1
        export ORG_DOMAIN=$ORG1_DOMAIN
        export ORG_PORT=$ORG1_PORT
        export CA_NAME=${ORG1_CANAME}
        export CA_PORT=${ORG1_CA_PORT}
        export PEERPEM=${PWD}/organizations/peerOrganizations/${ORG1_DOMAIN}/tlsca/tlsca.${ORG1_DOMAIN}-cert.pem
        export CAPEM=${PWD}/organizations/peerOrganizations/${ORG1_DOMAIN}/ca/ca.${ORG1_DOMAIN}-cert.pem
    fi
}

setGlobalsForPeer0Org2(){
    export CORE_PEER_LOCALMSPID=$ORG2_MSPID
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG2_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/${ORG2_DOMAIN}/users/Admin@${ORG2_DOMAIN}/msp
    export CORE_PEER_ADDRESS=localhost:${ORG2_PORT}
    if [[ $1 == true ]]; then
        export ORG=$ORG2
        export ORG_DOMAIN=$ORG2_DOMAIN
        export ORG_PORT=$ORG2_PORT
        export CA_NAME=${ORG2_CANAME}
        export CA_PORT=${ORG2_CA_PORT}
        export PEERPEM=${PWD}/organizations/peerOrganizations/${ORG2_DOMAIN}/tlsca/tlsca.${ORG2_DOMAIN}-cert.pem
        export CAPEM=${PWD}/organizations/peerOrganizations/${ORG2_DOMAIN}/ca/ca.${ORG2_DOMAIN}-cert.pem
    fi
}
