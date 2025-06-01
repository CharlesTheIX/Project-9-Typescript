#!/bin/bash

readonly WORKING_DIR="$(pwd)"
RED="\033[31m"
BLUE="\033[34m"
GREEN="\033[32m"
YELLOW="\033[33m"
RESET="\033[0m"

init() {
  local current_dir=$WORKING_DIR
  local app_dirs_array=("api" "webapp" "cli")
  local script_files_array=("create_color_theme.sh" "restore_color_themes.sh" "create_component.sh")

  echo ""
  echo "Updating script modes"

  for item in "${script_files_array[@]}"; do
    if [[ ! -f "$current_dir/.scripts/$item" ]]; then
      echo ""
      echo "Could not find file: $current_dir/.scripts/$item"
    else
      chmod +x "$current_dir/.scripts/$item"
    fi
  done

  for item in "${app_dirs_array[@]}"; do
    current_dir="$WORKING_DIR/$item"
    cd "$current_dir"

    echo ""
    echo "Setting up: $item"
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