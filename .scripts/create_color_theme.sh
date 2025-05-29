#!/bin/bash

readonly WORKING_DIR="$(pwd)"
scss_file="$WORKING_DIR/webapp/src/styles/_themes.scss"
RED="\033[31m"
BLUE="\033[34m"
GREEN="\033[32m"
YELLOW="\033[33m"
RESET="\033[0m"

[[ -f "$scss_file" ]] && cp "$scss_file" "$scss_file.bak"

update_theme() {
  local theme="$1"
  local primary="$2"
  local secondary="$3"
  local temp_file="${mktemp}"

  awk -v theme="$theme" -v primary="$primary" -v secondary="$secondary" '
    BEGIN { in_theme = 0 }
    {
      if ($0 ~ "^[[:space:]]*" theme ": *\\(") {
        print "  " theme ": ("
        print "    color-primary: " primary ","
        print "    color-secondary: " secondary
        print "  ),"
        in_theme = 1
        next
      }
      if (in_theme && $0 ~ /^[[:space:]]*\),/) {
        in_theme = 0
        next
      }
      if (!in_theme) print $0
    }
  ' "$scss_file" > "$tmp_file"

  mv "$tmp_file" "$scss_file"
}

create_color_theme() {
  echo ""
   local theme_array=("light" "dark" "custom")

  while true; do
    read -p "Select the theme you want to create: light/dark/custom/all: " selected_theme
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

    update_theme "$item" "$primary_color" "$secondary_color"

    echo ""
    echo -e "${GREEN}${item} updated!${RESET}"
    echo ""
  done
}

create_color_theme