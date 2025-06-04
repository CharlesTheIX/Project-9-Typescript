#!/bin/bash

readonly WORKING_DIR="$(pwd)"
SCSS_FILE="$WORKING_DIR/webapp/src/styles/_themes.scss"
RED="\033[31m"
BLUE="\033[34m"
GREEN="\033[32m"
YELLOW="\033[33m"
RESET="\033[0m"

[[ -f "$SCSS_FILE" ]] && cp "$SCSS_FILE" "$SCSS_FILE.bak"

update_theme() {
  local THEME="$1"
  local PRIMARY="$2"
  local SECONDARY="$3"
  local TEMP_FILE="${mktemp}"

  awk -v theme="$THEME" -v primary="$PRIMARY" -v secondary="$SECONDARY" '
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
  ' "$SCSS_FILE" > "$TMP_FILE"

  mv "$TMP_FILE" "$SCSS_FILE"
}

create_color_theme() {
  echo ""
   local THEME_ARRAY=("light" "dark" "custom")

  while true; do
    read -p "Select the theme you want to create: light/dark/custom/all: " selected_theme
    case "$SELECTED_THEME" in light|dark|custom|all) break ;; *)
      echo -e "${RED}Invalid Theme. Please type 'light', 'dark', or 'custom'.${RESET}"
      echo ""
    ;;
    esac
  done

  if [[ "$SELECTED_THEME" != "all" ]]; then
    THEME_ARRAY=("$SELECTED_THEME")
  fi

  for ITEM in "${THEME_ARRAY[@]}"; do
    while true; do
      read -p "${ITEM} primary color (e.g. #RRGGBB[AA]):" PRIMARY_COLOR

      if [[ -z $PRIMARY_COLOR ]]; then
        echo -e "${RED}${ITEM} primary color required.${RESET}"
        echo ""
      elif [[ $PRIMARY_COLOR =~ ^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$ ]]; then
        break
      else
        echo -e "${RED}Invalid format.${RESET}"
        echo ""
      fi
    done

    while true; do
      read -p "${ITEM} secondary color (e.g. #RRGGBB[AA]):" secondary_color

      if [[ -z $SECONDARY_COLOR ]]; then
        echo -e "${RED}${ITEM} secondary color required.${RESET}"
        echo ""
      elif [[ $SECONDARY_COLOR =~ ^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$ ]]; then
        break
      else
        echo -e "${RED}Invalid format.${RESET}"
        echo ""
      fi
    done

    update_theme "$ITEM" "$PRIMARY_COLOR" "$SECONDARY_COLOR"

    echo ""
    echo -e "${GREEN}${ITEM} updated!${RESET}"
    echo ""
  done
}

create_color_theme