#!/bin/bash

readonly WORKING_DIR="$(pwd)"
RED="\033[31m"
BLUE="\033[34m"
GREEN="\033[32m"
YELLOW="\033[33m"
RESET="\033[0m"

init() {
  local CURRENT_DIR=$WORKING_DIR
  local APP_DIRS_ARRAY=("api" "webapp" "cli")
  local SCRIPT_FILES_ARRAY=(
    "restore_color_themes.sh"
    "create_color_theme.sh"
    "boot_up_webapp.sh"
  )

  echo ""
  echo "Updating script modes"

  for iteM IN "${SCRIPT_FILES_ARRAY[@]}"; do
    if [[ ! -f "$CURRENT_DIR/.scripts/$ITEM" ]]; then
      echo ""
      echo "Could not find file: $CURRENT_DIR/.scripts/$ITEM"
    else
      chmod +x "$CURRENT_DIR/.scripts/$ITEM"
    fi
  done

  for ITEM in "${APP_DIRS_ARRAY[@]}"; do
    CURRENT_DIR="$WORKING_DIR/$ITEM"
    cd "$CURRENT_DIR"

    echo ""
    echo "Setting up: $ITEM"
    rm -rf "./node_modules" "./dist" "./yarn.lock" "./.next" && yarn

    if [[ ! -f "./.env.local" ]]; then
      echo ""
      echo "Creating local .env file."
      mv "./.env.example" "./.env.local"
    else
      echo ""
      echo "Removing example .env file."
      rm -rf "./.env.example"
    fi
  done

  echo ""
  echo -e "${GREEN}Set-up complete!${RESET}"
  echo ""
}

init