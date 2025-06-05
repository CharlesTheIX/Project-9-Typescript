import ApiTab from "./Tabs/ApiTab";
import CicdTab from "./Tabs/CicdTab";
import WebappTab from "./Tabs/WebappTab";
import DatabaseTab from "./Tabs/DatabaseTab";
import ServicesTab from "./Tabs/ServicesTab";
import InfrastructureTab from "./Tabs/InfrastructureTab";

export const webappTabCardData = [
  {
    title: "Webapp",
    content:
      "The frontend is built using modern web technologies to ensure performance, scalability, and a great developer experience. It uses a component-based architecture for maintainability and reusability across the project.",
  },
  {
    icon: "nextjs",
    title: "NextJS",
    documentationLink: "https://nextjs.org/docs",
    content:
      "Next.js is used as the React framework for this project, providing hybrid static and server rendering. routing, API support, and optimized performance out of the box.",
  },
  {
    icon: "typescript",
    title: "Typescript",
    documentationLink: "https://www.typescriptlang.org/docs/",
    content:
      "TypeScript adds static typing to JavaScript, helping catch bugs early and making the codebase more predictable and easier to maintain.",
  },
  {
    icon: "tailwind",
    title: "Tailwind-CSS",
    documentationLink: "https://tailwindcss.com/docs",
    content:
      "Tailwind CSS is used for utility-first styling, allowing for rapid UI development with a consistent design system and minimal custom CSS.",
  },
  {
    icon: "sass",
    title: "SASS",
    documentationLink: "https://sass-lang.com/documentation/",
    content:
      "Sass is used in conjunction with Tailwind for managing reusable style patterns and more complex styling logic, such as variables and mixins.",
  },
  {
    icon: "nodejs",
    title: "Node.js",
    documentationLink: "https://nodejs.org/en/docs/",
    content:
      "Node.js enables server-side JavaScript execution, providing the runtime environment needed for rendering and serving the frontend through Next.js.",
  },
];

export const apiTabCardData = [
  {
    title: "API",
    content:
      "The backend API is built to handle business logic, data processing, and secure communication between the frontend and database layers.",
  },
  {
    icon: "express",
    title: "Express",
    documentationLink: "https://expressjs.com/en/starter/installing.html",
    content:
      "Express.js is a minimal and flexible Node.js web application framework used to build the RESTful API layer for this application.",
  },
  {
    icon: "typescript",
    title: "Typescript",
    documentationLink: "https://www.typescriptlang.org/docs/",
    content:
      "The API is written in TypeScript to ensure strong typing, better code readability, and early detection of logic errors during development..",
  },
  {
    icon: "nodejs",
    title: "Node.js",
    documentationLink: "https://nodejs.org/en/docs/",
    content:
      "Node.js serves as the runtime for the backend server, allowing JavaScript code to run outside of the browser and interface with the database and other services",
  },
];

export const databaseTabCardData = [
  {
    title: "Database",
    content:
      "The project uses a NoSQL database to store application data such as user information, session tokens, and configuration settings.",
  },
  {
    icon: "mongodb",
    title: "MongoDB",
    documentationLink: "https://www.mongodb.com/docs/",
    content:
      "MongoDB provides a flexible schema and document-based storage system, ideal for rapidly evolving project structures and JSON-like data formats.",
  },
];

export const servicesTabCardData = [
  {
    title: "Services",
    content:
      "Various third-party and internal services are integrated to support authentication, notifications, and other essential features.",
  },
  {
    icon: "users",
    title: "Clerk",
    documentationLink: "https://clerk.com/docs",
    content:
      "Clerk is used to handle authentication and user management, providing a secure and developer-friendly interface for login, registration, and session handling.",
  },
];

export const ciCdTabCardData = [
  {
    title: "CI / CD",
    content:
      "Continuous Integration and Deployment ensure that code is automatically tested, built, and deployed whenever changes are pushed, improving reliability and development speed.",
  },
  {
    icon: "github",
    title: "Git, Github & Github Actions",
    documentationLink: "https://docs.github.com/en/actions",
    content:
      "Git is used for version control, GitHub hosts the repositories, and GitHub Actions automates testing, linting, and deployment pipelines.",
  },
  {
    icon: "docker",
    title: "Docker",
    documentationLink: "https://docs.docker.com/",
    content:
      "Docker is used to containerize the application, ensuring consistent environments across development, staging, and production.",
  },
];

export const infrastructureTabCardData = [
  {
    title: "Infrastructure",
    content:
      "The y layer is responsible for managing cloud resources, deployment environments, and system scalability using Infrastructure-as-Code principles.",
  },
  {
    icon: "aws",
    title: "AWS",
    documentationLink: "https://docs.aws.amazon.com/",
    content:
      "Amazon Web Services (AWS) provides the cloud infrastructure, including compute, storage, and networking services that power the entire stack.",
  },
  {
    icon: "terraform",
    title: "Terraform",
    documentationLink: "https://developer.hashicorp.com/terraform/docs",
    content:
      "Terraform is used for Infrastructure as Code (IaC), enabling repeatable, version-controlled provisioning of cloud resources and services on AWS.",
  },
];

export const techStackTabs: Tab[] = [
  {
    title: "Webapp",
    content: <WebappTab />
  },
  {
    title: "API",
    content: <ApiTab />
  },
  {
    title: "Database",
    content: <DatabaseTab />
  },
  {
    title: "Services",
    content: <ServicesTab />
  },
  {
    title: "CI / CD",
    content: <CicdTab />
  },
  {
    title: "Infrastructure",
    content: <InfrastructureTab />
  },
];
