chmod +x ./init.sh
. init.sh

chmod +x ./cryptogen/init.sh
. cryptogen/init.sh

COMMAND=$1

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
    . createChannel.sh all -ch hcraj -p HCRaj -org1 main.sci.gov.in SCIMSP 7051 -org2 hcraj.nic.in HCRajMSP 8051 &
    pid1=$!
    . createChannel.sh all -ch raj -p Raj -org1 india.gov.in CentralGovtMSP 9051 -org2 raj.gov.in RajGovtMSP 10051 &
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
    docker-compose -f docker-compose.yaml down
    exit 0
fi
