chmod +x ./init.sh
. ./init.sh

chmod +x ./cryptogen/init.sh
. ./cryptogen/init.sh

echo $PWD
generateCryptoMaterial
generateGenesisBlock

docker-compose -f docker-compose.yaml down

docker-compose -f docker-compose.yaml up -d
