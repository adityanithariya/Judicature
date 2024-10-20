#!/bin/bash

# chmod +x network.sh

export PATH=${PWD}/../bin:${PWD}/../../bin:${PWD}/scripts:$PATH
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

nvm install 18.17.0
nvm use 18.17.0
npm i -g yarn

if ! command -v cryptogen >/dev/null 2>&1; then
    echo "bin not found!"
    echo "Downloading bin & docker images..."
    pushd ../../
    curl -sSLO https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh && chmod +x install-fabric.sh
    ./install-fabric.sh b d
    popd
fi

loading() {
    str=$1
    len=${#str}
    for ((i=1; i<=len+3; i++)); do
        result+=" "
    done
    for i in {1..3}; do
        echo -ne "\r$str   "
        sleep 0.2
        echo -ne "\r$str.  "
        sleep 0.2
        echo -ne "\r$str.. "
        sleep 0.2
        echo -ne "\r$str..."
        sleep 0.2
        echo -ne "$result\r"
    done
}

loadingPID() {
    pid=$1
    str=$2
    while true; do
        loading "$str"
        if ! ps -p $pid > /dev/null; then
            break
        fi
    done
}
