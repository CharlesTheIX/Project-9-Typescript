# Project 9 - Typescript | Webapp | NextJS

_Authors[s]: CharlesTheIX_

**[Root Documentation](../ReadMe.md)**

## Set-up

This project uses `Yarn` as its package manager. This needs to be installed and available.

The following scripts are available to you via the `yarn` command:

```bash
  #  Boot up the application environment
  yarn boot

  # Clean up the project's ./node_modules ./.next and ./yarn.lock for a clean install
  yarn clean

  # Install the project dependencies
  yarn install

  # Start the application locally in development mode
  yarn dev

  # Build the application
  yarn build

  # Start the built application
  yarn start

  # Analyze the application bundles
  yarn analyze

```

## Overview

Overview

## File Structure

- [./.env.local](#envlocal)
- [./public](#public)
- [./src](#src)
  - [./app](#app)
  - [./components](#components)
  - [./contexts](#contexts)
  - [./data](#data)
  - [./functions](#functions)
  - [./pages](#pages)
  - [./styles](#styles)
  - [./globals.ts](#globalsts)
  - [./middleware.ts](#middlewarets)
  - [./types.d.ts](#typesdts)

#### **`.env.local`**

This file contains the environment variables for the application.

If this file does not exist for you then _rename_ [.env.example](./.env.example) to _.env.local_ and update the variable values.

#### **`public/`**

This directory contains all of the application assets that are available on the client: images, icons stc.

#### **`src/`**

This directory contains the source code for the application:

- #### **`app/`**

  The directory contains the route layout of the application, containing the api, admin, public and user routes.

  The _page.tsx_ files that are children of the _app directory_ should handle any conditional page rendering data fetching, metadata and the main server-side connectivity.

  There should be no client components in this directory.

  - **`(public)/`**

    Contains files / routes that are available to all traffic.

  - **`(user)/`**

    Contains files / routes that are available to users that are signed in.

  - **`admin/`**

    Contains files and routes that are available to signed in admin users.

  - **`api/`**

    Contains files the make calls the external [API](../api/ReadMe.md).

    These routes are designed to be proxies that the internal application calls as endpoints in place of calling the API directly.

  - **`layout.tsx`**

    This is the root layout of the application and contains the wrapper and default meta data for the application.

  - **`not-found.tsx`**

    This is the page that is used when a route is not found or when the not found function is called by the navigator.

    (The 404 page).

  - **`page.tex`**

    This file is the root or homes page of the application.

- #### **`components/`**

  This directory contains the components for the application.

  Collections of components are within their collection directory and any standalone components are in the root of this directory.

  These files will mostly be client components used within the other components and pages.

- #### **`contexts/`**

  This directory contains the contexts of the application.

  These contexts are used to keep data in memory whilst the user navigates through the application.

  In addition to this contexts are used to update states that application wide, not just within the component.

- #### **`data/`**

  This directory contains data for pages and components, such as table, tab and navigation data.

- #### **`functions/`**

  This directory contains functions that are used within the client, these functions are used throughout the application

- #### **`pages/`**

  This directory contains the layouts of the pages that are used by the _page.tsx_ files within the _app directory_.

  These pages are constructed using the components.

- #### **`styles/`**

  This directory contains files surrounding the styling of the application, including the component styling, fonts and color themes.

- #### [**`globals.ts`**](./src/globals.ts)

  This files contains variables that are used throughout the application.

- #### [**`middleware.ts`**](./src/middleware.ts)

  This file controls the routing of the application, handling route authentication and role checks.

- #### [**`types.d.ts`**](./src/types.d.ts)

  This file contains all the shared types for the application.

  Some of these types are shared with the relative [API types.d.ts](../api/src/types.d.ts) and should be kept in sync where appropriate.
