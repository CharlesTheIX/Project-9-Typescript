#!/bin/bash

readonly WORKING_DIR="$(pwd)"
RED="\033[31m"
BLUE="\033[34m"
GREEN="\033[32m"
YELLOW="\033[33m"
RESET="\033[0m"

boot_up_webapp() {
  local CURRENT_DIR=$WORKING_DIR

  echo ""
  echo "Booting up the application..."

  echo ""
  echo -e "Running: ${GREEN}yarn clean${RESET}"
  yarn clean

  echo ""
  echo -e "Running: ${GREEN}yarn install${RESET}"
  yarn install
  
  echo ""
  echo -e "Running: ${GREEN}yarn build${RESET}"
  yarn build
  
  echo ""
  echo -e "Opening application in browser."
  open "http://localhost:3022"
  echo -e "Running: ${GREEN}yarn dev${RESET}"
  yarn dev

  echo ""
  echo -e "${GREEN}Boot-up webapp complete!${RESET}"
  echo ""
}

boot_up_webapp