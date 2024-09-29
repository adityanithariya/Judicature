#!/bin/bash

export PATH=${PWD}/../bin:${PWD}/../../bin:${PWD}/scripts:$PATH
export FABRIC_CFG_PATH="$(pwd)/config"

chmod +x ./scripts/utils.sh
. scripts/utils.sh

chmod +x ./cryptogen/init.sh
. cryptogen/init.sh


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

recreate() {
    while [ "$#" -gt 0 ]; do
        [ -d $1 ] && rm -rf $1 > /dev/null 2>&1
        if [[ $? == 1 ]] && [[ -d $1 ]]; then
            println "Please delete $1 with elevated permissions!"
            exit 0
        fi
        [ ! -d $1 ] && mkdir -p $1
        shift 1
    done
}
