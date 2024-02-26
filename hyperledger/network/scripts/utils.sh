function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $PEERPEM)
    local CP=$(one_line_pem $CAPEM)
    sed -e "s/\${ORG}/$ORG/" \
        -e "s/\${ORG_DOMAIN}/$ORG_DOMAIN/" \
        -e "s/\${ORG_PORT}/$ORG_PORT/" \
        -e "s/\${CA_PORT}/$CA_PORT/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.json > ./connection-profile/json/connection-${ORG}.json
}

function yaml_ccp {
    local PP=$(one_line_pem $PEERPEM)
    local CP=$(one_line_pem $CAPEM)
    sed -e "s/\${ORG}/$ORG/" \
        -e "s/\${ORG_DOMAIN}/$ORG_DOMAIN/" \
        -e "s/\${ORG_PORT}/$ORG_PORT/" \
        -e "s/\${CA_PORT}/$CA_PORT/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.yaml | sed -e $'s/\\\\n/\\\n          /g' > ./connection-profile/yaml/connection-${ORG}.yaml
}

function refresh_path() {
    [ ! -d "./connection-profile/json" ] && mkdir -p "./connection-profile/json"
    [ ! -d "./connection-profile/yaml" ] && mkdir -p "./connection-profile/yaml"
}

function create_ccp {
    refresh_path

    json_ccp
    yaml_ccp
}
