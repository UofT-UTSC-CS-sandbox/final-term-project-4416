# Technology Stack
### Front-end: 
    React

##### Wht choose React?

1. React 's component-based structure allows for resusable UI components which makes the development process more efficent and maintainbale.
2. React has a large community and a rich ecosytem of libraries and tools, such as flash card and mind map, provding ample resources and support for us.
3. With SSR and SSG capabilities (e.g., Next.js), React applications can be optimized for better SEO.

##### Sources should install:
```
npm install react-quizlet-flashcard react-markdown-editor-lite react-draggable react-markdown
```

### Back-end:
    Node.js 

##### Wht choose Node js?

1. Using Node.js allows for full-stack JavaScript development, enabling the same language to be used on both the client and server sides, simplifying the development process.
2. Node.js has a vast ecosystem of libraries and modules available through npm, which can accelerate development.
3. Node.js is well-suited for real-time applications, such as collaborative note-taking or live updates which we might develop later.

### Database:
    MangoDB
##### Wht choose MangoDB?

1. MongoDB’s document-oriented storage allows for flexible and schema-less data structures, which is ideal for handling various types of notes and metadata in NoteWiz.
2. MongoDB stores data in JSON-like documents (BSON), which, compared to SQL, fits well with JavaScript-based backend (Node.js) and frontend (React) technologies.
3. MongoDB is designed to scale out horizontally, making it a good fit for applications that need to handle large amounts of data and high traffic.

### How it Works
**View:** The React form (`CreateNote` component) provides the user interface for creating a note. When the form is submitted, it sends a POST request to the back-end API with the note data.
**Controller:** The Express route handler for the POST request `(/api/notes)` processes the incoming data, creates a new Note object, and saves it to MongoDB.
**Model:** The Note schema defined with Mongoose represents the structure of the note data stored in MongoDB.
