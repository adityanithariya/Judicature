chmod +x ./init.sh
. init.sh

chmod +x ./cryptogen/init.sh
. cryptogen/init.sh

COMMAND=$1
JUD="--channel hcraj --profile HCRaj --org1 SCI main.sci.gov.in 7051 7054      --org2 HCRaj hcraj.nic.in 8051 8054"
GOVT="--channel raj  --profile Raj   --org1 CentralGovt india.gov.in 9051 9054 --org2 RajGovt raj.gov.in 10051 10054"

if [[ $2 == "prod" ]]; then
    export PROD="prod"
    shift 1
elif [[ $1 == "test" ]]; then
    export PROD="prod"
fi

createOrgs() {
    generateCryptoMaterial > /dev/null 2>&1 &
    loadingPID $! "Generating crypto material"
    generateGenesisBlock > /dev/null 2>&1 &
    loadingPID $! "Generating genesis block"
    echo -e "\nOrgs created\n"
}

networkUp() {
    createOrgs
    echo "Stopping existing containers..."
    docker-compose -f docker-compose.yaml down
    [ -d "../../server/wallet" ] && rm -rf ../../server/wallet
    echo ""
    echo "Starting network"
    docker-compose -f docker-compose.yaml up -d
    echo "Network started"
    echo ""

    cp ./config/configtx.yaml .
    . createChannel.sh all $(echo $JUD) &
    pid1=$!
    . createChannel.sh all $(echo $GOVT) &
    pid2=$!

    wait $pid1
    echo "SCI & HCRaj Channel created"
    wait $pid2
    echo "Central & Raj Channel created"

    # while true; do
    #     loading "Creating channels"

    #     if ! ps -p $pid1 > /dev/null && ! ps -p $pid2 > /dev/null; then
    #         break
    #     fi
    #     if ! ps -p $pid1 > /dev/null; then
    #         echo "Central & Raj Channel created"
    #         pid1=0
    #     fi
    #     if ! ps -p $pid2 > /dev/null && [ "$p2" = true ]; then
    #         echo "SCI & HCRaj Channel created"
    #         pid2=0
    #     fi
    # done

    rm ./configtx.yaml
}

preReqs() {
    jq --version > /dev/null 2>&1
    if [ $? -ne 0 ]; then
        echo -e "Missing Dependencies...\nPlease Install 'jq' using 'sudo apt install jq'"
        echo
        exit 1
    fi
    yarn --version > /dev/null 2>&1
    if [ $? -ne 0 ]; then
        echo -e "Missing Dependencies...\nPlease Install 'yarn' using 'npm install -g yarn'"
        echo
        exit 1
    fi
}

deployCC() {
    preReqs
    : ${CONTRACTS:="../contracts"}
    : ${CONTRACT_CONFIG:="$CONTRACTS/config"}
    . ./scripts/deployCC.sh --lang node --name $1 -v $2 --src $CONTRACTS --pvt-config $CONTRACT_CONFIG/raj.json $(echo $GOVT)
    # . ./scripts/deployCC.sh --lang node --name $1 -v $2 --src $CONTRACTS --pvt-config $CONTRACT_CONFIG/hcraj.json $(echo $JUD)
}

if [ "$COMMAND" = "up" ]; then
    networkUp
    exit 0
elif [ "$COMMAND" = "down" ]; then
    docker-compose -f docker-compose.yaml down --volumes --remove-orphans
    [ -d "../../server/wallet" ] && rm -rf ../../server/wallet
    exit 0
elif [ "$COMMAND" = "deployCC" ]; then
    deployCC $2 $3
elif [ "$COMMAND" = "clean" ]; then
    docker-compose -f docker-compose.yaml down --volumes --remove-orphans
    docker volume prune -f
    docker network prune -f
    exit 0
elif [ "$COMMAND" = "test" ]; then
    preReqs
    networkUp
    sleep 5
    deployCC $2 $3
    exit 0
else
    echo "Usage: ./network.sh [up|down|test|clean|deployCC]"
    echo "./network.sh up [prod] - to start the network"
    echo "./network.sh down - to stop the network"
    echo "./network.sh clean - to clean the network"
    echo "./network.sh deployCC [contract-name] [version] - to deploy chaincode"
    echo "./network.sh test [contract-name] [version] - to start the network and deploy chaincode"
    exit 1
fi
