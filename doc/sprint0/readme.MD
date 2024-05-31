Notewiz
created by: 4416

Table of Contents
Product Description
Motivation
Target Users
Why Choose Notewiz?
Installation
Contribution
Definition of Done
Key Decisions & Insights
Resources
Product Description
Notewiz is a note-taking application that helps users record, organize, and review their notes. Users can sign in to the web application through a browser. Designed to improve organization and productivity, Notewiz supports many unique features such as search, flashcards, and multi-tab functionality. Notewiz also offers note sharing and commenting tools in order to facilitate collaborative efforts.

Motivation
The motivation behind Notewiz stems from the need for an efficient and user-friendly note-taking solution tailored specifically for university students, researchers, and professionals. It aims to solve the problem of scattered and disorganized notes, providing a centralized platform for users to take, organize, and retrieve notes easily.

Target Users
We target the following user groups:

Students: who take notes from class and later organize and review them.
Researchers: who record, organize, and share experimental data.
Professionals: who manage meeting notes and other tasks.
See personas.pdf for specific personas.

Why Choose Notewiz?
Certain types of information are best presented in certain formats. For example, code is best presented in a code block, research data in a chart, the meaning of a new word on a flashcard. Different people prefer taking notes in varying styles and formats that suit them the best. Notewiz supports the diverse note-taking styles and demands of our users, offering unique note formats that are lacking from other digital note-taking platforms. These include, but are not limited to, the traditional point-form blank document, flashcards, mind maps, and charts.

By using Notewiz, users can create and organize effective digital notes of multiple formats quickly and simply. They can then easily revise their notes and even share them with other people. There's no need to manually draw charts or circles or partition your page yourself. There's also no need to use multiple platforms, since Notewiz natively supports various note formats. Right now, if you wanted to make flashcards, you'd have to export your notes into a flashcard maker and then edit them, which is a pain. With Notewiz, it's easy and fast! Of course, basic features like search, customizable font, auto-save, mathematical symbols and formulas, and comments are also supported.

Our focus is for Notewiz to be versatile, powerful, and simple to use. This would make it an attractive choice for all our users.

Installation


Contribution
We welcome contributions to Notewiz! To contribute, follow these steps:

1.Fork the repository: Click on the "Fork" button at the top right corner of the repository page.

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

Definition of Done
For us, a feature is considered done when it is functional.

Key Decisions & Insights
As students ourselves, taking notes is a big part of our life. We wanted to come up with a solution that would help us save time, that is to say, a better way to take notes. Since note-taking is a crucial part of modern school and work environments, we felt this would be extendable beyond just students like us, and the idea would have a wide target group. Pen and paper are becoming swiftly phased out, and existing digital note-taking apps are not much better than simple document editors. By writing our notes in markdown, it's possible to format and create our notes simply through typing and not having to use the mouse.

First, we came up with a few groups of users that our app could target. Of course, students like ourselves. Another obvious group of people were working professionals, who would have to take meeting notes and organize tasks. We later came up with researchers, who need well-organized data, potentially numerical, and also software developers, that may want to write documentation including code blocks.

We originally started on the idea of a web-based note-taking application, but there wasn't much that distinguished it from existing platforms like Google Docs, Notion, Overleaf, etc. Then, we came up with the idea of unique note-taking formats. Traditional note-taking methods can be inefficient in terms of time spent writing, organizing, and reviewing. Methods like flashcards are proven to be effective studying tools for active memory recall and are often used for learning definitions, facts, and short pieces of information. Looking into existing digital flashcard solutions yielded successful platforms like Quizlet, Brainscape, and ANKI; however they were all niche apps with a hyper-focus on flashcards only. We toyed with the idea of integrating both flashcards with a traditional document in our app, perhaps with features like converting between the two easily.