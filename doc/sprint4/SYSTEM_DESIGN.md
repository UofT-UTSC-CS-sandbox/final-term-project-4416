Notewiz CRC Cards
### Class Name:
    App

### Parent Class (if any):
    None

### Subclass (if any):
    Create Note
    authorize
    flashcard
    mindmap
    Global Searching and Comment

### Responsibilities:
    Manage the overall layout and routing of the application
    Provide global status management
    Render main components (such as CreateNote, NoteList, etc.)
### Collaborators:
    CreateNote
    NoteList
    NoteDetail
    React Router

###########################

### Class Name:
    CreateNote

### Parent Class (if any):
    App

### Subclass (if any):
    NoteList

### Responsibilities:
    Provides a form interface for creating new notes
    Handle form input and update status
    Submit notes to backend API
    Renders Markdown input and supports mathematical formulas
### Collaborators:
    MarkdownEditor
    ReactMarkdown
    remark-math
    rehype-katex
    API Service

########################

### Class Name:
    NoteList

### Parent Class (if any):
    CreateNote

### Subclass (if any):
    NoteDetail

### Responsibilities:
    Show details of selected note
    Supports switching between edit mode and read-only mode
    Render Markdown content

### Collaborators:
    NoteItem
    API Service

########################

### Class Name:
    NoteDetail

### Parent Class (if any):
    NoteList

### Subclass (if any):
    None

### Responsibilities:
    Show list of all notes
    Supports search and filter functions
    Handle deletion and editing of notes
### Collaborators:
    ReactMarkdown
    remark-math
    rehype-katex
    API Service

########################

### Class Name:
    authorize

### Parent Class (if any):
    App

### Subclass (if any):
    Login 
    Signup
    Profile

### Responsibilities:
    User authentication to implement login
    registration
    profile updates

### Collaborators:
    ReactMarkdown
    API Service
    MongoDB

########################

### Class Name:
    Navigation

### Parent Class (if any):
    App

### Subclass (if any):
    None

### Responsibilities:
    Used to hide the left sidebar

### Collaborators:
    ReactBox


Notewiz CRC Cards
### Class Name:
    FlashCard

### Parent Class (if any):
    APP

### Subclass (if any):
    Flash Card Dialog
    Flash Card List
    Flash Card Slice
    Create Flash Card
    Flash Card Generator

### Responsibilities:
    Create Flash Card
    Delete Flash Card
    Flash Card Management Interface
    Generating Flash Card
### Collaborators:
    CreateNote
    FlashCardList
    FlashCardSlice
    React Router
    Redux

###########################

### Class Name:
    MindMap

### Parent Class (if any):
    App

### Subclass (if any):
    Mind Map Dialog
    Mind Map List
    Mind Map Slice
    Create Mind Map

### Responsibilities:
    Create Mind Map
    Delete Mind Map
    Mind Map Management Interface
    Mind Map Preview
### Collaborators:
    MindMapList
    MindMapSlice
    React Router
    Redux

########################

### Class Name:
    Global Searching and Comment

### Parent Class (if any):
    NoteList

### Subclass (if any):
    APP

### Responsibilities:
    Show list of all notes
    Supports search and filter functions
    Comment Notes
### Collaborators:
    React
    

