# CSS Frameworks Course Assignment branch

This is a branch from the main branch in the JavaScript 2 Course Assignment repository.
This branch has been developed for the course assignment in the Noroff FED 2 CSS frameworks course.
In this branch the original project is adapted and translated into the CSS framework Bootstrap with Sass.

## Main features

- Cackle - Social media platform application from JS2 CA
- Single page application with hash-routing 
- Custom header component
- Bootstrap as CSS framework, Sass for compiling of stylesheets. Combined for consistent styling and responsive layout

## Prerequisites

- Node.js (Unsure about exact version requirement. Everything is developed and tested on v25.7.0)
- npm

## Getting started

### Installation

npm install

### Running the project

Use live server extension or similar to serve project in browser

### Compiling stylesheets

Compile all stylesheets once:
```bash
npm run build
```

Compile stylesheets on every change/save automatically (Use this when developing):
```bash
npm run watch
```

## Stylesheet organization and structure

styles.scss - Serves as an entry point to load Bootstrap and other partial stylesheets

_variables.scss - Common values for styling and design to be passed to Bootstrap

_mixins.scss - Reusable combinations of styles, for example custom pill button design

_typography.scss - Styling rules related to text

_components - Styling rules related to interactive components

_layouts - Styling rules related to layout, containers and page structure

style.css - File for compiled output, this is the only stylesheet file that gets linked in HTML

## Technologies

- JavaScript
- HTML
- CSS
- Bootstrap
- Sass
- npm


## Author

tobhan8 - Tobias Hanevik
