# 🚀 TaskManager Pro - Advanced Task Management System

A comprehensive, full-stack task management application built with **Next.js 16**, **React Hooks**, **Firebase/Firestore**, and **Tailwind CSS**. This project showcases modern web development practices with a focus on user experience, productivity features, and clean architecture.

---

## ✨ Features Overview

### 🔐 **Authentication**
- Firebase Authentication (Email/Password)
- Protected routes with automatic redirects
- User-specific task isolation
- Persistent login sessions

### 📋 **Kanban Board**
- 4-column board: To Do, In Progress, Pending, Done
- Visual task organization
- Status badges with color coding
- Task counter per column
- Intuitive card-based interface

### 🎯 **Task Management**
- ✅ Create, Read, Update, Delete (CRUD) operations
- ✅ Task title and detailed descriptions
- ✅ Priority levels: High, Medium, Low
- ✅ Categories: Work, Personal, Urgent, Shopping, General
- ✅ Multi-tag support for flexible organization
- ✅ Due dates with visual indicators
- ✅ Recurring tasks (Daily, Weekly, Monthly)
- ✅ Status management across workflow stages

### 🔍 **Search & Filtering**
- Global search across task titles and descriptions
- Advanced filters:
  - Filter by status (All, To Do, In Progress, Pending, Done)
  - Filter by priority (All, High, Medium, Low)
  - Filter by category
- Collapsible filter panel
- Real-time results

### 📊 **Analytics Dashboard**
- Total tasks overview
- Completion rate calculation
- Tasks by status breakdown
- Priority distribution chart
- Category analysis
- Progress visualization
- Productivity insights

### 📜 **Task History & Audit Log**
- Complete change tracking
- Action timestamps
- User attribution
- History view in task details:
  - Task created
  - Status changes
  - Field updates

### 🎨 **Theme System**
- Dark mode (default)
- Light mode
- Persistent theme preference
- Smooth transitions
- System-wide theme toggle

### 🔄 **Advanced Features**
- Recurring task system
- Drag-to-reorder capability (move between statuses)
- Real-time Firestore sync
- Responsive design (mobile, tablet, desktop)
- Loading states and error handling
- Toast notifications (can be added)

---

## 🏗️ **Project Structure**

```
project/
├── src/
│   ├── app/
│   │   ├── analytics/
│   │   │   └── page.jsx           # Analytics dashboard
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── page.jsx       # Login page
│   │   │   └── signup/
│   │   │       └── page.jsx       # Signup page
│   │   ├── dashboard/
│   │   │   └── page.jsx           # Main Kanban dashboard
│   │   ├── home/
│   │   │   └── page.tsx           # Landing page
│   │   ├── globals.css            # Global styles + dark mode
│   │   ├── layout.tsx             # Root layout with providers
│   │   └── page.tsx               # Home redirect
│   │
│   ├── components/
│   │   ├── AddTaskModal.jsx       # Modal for creating tasks
│   │   ├── KanbanBoard.jsx        # Kanban board container
│   │   ├── Navbar.jsx             # Navigation bar
│   │   ├── SearchBar.jsx          # Search and filter component
│   │   ├── TaskCard.jsx           # Individual task card
│   │   ├── TaskDetailModal.jsx    # Task details and history modal
│   │   └── TaskList.jsx           # Legacy task list component
│   │
│   ├── context/
│   │   ├── AuthContext.jsx        # Firebase auth management
│   │   ├── TaskContext.jsx        # Task state and CRUD operations
│   │   └── ThemeContext.jsx       # Dark/light theme management
│   │
│   └── lib/
│       └── firebase.js            # Firebase configuration
│
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.ts
└── README.md
```

---

## 🛠️ **Technology Stack**

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | Next.js 16.1.0 (App Router) |
| **UI Library** | React 19.2.3 |
| **Language** | TypeScript + JavaScript (JSX) |
| **Styling** | Tailwind CSS 4.0 |
| **Database** | Firebase Firestore |
| **Authentication** | Firebase Auth |
| **State Management** | React Context API + Hooks |
| **Deployment** | Vercel (recommended) |

---

## 📦 **Installation & Setup**

### 1. **Clone the Repository**
```bash
cd project
```

### 2. **Install Dependencies**
```bash
npm install firebase
```

### 3. **Firebase Configuration**
The Firebase config is already set in `src/lib/firebase.js`. Make sure you:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Enable **Firestore Database**
3. Enable **Email/Password** authentication
4. Set up Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, write: if request.auth != null && 
                          request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
  }
}
```

### 4. **Run Development Server**
```bash
npm run dev
```

Visit **http://localhost:3000**

---

## 🚀 **Usage Guide**

### **1. Getting Started**
1. Visit the homepage
2. Click "Sign Up" to create an account
3. Enter your name, email, and password
4. You'll be redirected to the dashboard

### **2. Creating Tasks**
1. Click the "**+ Add Task**" button in any column
2. Fill in:
   - Task title (required)
   - Description (optional)
   - Status (To Do, In Progress, Pending, Done)
   - Priority (High, Medium, Low)
   - Category (Work, Personal, etc.)
   - Due date
   - Recurring schedule
   - Tags (comma-separated)
3. Click "Create Task"

### **3. Managing Tasks**
- **Move Tasks**: Click "Move →" on a card and select new status
- **View Details**: Click on any task card
- **Edit Task**: Click "Edit Task" in the detail modal
- **Delete Task**: Click the trash icon or "Delete Task" button
- **Mark Complete**: Tasks in "Done" column are completed

### **4. Search & Filter**
1. Use the search bar to find tasks by keyword
2. Click "**Filters**" to expand advanced options
3. Select status, priority, or category
4. Results update in real-time

### **5. Analytics**
1. Click "**Analytics**" in the navbar
2. View:
   - Total tasks and completion rate
   - Tasks by status
   - Priority breakdown
   - Category distribution
   - Productivity insights

### **6. Theme Toggle**
- Click the **🌞/🌙** icon in the navbar to switch themes

---

## 🎨 **Color Scheme**

### **Dark Mode** (Default)
- Background: `#000000` (Black)
- Cards: `#1F2937` (Gray-800)
- Accent: `#22D3EE` (Cyan-400)
- Text: `#FFFFFF` (White)

### **Light Mode**
- Background: `#FFFFFF` (White)
- Cards: `#F9FAFB` (Gray-50)
- Accent: `#0891B2` (Cyan-600)
- Text: `#111827` (Gray-900)

### **Status Colors**
- To Do: Blue (`#3B82F6`)
- In Progress: Yellow (`#EAB308`)
- Pending: Orange (`#F97316`)
- Done: Green (`#22C55E`)

### **Priority Colors**
- High: Red (`#EF4444`)
- Medium: Yellow (`#EAB308`)
- Low: Green (`#22C55E`)

---

## 🔥 **Advanced Features Explained**

### **1. Task History Tracking**
Every task maintains a complete audit log:
```javascript
history: [
  {
    action: 'created',
    timestamp: '2025-12-22T10:30:00',
    user: 'John Doe'
  },
  {
    action: 'status_changed',
    from: 'todo',
    to: 'inprogress',
    timestamp: '2025-12-22T14:15:00',
    user: 'John Doe'
  }
]
```

### **2. Recurring Tasks**
Set tasks to repeat automatically:
- **Daily**: Creates new task every day
- **Weekly**: Creates new task every week
- **Monthly**: Creates new task every month

*Note: Recurring logic can be implemented with Firebase Cloud Functions or client-side scheduling.*

### **3. Category System**
Organize tasks into predefined categories:
- **General**: Default category
- **Work**: Professional tasks
- **Personal**: Individual tasks
- **Urgent**: High-priority items
- **Shopping**: Purchase lists

### **4. Multi-Tag Support**
Add unlimited tags to each task for flexible organization:
```javascript
tags: ['urgent', 'meeting', 'client', 'review']
```

---

## 🧪 **React Hooks Showcase**

This project demonstrates mastery of React Hooks:

### **useState**
- Task input management
- Form state
- Modal visibility
- Filter states
- Loading states

### **useEffect**
- Firebase data fetching on mount
- User authentication state
- LocalStorage theme persistence
- Firestore real-time updates

### **useContext**
- `AuthContext` - User authentication
- `TaskContext` - Global task state
- `ThemeContext` - Theme management

### **Custom Hook Example**
```javascript
// useTaskContext hook
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider');
  }
  return context;
};
```

---

## 📱 **Responsive Design**

- **Mobile** (< 768px): Single column layout
- **Tablet** (768px - 1024px): 2-column Kanban
- **Desktop** (> 1024px): 4-column Kanban

---

## 🔒 **Security Features**

1. **Firebase Auth** - Secure user authentication
2. **User Isolation** - Tasks filtered by user ID
3. **Firestore Rules** - Server-side security
4. **Protected Routes** - Client-side route guards
5. **Input Validation** - XSS prevention

---

## 🚧 **Future Enhancements**

- [ ] Drag-and-drop with react-beautiful-dnd
- [ ] Real-time collaboration
- [ ] Email notifications
- [ ] Task attachments
- [ ] Subtasks
- [ ] Time tracking per task
- [ ] Export to CSV/PDF
- [ ] Calendar view
- [ ] Mobile app (React Native)
- [ ] AI task suggestions (ChatGPT integration)
- [ ] Static chatbot helper

---

## 📄 **License**

This project is open-source and available for educational purposes.

---

## 👨‍💻 **Developer Notes**

### **Key Design Decisions**
1. **Context API over Redux**: Simpler for this scope, less boilerplate
2. **Firestore over PostgreSQL**: Real-time updates, easier setup
3. **Modular Components**: Each component has single responsibility
4. **TypeScript + JSX Mix**: Gradual TypeScript adoption

### **Performance Optimizations**
- Lazy loading of modals
- Filtered task queries from Firestore
- Memoization opportunities with `useMemo`
- Virtual scrolling for large task lists (can be added)

---

## 🎓 **Learning Outcomes**

This project demonstrates:
- ✅ Full-stack application architecture
- ✅ React Hooks mastery (useState, useEffect, useContext)
- ✅ Firebase integration (Auth + Firestore)
- ✅ Tailwind CSS for rapid UI development
- ✅ Context API for state management
- ✅ Next.js App Router
- ✅ Responsive design principles
- ✅ Modern authentication flows
- ✅ Real-time database operations
- ✅ Component composition patterns

---

## 🙌 **Acknowledgments**

Built with ❤️ using Next.js, React, Firebase, and Tailwind CSS.

**Perfect for portfolios, interviews, and learning modern web development!**

---

## 📞 **Support**

For questions or issues, please refer to the documentation or create an issue in the repository.

**Happy Task Managing! 🎉**
