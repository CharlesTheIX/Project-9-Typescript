#!/bin/bash

readonly WORKING_DIR="$(pwd)"
RED="\033[31m"
BLUE="\033[34m"
GREEN="\033[32m"
YELLOW="\033[33m"
RESET="\033[0m"

restore_color_themes() {
  echo ""
  theme_array=("light" "dark" "custom")

  for item in "${theme_array[@]}"; do
    primary_color="#000000"
    secondary_color="#FFFFFF"

    if [[ "$item" == "light" ]]; then
      primary_color="#f3f3e0"
      secondary_color="#183b4e"
    fi

    if [[ "$item" == "dark" ]]; then
      primary_color="#222831"
      secondary_color="#dfd0b8"
    fi

    scss_file="$WORKING_DIR/webapp/src/styles/palettes/_$item.scss"
    cat > "$scss_file" <<EOF \$color-primary: $primary_color; \$color-secondary: $secondary_color;
EOF

    echo ""
    echo -e "${GREEN}${item} updated!${RESET}"
    echo ""
  done
}

restore_color_themes