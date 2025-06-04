#!/bin/bash

readonly WORKING_DIR="$(pwd)"
SCSS_FILE="$WORKING_DIR/webapp/src/styles/_themes.scss"
RED="\033[31m"
BLUE="\033[34m"
GREEN="\033[32m"
YELLOW="\033[33m"
RESET="\033[0m"

restore_color_themes() {
  echo ""

  local LIGHT_PRIMARY_COLOR="#f3f3e0"
  local LIGHT_SECONDARY_COLOR="#183b4e"

  local DARK_PRIMARY_COLOR="#222831"
  local DARK_SECONDARY_COLOR="#dfd0b8"

  local CUSTOM_PRIMARY_COLOR="#a02334"
  local CUSTOM_SECONDARY_COLOR="#ffeead"

  cat > "$SCSS_FILE" <<EOF
\$themes: (
  dark: (
    color-primary: $DARK_PRIMARY_COLOR,
    color-secondary: $DARK_SECONDARY_COLOR
  ),
  light: (
    color-primary: $LIGHT_PRIMARY_COLOR,
    color-secondary: $LIGHT_SECONDARY_COLOR
  ),
  custom: (
    color-primary: $CUSTOM_PRIMARY_COLOR,
    color-secondary: $CUSTOM_SECONDARY_COLOR
  ),
);
EOF

  echo ""
  echo -e "${GREEN}Themes reset to defaults!${RESET}"
  echo ""
}

restore_color_themes