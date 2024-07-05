### Team 4416

Notewiz Development Team

## Iteration 02

- **Start Date:** 2024-06-24
- **End Date:** 2024-07-05

## Process

Process Overview:
- Adopt Agile development methodology with weekly sprints
- Daily stand-up meetings
- Task management using a task board

#### Changes from Previous Iteration
1. **Introduction of Code Reviews:**
   - **Reason:** To improve code quality and facilitate knowledge sharing among team members.
   - **Success Metric:** Number of bugs/issues found post-merge.

2. **Weekly Demo Meetings:**
   - **Reason:** To ensure all stakeholders are aware of progress.
   - **Success Metric:** Feedback and approval rate from stakeholders.

3. **Integration of Automated Testing:**
   - **Reason:** To catch bugs early in the development cycle.
   - **Success Metric:** Reduction in the number of bugs found during manual testing.

#### Roles and Responsibilities
- **Project Manager:** Oversees the project, manages the schedule, ensures milestones are met.
- **Front-end Developer:** Develops the user interface and user experience parts of the application.
- **Back-end Developer:** Manages server-side logic, database interactions, and API integration.
- **QA Engineer:** Tests the application for bugs and ensures product quality.

#### Events
- **Daily Stand-up:**
  - **Time:** Every day at 10 AM
  - **Location:** Online, via Zoom
  - **Purpose:** Discuss what was done yesterday, plans for today, and any obstacles encountered.

- **Weekly Sprint Planning:**
  - **Time:** Every Monday at 9 AM
  - **Location:** Online, via Zoom
  - **Purpose:** Plan the tasks for the upcoming week.

- **Weekly Demo Meeting:**
  - **Time:** Every Friday at 4 PM
  - **Location:** Online, via Zoom
  - **Purpose:** Demonstrate the week's progress to stakeholders.

#### Artifacts
- **Task Board:** Used to manage and prioritize tasks.
- **To-do List:** Helps track the work that needs to be completed.
- **Schedule:** Records important dates and deadlines.
- **Documentation:** Includes project documentation and meeting notes.

#### Git / GitHub Workflow
- **Branch Strategy:** Create feature branches from the main branch.
- **Pull Requests:** Feature branches are merged into the main branch via pull requests.
- **Code Review:** Each pull request must be reviewed by at least one other team member.
- **Merging:** Only the project manager or a senior developer can merge pull requests after approval.

## Product

#### Goals and Tasks
1. **Implement Flashcard Sync with Database:**
   - **Tasks:**
     - Set up flashcard database schema
     - Implement CRUD operations backend API for flashcards
     - Integrate the front-end with the backend API to achieve sync
     - Test the sync functionality

2. **Improve User Interface:**
   - **Tasks:**
     - Redesign the flashcard creation form
     - Add navigation buttons with material icons
     - Implement responsive design for mobile devices
     - Test UI on different screen sizes

3. **Add User Authentication:**
   - **Tasks:**
     - Set up authentication using JWT
     - Implement login and registration forms
     - Protect routes that require authentication
     - Test the authentication flow

#### Artifacts
- **Database Schema:** Defines the structure of flashcards in the database.
  - **Purpose:** Efficiently store and manage user flashcards.
- **API Documentation:** Describes the endpoints for flashcard CRUD operations.
  - **Purpose:** Guide front-end developers for backend integration.
- **Mockups and UI Design:** Visual representation of new UI elements.
  - **Purpose:** Provide a clear design reference for developers.
- **Test Cases:** Written scenarios to test new functionalities.
  - **Purpose:** Ensure all functionalities work as expected.