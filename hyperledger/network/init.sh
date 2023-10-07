export PATH=${PWD}/../bin:${PWD}/../../bin:${PWD}/../../../bin:$PATH

if ! command -v cryptogen >/dev/null 2>&1; then
    echo "cryptogen not found!"
fi
