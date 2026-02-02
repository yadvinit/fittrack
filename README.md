# 🏋️ FitTrack - Fitness Tracking Application

A comprehensive fitness tracking web application built with React, featuring workout logging, exercise browsing, progress visualization, and JWT-based authentication.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.2.4-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-teal)
![License](https://img.shields.io/badge/License-MIT-green)

## 📌 Project Description

FitTrack is a modern fitness tracking application that helps users monitor their workout routines, track progress over time, and browse exercises from a comprehensive public API. The application features an intuitive dashboard, interactive charts, and a clean, responsive UI.

## ✨ Features

### 🔐 Authentication
- JWT-based login system
- Protected routes for authenticated users
- Secure session management using cookies
- Demo credentials available for testing

### 💪 Exercise Management
- Browse 1000+ exercises from Wger API
- Search exercises by name
- Filter by muscle groups
- View detailed exercise descriptions
- Exercise categorization (Cardio, Strength, Flexibility, Sports)

### 📝 Workout Tracking
- Log workouts with sets, reps, and weight
- Track workout duration
- Automatic calorie calculation
- Add personal notes to workouts
- View complete workout history
- Delete workouts

### 📊 Progress Visualization
- Interactive charts using Recharts
- Workout frequency over time (Line Chart)
- Calories burned tracking (Bar Chart)
- Category distribution (Pie Chart)
- Top exercises analysis
- Time range filters (Week/Month/Year/All)

### 📈 Dashboard
- Quick overview of fitness stats
- Total workouts counter
- Weekly and monthly summaries
- Calories burned statistics
- Activity streak tracking
- Recent workouts display
- Quick action buttons

## 🛠️ Tech Stack

- **Frontend Framework:** React.js 19.2.0
- **Build Tool:** Vite 7.2.4
- **Routing:** React Router DOM 7.2.0
- **Charts:** Recharts 2.15.0
- **Styling:** Tailwind CSS 3.4.1
- **Authentication:** JWT with js-cookie
- **API Integration:** Wger Exercise Database API
- **State Management:** React Hooks
- **Storage:** LocalStorage

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd "fitness app"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔑 Demo Credentials

Use these credentials to test the application:

- **Username:** `rahul`
- **Password:** `rahul@2021`

## 📁 Project Structure

```
fitness app/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Navigation bar
│   │   ├── ProtectedRoute.jsx      # Route protection HOC
│   │   └── LoadingSpinner.jsx      # Loading component
│   ├── pages/
│   │   ├── Login.jsx               # Login page
│   │   ├── Dashboard.jsx           # Main dashboard
│   │   ├── BrowseExercises.jsx     # Exercise browser
│   │   ├── AddWorkout.jsx          # Workout logging form
│   │   ├── WorkoutHistory.jsx      # Workout history view
│   │   └── Progress.jsx            # Progress charts
│   ├── services/
│   │   ├── authService.js          # Authentication logic
│   │   ├── exerciseService.js      # Wger API integration
│   │   └── storageService.js       # LocalStorage operations
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles
├── public/                         # Static assets
├── tailwind.config.js              # Tailwind configuration
├── vite.config.js                  # Vite configuration
└── package.json                    # Dependencies
```

## 🌐 API Integration

### Wger Exercise Database API

The application integrates with the free and open-source Wger API:

- **Base URL:** `https://wger.de/api/v2`
- **Endpoints Used:**
  - `/exercise/` - Fetch exercises
  - `/muscle/` - Get muscle groups
  - `/equipment/` - Get equipment info
- **No API Key Required**

## 🔄 Data Flow

1. **User Authentication**
   - User logs in via Login page
   - JWT token stored in cookies
   - Protected routes verify token
   - Token required for all authenticated pages

2. **Exercise Browsing**
   - Fetch exercises from Wger API
   - Filter by muscle groups
   - Search by exercise name
   - View exercise details in modal

3. **Workout Logging**
   - User fills workout form
   - Calories calculated automatically
   - Data stored in LocalStorage
   - Dashboard updates in real-time

4. **Progress Tracking**
   - Retrieve workouts from LocalStorage
   - Process data for charts
   - Display interactive visualizations
   - Filter by time ranges

## 🧪 Features in Detail

### Calorie Calculation

Calories are calculated using MET (Metabolic Equivalent of Task) values:

```javascript
Calories = (MET × 3.5 × weight_kg × duration_min) / 200
```

MET values by category:
- Cardio: 8
- Strength: 6
- Sports: 7
- Flexibility: 3

### Activity Streak Tracking

The app tracks consecutive days of workouts:
- Checks for workouts each day
- Resets if a day is missed
- Displayed on dashboard

### Responsive Design

- Mobile-first approach
- Tailwind CSS utility classes
- Responsive grid layouts
- Mobile navigation menu
- Touch-friendly buttons

## 📦 Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

The build output will be in the `dist/` directory.

## 🚀 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow prompts** to complete deployment

### Deploy to Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

### Alternative: GitHub Pages, Render, or Railway

The application can be deployed to any static hosting service that supports single-page applications.

## 🧪 Edge Cases Handled

- ✅ No workout data (empty states)
- ✅ API failure (error messages)
- ✅ Empty progress charts (helpful prompts)
- ✅ Invalid form inputs (validation)
- ✅ Missing authentication (redirects)
- ✅ Network errors (error boundaries)
- ✅ No search results (alternative suggestions)

## 📈 Future Enhancements

- [ ] Wearable device integration
- [ ] Diet and nutrition tracking
- [ ] Goal-based reminders and notifications
- [ ] Cloud sync across devices
- [ ] AI-powered workout suggestions
- [ ] Social features and challenges
- [ ] Export data to CSV/PDF
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Offline mode with PWA

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 💼 Resume-Ready Description

**FitTrack - Fitness Tracking Application**

Built a comprehensive fitness tracking application using React and public exercise APIs, enabling users to log workouts, visualize progress through interactive charts, and manage fitness data with a clean, responsive UI. Implemented JWT-based authentication, integrated Wger API for 1000+ exercises, developed real-time progress visualization with Recharts, and created an intuitive dashboard for tracking workout statistics and activity streaks.

**Tech Stack:** React.js, Vite, React Router, Recharts, Tailwind CSS, JWT Authentication, RESTful API Integration, LocalStorage

## 🔗 Links

- **GitHub Repository:** [Add your repo URL]
- **Live Demo:** [Add your deployment URL]
- **Project Submission:** [Google Form](https://forms.gle/6KU5Hvzj11GCs9i69)

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- [Wger Exercise Database](https://wger.de) for the free exercise API
- [Recharts](https://recharts.org) for beautiful chart components
- [Tailwind CSS](https://tailwindcss.com) for utility-first styling
- [React Router](https://reactrouter.com) for routing solution

---

⭐ Star this repository if you found it helpful!

**Note:** Remember to replace placeholder URLs with your actual GitHub repository and deployment links before submission.
