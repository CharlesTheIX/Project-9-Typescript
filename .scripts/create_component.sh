#!/bin/bash

readonly WORKING_DIR="$(pwd)"
RED="\033[31m"
BLUE="\033[34m"
GREEN="\033[32m"
YELLOW="\033[33m"
RESET="\033[0m"

create_component() {
  echo ""

  read -p "Enter the component name: " FILENAME
  FILENAME = "$WORKING_DIR/$FILENAME.tsx"
  echo ""

  if [ -f "$FILENAME" ]; then
    echo "File '$FILENAME' already exists."
    echo ""
    read -p "Do you want to overwrite it? (y/n): " CONFIRM
    echo ""
    if [[ "$CONFIRM" != "y" && "$CONFIRM" != "Y" ]]; then
      echo "Operation canceled."
      echo ""
      return 1
    fi
  fi

  cat <<EOF > "$FILENAME"
type Props = {};

const $FILENAME: React.FC<Props> = (props: Props) => {
  const {} = props;

  return <></>;
}

export default $FILENAME

EOF

  echo ""
  echo "TypeScript file '$FILENAME' created with function '$FUNC_NAME'."
  echo ""
}

create_component
