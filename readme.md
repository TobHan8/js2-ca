# Cackle - Social Media Application

This is the code repository for the course assignments in JavaScript 2 and CSS Frameworks, in year 2 of Frontend Development studies at Noroff School of Technology and Media.
Cackle is the front end of a social media application built on the Noroff API. Users can register, log in, create, edit and delete their own posts, search through posts and follow other users.

- **Technical report and reflections, JavaScript 2 (PDF):** [docs/js2-technical-report-and-reflection.pdf](docs/js2-technical-report-and-reflection.pdf)
- **Technical report and reflections, CSS Frameworks (PDF):** [docs/css-frameworks-technical-report-and-reflection.pdf](docs/css-frameworks-technical-report-and-reflection.pdf)
- **AI log:** [AI_LOG.md](AI_LOG.md)

## Branches

| Branch | Content |
|---|---|
| `main` | The JavaScript 2 course assignment, as submitted |
| `css-frameworks-ca` | The CSS Frameworks course assignment, as submitted. Branched off `main`, styled with Bootstrap and Sass |
| `improvements` | This branch. Builds on `css-frameworks-ca` and continues development after submission |

### Changes in this branch

- Technical reports for both assignments added to the `docs` folder
- Responsive profile page (in progress)

## Main features

- Cackle - Social media platform application built on Noroff's Social API
- User registration, log in and log out features with Noroff's Auth API
- Create, edit and delete your own posts
- View all posts in a feed, and single posts with comments
- View your own profile, and the profiles and posts of other users
- Follow and unfollow other users
- Search through all posts, with debounced input
- Single page application with hash routing
- Custom header component
- Bootstrap as CSS framework, Sass for compiling of stylesheets. Combined for consistent styling and responsive layout
- JSDoc annotations on key functions
- AI log documenting how I used AI to understand problems and learn new concepts, like hash routing
- Thorough technical reports with reflections for both assignments - see [Documentation](#documentation)

## Getting started

### Prerequisites

- Code editor
- Web browser
- Node.js and npm (only needed to compile stylesheets. Everything is developed and tested on Node.js v25.7.0)

### Running the project

This is a fictional social media platform for educational purposes. No real users or personal data are tied to this project.

Use the Live Server extension or similar to serve the project in the browser from your code editor.
The compiled stylesheet is included in the repository, so the project runs without installing anything.

### Compiling stylesheets

Install the dependencies first:

```bash
npm install
```

Compile all stylesheets once:

```bash
npm run build
```

Compile stylesheets on every change/save automatically (use this when developing):

```bash
npm run watch
```

### Creating a test account

The Noroff Social API only gives access to logged-in users, so you need an account to use the application.

Anyone can register and log in to a new account. It doesn't need to be an actual Noroff email address; it just needs to end with `@stud.noroff.no`.

It is recommended to use mock data or fictional information when you are creating username, email and password. Don't use a password you use in real-world applications. It's recommended to use `12345678` as password.

1. Navigate to the register page
2. Fill out the form. The username can only contain letters, numbers and underscores, and the password must be at least 8 characters.
3. Log in with your newly registered credentials
4. Now you can view the feed, create posts and follow other users

## Stylesheet organization and structure

- `styles.scss` - Serves as an entry point to load Bootstrap and other partial stylesheets
- `_variables.scss` - Common values for styling and design to be passed to Bootstrap
- `_mixins.scss` - Reusable combinations of styles, for example custom pill button design
- `_typography.scss` - Styling rules related to text
- `_components.scss` - Styling rules related to interactive components
- `_layouts.scss` - Styling rules related to layout, containers and page structure
- `styles.css` - File for compiled output. This is the only stylesheet that gets linked in HTML

## Documentation

- [Technical report and reflections, JavaScript 2 (PDF)](docs/js2-technical-report-and-reflection.pdf)
- [Technical report and reflections, CSS Frameworks (PDF)](docs/css-frameworks-technical-report-and-reflection.pdf)
- [AI log](AI_LOG.md)

## Technologies

- JavaScript (ES6 modules)
- HTML
- CSS
- Bootstrap
- Sass
- npm
- Font Awesome (icons)
- [Noroff API v2](https://docs.noroff.dev/docs/v2): [Auth](https://docs.noroff.dev/docs/v2/auth/register), [Posts](https://docs.noroff.dev/docs/v2/social/posts) and [Profiles](https://docs.noroff.dev/docs/v2/social/profiles) endpoints

## Assignment briefs

<details>
<summary>JavaScript 2 course assignment - brief copied from Noroff's Moodle platform</summary>

### Goal of the assignment

The goal is to plan, build, and deliver a functional front-end social media application using JavaScript, while demonstrating the required learning outcomes in knowledge, skills, and general competence.

### Learning outcomes

Upon successful completion, you will demonstrate your ability to:

- Apply JavaScript to build a working front-end application.
- Implement API-based CRUD functionality.
- Structure code using ES6 modules.
- Test and debug application features.
- Explain and reflect on their development decisions.

### Instructions

#### Description

In this assignment, you will build the front end of a social media application using JavaScript and a provided API. The application must allow users to register, log in, view posts, and perform CRUD operations on their own posts. It must also include features such as viewing profiles, following or unfollowing users, commenting on posts, and reacting to a post with an emoji.

- You must make use of ES6 modules.
- At least 3 functions must have JSDoc annotations.
- You must deploy your app to GitHub Pages, Netlify or Vercel.
- Basic UI must be in place at the very least.
- You must create a README.md with details on how to run your project.

#### Technical Requirements

You must follow the tech stack exactly unless this brief explicitly says otherwise.

- Language: JavaScript
- Frameworks: Strictly no front-end frameworks like React, Vue or Angular can be used.
- Modules: ES6 modules required
- Deployment: GitHub Pages, Netlify, or Vercel
- Documentation: README and JSDoc on at least three functions
- CSS and UI: The application must only include basic styling.
- API: Access [Noroff's API documentation](https://docs.noroff.dev/docs/v2).

#### Resources

Many of the endpoints in this assignment are authenticated endpoints. You will need to use the [Noroff Auth endpoints](https://docs.noroff.dev/docs/v2/auth/register) to register and log in users.

For functionality related to the Social Media application, you will need to make use of the following endpoints:

- [Posts](https://docs.noroff.dev/docs/v2/social/posts)
- [Profiles](https://docs.noroff.dev/docs/v2/social/profiles)

#### Functional Requirements

**Required core features**

All the following features and user stories are required to be completed for you to pass this assignment:

| Feature | Description |
|---|---|
| Register new user | As a user, I can register a new user on the register user page. |
| Login user | As a user, I can login as a registered user on the login user page. |
| Get all posts | As a user I can view all the posts on the feed page. |
| Get post | As a user, I can view a single post when clicking on a post in the feed. |
| Create post | As a user, I can create a single post. |
| Edit post | As a user, I can edit my own post(s). |
| Delete post | As a user, I can delete my own post(s). |
| Get posts of a user | As a user, I can view all the posts of a different user. |
| Follow / Unfollow user | As a user, I can follow/unfollow other users. |
| Search posts | As a user, I can search through posts using a search bar. |
| View my own profile | As a user I can view my own profile. |

**Additional group-work features**

If the assignment is completed in pairs, you will need to complete the additional user stories:

- Comment on a post
- Reply to a comment
- React to a post with an emoji

#### Required Pages

The application must include at least these pages:

- Login page
- Register page
- Posts/feed page
- Individual post page
- User's own profile page

#### Process

1. Create your repository.
2. Clone the repository to your computer.
3. Use GitHub Projects to keep track of your project.
4. Implement the stories and features.
5. Commit regularly and push your work using meaningful commit messages.
6. Test your work, track, and process bugs in the Issues tab.

</details>

<details>
<summary>CSS Frameworks course assignment - brief copied from Noroff's Moodle platform</summary>

### Goal of the assignment

Apply your knowledge of Tailwind or Bootstrap with SASS to build a responsive front-end for a social media application. You will do this by either styling an existing project or creating a new interface, while following best practices for project structure and workflow.

### Learning outcomes

Upon successful completion, you will demonstrate:

- Assess and implement code from CSS framework documentation
- Plan and build digital solutions that work across different screen sizes
- Organise and structure stylesheets correctly
- Find, evaluate, and apply information about new versions of a CSS framework and related tools in your own projects.

### Instructions

#### Option 1

Style your JS2 CA with either Tailwind or Bootstrap and SASS.

- Style at least 3 pages of your JS2 CA.
- One of the pages must include a form with HTML validation.
- Install and use the npm packages for the library (Bootstrap with Sass or Tailwind) you choose. Don't use CDN links.
- Ensure package.json includes scripts for both development and production. The development script should include the --watch flag.
- Work on a branch called css-frameworks branched off your JS2 CA branch.

</details>

## Author

[tobhan8](https://github.com/TobHan8) - Tobias Hanevik
