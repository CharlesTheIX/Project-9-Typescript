#!/bin/bash

readonly WORKING_DIR="$(pwd)"
RED="\033[31m"
BLUE="\033[34m"
GREEN="\033[32m"
YELLOW="\033[33m"
RESET="\033[0m"

create_color_theme() {
  echo ""
  theme_array=("light" "dark" "custom")

  while true; do
    read -p "Select the theme you and to create: light/dark/custom: " selected_theme
    case "$selected_theme" in light|dark|custom|all) break ;; *)
      echo -e "${RED}Invalid Theme. Please type 'light', 'dark', or 'custom'.${RESET}"
      echo ""
    ;;
    esac
  done

  if [[ "$selected_theme" != "all" ]]; then
    theme_array=("$selected_theme")
  fi

  for item in "${theme_array[@]}"; do
    while true; do
      read -p "${item} primary color (e.g. #RRGGBB[AA]):" primary_color

      if [[ -z $primary_color ]]; then
        echo -e "${RED}${item} primary color required.${RESET}"
        echo ""
      elif [[ $primary_color =~ ^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$ ]]; then
        break
      else
        echo -e "${RED}Invalid format.${RESET}"
        echo ""
      fi
    done

    while true; do
      read -p "${item} secondary color (e.g. #RRGGBB[AA]):" secondary_color

      if [[ -z $secondary_color ]]; then
        echo -e "${RED}${item} secondary color required.${RESET}"
        echo ""
      elif [[ $secondary_color =~ ^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$ ]]; then
        break
      else
        echo -e "${RED}Invalid format.${RESET}"
        echo ""
      fi
    done

    scss_file="$WORKING_DIR/webapp/src/styles/palettes/_$item.scss"
    cat > "$scss_file" <<EOF \$color-primary: $primary_color; \$color-secondary: $secondary_color;
EOF

    echo ""
    echo -e "${GREEN}${item} updated!${RESET}"
    echo ""
  done
}

create_color_theme