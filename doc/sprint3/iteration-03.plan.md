### Team 4416

Notewiz Development Team

## Iteration 3

* **Start date:** 2024-07-5
* **End date:** 2024-07-19

## Process

Quick Introduction to the process

#### Changes from previous iteration

List the most significant changes you made to your process (if any).

* **Increased Testing Frequency**: We will conduct daily testing instead of weekly to catch bugs early and ensure smoother integration of new features.
  * *Success Metric*: Reduction in the number of bugs found during the final testing phase by 50%.

* **Clearer Task Assignment**: Implementing a more detailed task assignment system using our task board to ensure every team member knows their specific responsibilities.
  * *Success Metric*: Decrease in task overlap and increase in individual accountability.

* **Regular Code Reviews**: Instituting bi-weekly code reviews to maintain code quality and improve team collaboration.
  * *Success Metric*: Reduced number of code issues and faster code integration.

#### Roles & responsibilities

Describe the different roles on the team and the responsibilities associated with each role.

* **Xuchen Zhang**: Frontend Developer, responsible for integrating the mind-map feature.
* **Lianhao Zhang**: Backend Developer, handles the server-side logic and database management.
* **Notch li**: Backend Developer, focuses on the UI/UX and client-side scripting.
* **Changze Wu**: Frontend Developer, responsible for testing and ensuring the quality of the application.

#### Events

Describe meetings (and other events) you are planning to have:

* **Daily Standup Meetings**: Online, every morning at 9 AM. Purpose: Quick updates on progress and blockers.
* **Weekly Sprint Review**: In-person, every Friday at 3 PM. Purpose: Review progress, demo new features, and plan for the next sprint.
* **Bi-weekly Code Reviews**: Online, every Wednesday at 5 PM. Purpose: Review code quality and share best practices.
* **Ad-hoc Coding Sessions**: Online, as needed. Purpose: Collaborative coding sessions to tackle complex issues.

#### Artifacts

List/describe the artifacts you will produce in order to organize your team.

* **Task Board**: Using Jira to track tasks, assign them to team members, and set priorities.
* **Meeting Notes**: Documenting decisions and action items from meetings to ensure everyone is on the same page.
* **GitHub Repository**: Centralized codebase where all team members push their code, ensuring version control and collaboration.

#### Git / GitHub workflow

Describe your Git / GitHub workflow.

* **Branching Strategy**: Each feature or bug fix is developed in its own branch, named `feature/[feature-name]` or `bugfix/[issue-name]`.
* **Pull Requests (PRs)**: All code changes are merged via pull requests. Each PR must be reviewed and approved by at least one other team member before merging.
* **Code Reviews**: Conducted during the bi-weekly code review meetings or asynchronously on GitHub.
* **Merging**: Once approved, the feature branch is merged into the `development` branch. The `main` branch is updated only after features are thoroughly tested in the `development` branch.
* **Continuous Integration**: Automated tests run on each pull request to catch issues early.

## Product

_This entire section is mandatory._

#### Goals and tasks

* **Mind-map Interface (SCRUM-89)**
  * Goal: Implement the user interface for the mind-map feature.
  * Tasks:
    1. Research and select a mind-map library.
    2. Design the UI components.
    3. Integrate the library.
    4. Test the interface.

* **Public Note Searching (SCRUM-95)**
  * Goal: Implement search functionality for public notes.
  * Tasks:
    1. Design search functionality.
    2. Implement backend logic.
    3. Integrate search into frontend.
    4. Test and validate.

* **Note->Flash-card Automation (SCRUM-90)**
  * Goal: Automate note conversion to flashcards.
  * Tasks:
    1. Define conversion logic.
    2. Implement automation script.
    3. Integrate with note-taking workflow.
    4. Test conversion process.

* **Note Shearing Service (SCRUM-91)**
  * Goal: Implement a note-sharing service.
  * Tasks:
    1. Design service architecture.
    2. Implement backend service.
    3. Integrate with frontend.
    4. Test functionality.

* **Note Merger (SCRUM-94)**
  * Goal: Implement note merging feature.
  * Tasks:
    1. Define merging criteria.
    2. Implement merge functionality.
    3. Integrate with the application.
    4. Test merging process.

* **Fix Flash Card Interface (SCRUM-98)**
  * Goal: Resolve issues in the flash card interface.
  * Tasks:
    1. Identify issues.
    2. Fix identified issues.
    3. Test updated interface.

* **Session Refactor (SCRUM-100)**
  * Goal: Refactor session management.
  * Tasks:
    1. Review current implementation.
    2. Redesign architecture.
    3. Implement new system.
    4. Test refactored management.

* **Note->Mind-map Automation (SCRUM-96)**
  * Goal: Automate note conversion to mind-maps.
  * Tasks:
    1. Define conversion logic.
    2. Implement automation script.
    3. Integrate with note-taking workflow.
    4. Test conversion process.

#### Artifacts

List/describe the artifacts you will produce in order to present your project idea.

* **Project Documentation**: Comprehensive documentation including system architecture, API specs, and user guides.
* **User Stories and Use Cases**: Detailed descriptions of user interactions and expected outcomes.
* **Mockups and Wireframes**: Visual representations of the UI/UX design.
* **Demo Videos**: Short videos demonstrating key features and workflows.
* **Codebase**: Well-structured, commented, and tested code in the GitHub repository.
* **Test Reports**: Detailed reports of test cases, results, and any identified issues.