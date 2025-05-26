#!/bin/bash

readonly WORKING_DIR="$(pwd)"

create_color_theme() {
        while true; do
            read -p "Select the theme you and to create: light/dark/custom: " selected_theme
            case "$selected_theme" in light|dark|custom) break ;; *)
                echo "Invalid Theme. Please type 'light', 'dark', or 'custom'."
            ;;
            esac
        done

    while true; do
        read -p "Enter the primary color (e.g. RRGGBB[AA]): #" primary_color
        if [[ -z $primary_color ]]; then
            echo "Primary color required."
        elif [[ $primary_color =~ ^[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$ ]]; then
            break
        else
            echo "Invalid format."
        fi
    done

    while true; do
        read -p "Enter the secondary color (e.g. RRGGBB[AA]): #" secondary_color
        if [[ -z $secondary_color ]]; then
            echo "Secondary color required."
        elif [[ $primary_color =~ ^[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$ ]]; then
            break
        else
            echo "Invalid format."
        fi
    done

    scss_file="$WORKING_DIR/webapp/src/styles/palettes/_custom.scss"

    if [[ ! -f $scss_file ]]; then
        echo "Error: '$scss_file' not found."
        exit 1
    fi

    if [[ ! -w $scss_file ]]; then
        echo "Error: '$scss_file' - no write permissions."
        exit 1
    fi

    cp "$scss_file" "${scss_file}.bak"
    if [[ $? -ne 0 ]]; then
        echo "Error: Failed to create a backup file."
        exit 1
      else
        echo "Backup created: ${scss_file}.bak"
    fi

    sed -i -E \
        -e "s/^\s*(\$color-primary:\s*)#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?;/\1$primary_color;/" \
        -e "s/^\s*(\$color-secondary:\s*)#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?;/\1$secondary_color;/" \
        "$scss_file"

    if [[ $? -ne 0 ]]; then
        echo "Error: Failed to update new themes."
        mv "${scss_file}.bak" "$scss_file"
        echo "Original file restored."
        exit 1
    fi

    echo "Color themes updated!"

        rm -f "${scss_file}.bak"
    if [[ $? -eq 0 ]]; then
        echo "Backup deleted: ${scss_file}.bak"
    else
        echo "Warning: Failed to delete backup: ${scss_file}.back"
    fi
}

create_color_theme