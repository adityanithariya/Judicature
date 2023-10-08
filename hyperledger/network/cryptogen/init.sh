function generateCryptoMaterial() {
    echo "Generating crypto material"

    : ${CRYPTOGEN_PATH:="organizations"}

    # eVault Orgs
    cryptogen generate --config=./cryptogen/evault/config-india.yaml --output=$CRYPTOGEN_PATH
    cryptogen generate --config=./cryptogen/evault/config-raj.yaml --output=$CRYPTOGEN_PATH

    # Judiciary Orgs
    cryptogen generate --config=./cryptogen/judiciary/config-sci.yaml --output=$CRYPTOGEN_PATH
    cryptogen generate --config=./cryptogen/judiciary/config-hcraj.yaml --output=$CRYPTOGEN_PATH
}
