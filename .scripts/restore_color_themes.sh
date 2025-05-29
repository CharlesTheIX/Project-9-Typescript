#!/bin/bash

readonly WORKING_DIR="$(pwd)"
scss_file="$WORKING_DIR/webapp/src/styles/_themes.scss"
RED="\033[31m"
BLUE="\033[34m"
GREEN="\033[32m"
YELLOW="\033[33m"
RESET="\033[0m"

restore_color_themes() {
  echo ""

  local light_primary_color="#f3f3e0"
  local light_secondary_color="#183b4e"

  local dark_primary_color="#222831"
  local dark_secondary_color="#dfd0b8"

  local custom_primary_color="#a02334"
  local custom_secondary_color="#ffeead"

  cat > "$scss_file" <<EOF
\$themes: (
  dark: (
    color-primary: $dark_primary_color,
    color-secondary: $dark_secondary_color
  ),
  light: (
    color-primary: $light_primary_color,
    color-secondary: $light_secondary_color
  ),
  custom: (
    color-primary: $custom_primary_color,
    color-secondary: $custom_secondary_color
  ),
);
EOF

  echo ""
  echo -e "${GREEN}Themes reset to defaults!${RESET}"
  echo ""
}

restore_color_themes