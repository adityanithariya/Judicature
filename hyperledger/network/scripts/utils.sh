function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $PEERPEM)
    local CP=$(one_line_pem $CAPEM)
    sed -e "s/\${ORG}/$ORG/" \
        -e "s/\${ORG_DOMAIN}/$ORG_DOMAIN/" \
        -e "s/\${ORG_PORT}/$ORG_PORT/" \
        -e "s/\${CA_NAME}/${ORG,,}/" \
        -e "s/\${CA_PORT}/$CA_PORT/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.json > ./connection/json/connection-${ORG}.json
}

function yaml_ccp {
    local PP=$(one_line_pem $PEERPEM)
    local CP=$(one_line_pem $CAPEM)
    sed -e "s/\${ORG}/$ORG/" \
        -e "s/\${ORG_DOMAIN}/$ORG_DOMAIN/" \
        -e "s/\${ORG_PORT}/$ORG_PORT/" \
        -e "s/\${CA_NAME}/${ORG,,}/" \
        -e "s/\${CA_PORT}/$CA_PORT/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.yaml | sed -e $'s/\\\\n/\\\n          /g'
}

function refresh_path() {
    [ ! -d "${1}connection/json" ] && mkdir -p "${1}connection/json"
    [ ! -d "${1}connection/yaml" ] && mkdir -p "${1}connection/yaml"
}

function create_ccp {
    if [[ $PROD == "prod" ]]; then
        CONNECTION_PATH="../../server/"
    else
        CONNECTION_PATH="./"
    fi

    refresh_path $CONNECTION_PATH

    json_ccp > ${CONNECTION_PATH}connection/json/connection-${ORG}.json
    yaml_ccp > ${CONNECTION_PATH}connection/yaml/connection-${ORG}.yaml
}
