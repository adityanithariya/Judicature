chmod +x ./init.sh
. init.sh

chmod +x ./cryptogen/init.sh
. cryptogen/init.sh

COMMAND=$1
JUD="--channel hcraj --profile HCRaj --org1 SCI main.sci.gov.in 7051 7054 --org2 HCRaj hcraj.nic.in 8051 8054"
GOVT="--channel raj --profile Raj --org1 CentralGovt india.gov.in 9051 9054 --org2 RajGovt raj.gov.in 10051 10054"

if [[ $2 == "prod" ]]; then
    export PROD="prod"
    shift 1
fi

createOrgs() {
    generateCryptoMaterial > /dev/null 2>&1 &
    loadingPID $! "Generating crypto material"
    generateGenesisBlock > /dev/null 2>&1 &
    loadingPID $! "Generating genesis block"
    echo -e "\nOrgs created\n"
}

if [ "$COMMAND" = "up" ]; then
    createOrgs
    echo "Stopping existing containers..."
    docker-compose -f docker-compose.yaml down
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

    exit 0
elif [ "$COMMAND" = "down" ]; then
    docker-compose -f docker-compose.yaml down --volumes --remove-orphans
    exit 0
elif [ "$COMMAND" = "deployCC" ]; then
    : ${CONTRACTS:="../contracts"}
    : ${CONTRACT_CONFIG:="$CONTRACTS/config"}
    . ./scripts/deployCC.sh --lang node --name $2 -v $3 --src $CONTRACTS --pvt-config $CONTRACT_CONFIG/raj.json $(echo $JUD)
    # . ./scripts/deployCC.sh --lang node --name $2 -v $3 --src $CONTRACTS --pvt-config $CONTRACT_CONFIG/hcraj.json $(echo $GOVT)
fi
