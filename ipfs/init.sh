ipfs >/dev/null 2>&1
if [ $? -ne 0 ]; then
echo "IPFS not found!"

if ! command -v go >/dev/null 2>&1; then
echo "Go not found!"
echo "Downloading Go 1.11.4..."
wget https://dl.google.com/go/go1.11.4.linux-amd64.tar.gz
echo "Installing Go 1.11.4..."
sudo tar -xvf go1.11.4.linux-amd64.tar.gz
sudo mv go /usr/local
echo "Go 1.11.4 installed!"

# Create path
mkdir $HOME/gopath

cat << 'EOF' >> ~/.bashrc

export GOROOT=/usr/local/go
export GOPATH=$HOME/gopath
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin

EOF

fi

# Install IPFS
echo "Installing IPFS..."
wget https://dist.ipfs.io/go-ipfs/v0.4.18/go-ipfs_v0.4.18_linux-amd64.tar.gz
tar xvfz go-ipfs_v0.4.18_linux-amd64.tar.gz
sudo mv go ipfs/ipfs /usr/local/bin

echo -e "\nexport IPFS_PATH=$IPFS_PATH\n" >> ~/.bashrc

pushd ./go-ipfs/
./install.sh
popd

source ~/.bashrc

fi

if [[ $PWD == */ipfs ]]; then
    export IPFS_PATH="${PWD%/}/config"
else
    export IPFS_PATH="${PWD%/}/ipfs/config"
fi

ipfs init
echo "IPFS initialised!"
ipfs bootstrap rm all
echo "Bootstrap networks cleared!"
