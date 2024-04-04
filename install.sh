echo "Updating & Upgrading...\n\n"
sudo apt update -y && apt upgrade -y

echo "Basic Installation...\n\n"
sudo apt-get install \
    git \
    ca-certificates \
    curl \
    gnupg \
    docker \
    docker.io \
    python3-pip -y

echo "Code Install...\n\n"
sudo snap install code

echo "Docker Install...\n\n"
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"

echo "nvm Install...\n\n"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm install 18.17.0
nvm use 18.17.0
npm i -g docker-compose

sudo apt-get install libltdl-dev -y

echo "Hyperledger Install..."
curl -sSLO https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh && chmod +x install-fabric.sh
./install-fabric.sh b d

# sudo reboot
