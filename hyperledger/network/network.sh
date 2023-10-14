chmod +x ./init.sh
. ./init.sh

chmod +x ./cryptogen/init.sh
. ./cryptogen/init.sh

echo $PWD
generateCryptoMaterial
generateGenesisBlock
