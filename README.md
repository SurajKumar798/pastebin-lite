project structure
-----------------
pastebin-lite/
│
├── frontend/
├── pastebin/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── models/
│   │   └── Paste.js
│   ├── Routes/
│   │   └── routes.js
│   ├── index.js
│   ├── package.json
│   └── .env
│
└── README.md

# Pastebin Lite

Pastebin Lite is a simple full-stack web application that allows users to create, store, and share text snippets using a unique URL.  
It is built using the **MERN stack** with a clean separation of frontend and backend in a single repository.

---
# project description

After fillup the form and click the create new paste button there is a sharable link created below the form so when this link is clicked a json file will open
and you can see
{
  "content": "this is html file.",
  "remaining_views": null,
  "expires_at": null
}

## 🛠 Tech Stack

### Frontend
- React (Vite)
- JavaScript
- CSS
- Material UI

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## clone the repository
  git clone https://github.com/SurajKumar798/pastebin-lite.git
