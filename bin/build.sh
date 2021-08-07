#!/usr/bin/env bash

GREEN='\033[0;32m'

NC='\033[0m' # No Color

declare -a services=("layers" "aws-service")


for i in "${services[@]}"

do

    echo "$i"

    cd ./services/"$i"

    pwd

    echo -e "${GREEN}Start install $i${NC}"

    bin/install.sh

    echo -e "${GREEN}End install $i${NC}"

    echo -e "${GREEN}Start build $i${NC}"

    bin/build.sh

    echo -e "${GREEN}End build $i${NC}"

    cd ../../

done