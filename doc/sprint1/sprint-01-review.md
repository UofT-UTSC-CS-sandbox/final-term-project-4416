# NoteWiz / 4416

 > _Note: _ This document is meant to be written during (or shortly after) your review meeting, which should happen fairly close to the due date.      
 > _Suggestion: _ Have your review meeting a day or two before the due date. This way you will have some time to go over (and edit) this document, and all team members should have a chance to make their contribution.

## Iteration 01 - Review & Retrospect
 * When: June 12, 2024 / Wednesday
 * Where: Online / Discord meeting

## Process - Reflection
#### Short introduction:
We basically get familiar with the relevant tools we might use in the future such as MongoDB, Node.js. In the meanwhile, we also ensure implementing which features.

#### Decisions that turned out well
##### Adopting Agile Strategies：
###### Why it was successful:
>1. Implementing Agile Strategies, such as Scrum on Jira, significantly improved our team's ability to manage and deliver projects efficiently. By breaking projects into manageable sprints, the team could focus on smaller, achievable goals, leading to higher quality deliverables and increased team morale. Realize the recording of information through markdown related functions
###### Artifacts:
>1. Sprint backlogs and burndown charts.
>2. Periodically publish tasks on Jira and complete them within the specified time. [Jira Scrum](https://4416-notewiz.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog?atlOrigin=eyJwIjoid2FjIiwiaSI6IjgxNGQzMDZmNmUxYTRlMTU5NmY0ZGJkNjAyODFjMDg4In0%3D&cloudId=8ef22cce-f3df-4731-88cc-9986b13b3648)
##### Implementing Regular Retrospectives：
###### Why it was successful:
>1. Regular retrospectives were crucial for continuous improvement. These meetings provided a structured opportunity for us to reflect on what went well, what didn't, and how processes could be improved. This ongoing feedback loop helped to identify inefficiencies and implement changes that enhanced overall productivity and team satisfaction.
###### Artifacts:
>1. Recall every meeting notes and keep following the task requirement assigned in Discord meeting.！[Discord](1.png)
##### Prioritize the completion of basic application interface functions：
###### Why it was successful:
>1. Prioritizing the completion of basic application interface functions is significant because it ensures a solid foundation for user interaction and overall usability. Finishing the basic part also can ensure our web application performs reliably, reducing the risk of major issues in the future.
###### Artifacts:
>1. Implements a note creation form with a Markdown editor by React component, allowing users to enter a title and content and submit it to the server. [main scene CreatNode.js code](https://github.com/UofT-UTSC-CS-sandbox/final-term-project-4416/blob/main/notewiz/client/src/components/CreateNote.js)

#### Decisions that did not turn out as well as we hoped
##### Markdown Not Supporting Mathematical Symbols and Expressions：
###### Why it was not successful:
>1. We directly import markdown text editors on the web, but markdown itself does not support the writing of mathematical symbols. This situation requires us to find or create some patches, otherwise the originally intended user group will be changed. 
###### Artifacts:
>1. Documentation with embedded images of mathematical expressions.
##### Storing Notes Locally：
###### Why it was unsuccessful:
>1. The decision to store notes locally was made to simplify data management and avoid potential security concerns associated with cloud storage. However, this leads to fragmentation of information silos, making it harder for teams to stay consistent and share updates effectively.
###### Artifacts:
>1. Reports of inaccessible notes during remote working.

#### Planned changes

##### Migrating Note Storage to MongoDB Cloud

###### Reason for Change:
>1. The previous decision to store notes locally caused significant issues with accessibility, collaboration, and version control. By migrating to MongoDB cloud storage, we aim to centralize our data, ensuring that all team members can access the latest information from any location and device. This change will also enhance our ability to collaborate in real-time and maintain data integrity.

###### Benefits:
>1. Easier access for team members working from different places.
>2. Better teamwork with instant access to updated information.
>3. More reliable data with fewer version issues.

## Product - Review

#### Goals and/or tasks that were met/completed:


##### Implemented the function of recording notes using markdown language in the web interface
>1. Artifacts: [notewiz/client/src/components/CreateNote.js](https://github.com/UofT-UTSC-CS-sandbox/final-term-project-4416/blob/notesBrowser/notewiz/client/src/components/CreateNote.js)

##### Implemented the display and interaction of the basic interface
>1. Artifacts: [navigation sidebar](https://github.com/UofT-UTSC-CS-sandbox/final-term-project-4416/blob/notesBrowser/notewiz/client/src/components/Sidebar.js)


##### Implemented the function of user login and registration
>1. Artifacts: [Login & Sign up interface](https://github.com/UofT-UTSC-CS-sandbox/final-term-project-4416/tree/notesBrowser/notewiz/client/src/components/auth)

##### Implemented the function of batch management of files in the file manager interface
>1. Artifacts: [Note browser](https://github.com/UofT-UTSC-CS-sandbox/final-term-project-4416/blob/notesBrowser/notewiz/client/src/components/NoteBrowser.js)

##### Personal Profile
>1. Artifacts: [Profile interface](https://github.com/UofT-UTSC-CS-sandbox/final-term-project-4416/blob/notesBrowser/notewiz/client/src/components/Profile.js)

##### All back-end 
>1. Artifacts: [Back-end](https://github.com/UofT-UTSC-CS-sandbox/final-term-project-4416/blob/notesBrowser/notewiz/server/index.js)


#### Goals and/or tasks that were planned but not met/completed:

    Nothing

## Meeting Highlights

Going into the next iteration, our main insights are:

##### User interface optimization:
>1. Optimize the user interface by simplifying navigation, enhancing visual appeal, and ensuring consistency across different screens.

##### Implement flashcards and mind maps based on notes:
>1. Introducing features such as flashcards and mind maps based on notes improves the practicality of the application. Helps users to effectively summarize and visualize notes, thereby helping memory and understanding.
