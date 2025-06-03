# Project 9 - Typescript | API | Express | MongoDB

_Authors[s]: CharlesTheIX_

**[Root Documentation](../ReadMe.md)**

## Set-up

This project uses `Yarn` as its package manager. This needs to be installed and available.

The following scripts are available to you via the `yarn` command:

```bash
  # Clean up the project's ./node_modules ./dist and ./yarn.lock for a clean install
  yarn clean

```

## Overview

Overview

## File Structure

- [./.env.local](#envlocal)
- [./src](#src)
  - [./globals.ts](#globalsts)
  - [./types.d.ts](#typesdts)

#### **`.env.local`**

This file contains the environment variables for the application.

If this file does not exist for you then _rename_ [.env.example](./.env.example) to _.env.local_ and update the variable values.

#### **`src/`**

This directory contains the source code for the application:

- #### [**`globals.ts`**](./src/globals.ts)

  This files contains variables that are used throughout the application.

- #### [**`types.d.ts`**](./src/types.d.ts)

  This file contains all the shared types for the application.

  Some of these types are shared with the relative [API types.d.ts](../api/src/types.d.ts) and [CLI types.d.ts](../cli/src/types.d.ts) and should be kept in sync where appropriate.
