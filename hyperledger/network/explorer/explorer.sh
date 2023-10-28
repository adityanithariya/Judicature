COMMAND=$1

if [[ $COMMAND == "up" ]]; then
    export EXPLORER_CONFIG_FILE_PATH=./config.json
    export EXPLORER_PROFILE_DIR_PATH=./connection-profile
    export FABRIC_CRYPTO_PATH=../organizations

    docker-compose -f docker-compose.yaml down
    docker-compose -f docker-compose.yaml up -d
elif [[ $COMMAND == "down" ]]; then
    docker-compose -f docker-compose.yaml down
elif [[ $COMMAND == "clean" ]]; then
    docker-compose -f docker-compose.yaml down
    docker volume prune -f
    docker network prune -f
    docker rmi $(docker images -q)
else
    echo "Usage: ./explorer.sh [up|down|clean]"
fi
