### Notewiz
### created by: 4416

Table of Contents
1. Product Description
2. Motivation
3. Installation
4. Getting Started with NoteWiz
5. Contribution
6. License

### Product Description
Notewiz is a note-taking application that helps users record, organize, and review their notes. Users can sign in to the web application through a browser. Designed to improve organization and productivity, Notewiz supports many unique features such as search, Markdown Editor, flashcards, Mind-Map, and multi-tab functionality. Notewiz also offers note-sharing and commenting tools in order to facilitate collaborative efforts.

### Motivation
The motivation behind Notewiz stems from the need for an efficient and user-friendly note-taking solution tailored specifically for university students, researchers, and professionals. It aims to solve the problem of scattered and disorganized notes, providing a centralized platform for users to take, organize, and retrieve notes easily.


### Installation
To run Notewiz, you will need the following tools:
Node.js
npm (Node Package Manager)


Installation Steps:
Install Node.js on Windows:
1. Open Terminal.
```
# installs fnm (Fast Node Manager)
winget install Schniz.fnm

# download and install Node.js
fnm use --install-if-missing 20

# verifies the right Node.js version is in the environment
node -v # should print `v20.14.0`

# verifies the right NPM version is in the environment
npm -v # should print `10.7.0`
```

Install Node.js on macOS
1. Open Terminal.
```
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# download and install Node.js (you may need to restart the terminal)
nvm install 20

# verifies the right Node.js version is in the environment
node -v # should print `v20.16.0`

# verifies the right npm version is in the environment
npm -v # should print `10.8.1`
```

Install Node.js on Linux (Ubuntu/Debian):

1. Open Terminal.
```
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# download and install Node.js (you may need to restart the terminal)
nvm install 20

# verifies the right Node.js version is in the environment
node -v # should print `v20.16.0`

# verifies the right npm version is in the environment
npm -v # should print `10.8.1`
```
### Getting Started with NoteWiz
After installing Node.js, follow these steps to run the NoteWiz application:
#### 1. Clone or Download NoteWiz:
- If you haven't already downloaded the NoteWiz repository, clone it from your version control system or download the source files to your local machine.
#### 2. Navigate to the NoteWiz Directory:
-    Open your terminal or command prompt.
-    Change to the directory where NoteWiz has been downloaded or cloned:
`cd path/to/notewiz`
#### 3. Start the Application:
##### Front End
- `cd client`
- `npm update`
-    Run the following command to start the NoteWiz application:
`npm start`
-    This command will compile the application and start a front end local server. Once the server is running, you can access the application through your web browser at the address indicated in the terminal (typically `http://localhost:3000`).
##### Back End
- if you in the path `path/to/notewiz/client`, use `cd ..` to move up to the parent directory
- `cd server`
- `npm update`
-    Run the following command to start the NoteWiz application:
`node index.js`
-    This command will compile the application and start a back end local server. Once the server is running, you can access the application logically.

### Contribution
We welcome contributions to Notewiz! To contribute, follow these steps:

1. Fork the repository: Click on the "Fork" button at the top right corner of the repository page.

2. Clone your fork:
    git clone https://github.com/yourusername/notewiz.git

3. Create a new branch:
    git checkout -b feature/your-feature-name

4. Commit your changes:
    git commit -m 'Add some feature'

5. Push to the branch:
    git push origin feature/your-feature-name

6. Create a Pull Request: Go to the original repository and click on "New Pull Request".

Branch Naming Convention:
feature/branch-name for new features
bugfix/branch-name for bug fixes
hotfix/branch-name for critical fixes
Issue Tracking:
We use GitHub issues to track bugs and feature requests. You can submit a new issue here.

Pull Requests:
Pull requests are welcome. Please ensure your code passes the linting and test checks before submitting.

### License
[MIT](https://github.com/UofT-UTSC-CS-sandbox/final-term-project-4416/blob/main/LICENSE)
