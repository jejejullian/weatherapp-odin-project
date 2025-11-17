# Weather App ☀️🌧️

A modern, responsive weather application built with vanilla JavaScript as part of The Odin Project curriculum. Search for any city worldwide and get real-time weather information with beautiful, dynamic backgrounds that change based on weather conditions.

## 🔗 Live Demo

**[View Live App](https://weatherapp-odin-project.vercel.app)**

## 📸 Features

- **🔍 City Search** - Search weather by city name with form validation
- **📍 Geolocation** - Get weather for your current location with one click (requires HTTPS)
- **🌡️ Temperature Toggle** - Switch between Celsius and Fahrenheit
- **🌓 Dark/Light Mode** - Theme toggle with localStorage persistence
- **⏰ Real-time Clock** - Live time display updated every second
- **📅 Hourly Forecast** - Next 24 hours weather prediction (8 time slots)
- **📆 5-Day Forecast** - Extended forecast with 5 time slots per day
- **🎨 Dynamic Backgrounds** - Background changes based on weather conditions
- **📱 Fully Responsive** - Works seamlessly on mobile, tablet, and desktop

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom styling with Tailwind CSS utility classes
- **JavaScript (ES6+)** - Vanilla JS with modern features:
  - Async/Await for API calls
  - ES6 Modules
  - Destructuring
  - Template literals
  - Optional chaining
- **OpenWeatherMap API** - Weather data provider
- **Vite** - Build tool and dev server
- **Vercel** - Deployment platform

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key (free tier available)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
```env
   VITE_API_KEY=your_openweathermap_api_key_here
```
   
   Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

4. **Run development server**
```bash
   npm run dev
```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser

5. **Build for production**
```bash
   npm run build
```

## 📂 Project Structure
```
weather-app/
├── src/
│   ├── Modules/
│   │   ├── geoLocation.js    # Geolocation feature (radar icon)
│   │   ├── helpers.js         # Utility functions (conversions, formatting, toggles)
│   │   ├── search.js          # City search functionality
│   │   ├── state.js           # State management
│   │   ├── views.js           # UI rendering logic
│   │   └── weatherApi.js      # API calls and data fetching
│   ├── main.js                # Application entry point
│   └── style.css              # Global styles
├── index.html                 # Main HTML file
├── .env                       # Environment variables (not in repo)
├── package.json
└── README.md
```

## 🎯 Learning Objectives (The Odin Project)

This project demonstrates mastery of:

- ✅ Working with external APIs
- ✅ Handling asynchronous JavaScript (Promises & Async/Await)
- ✅ DOM manipulation and event handling
- ✅ ES6 Modules and code organization
- ✅ Environment variables and API key security
- ✅ Error handling for network requests
- ✅ Form validation and user input handling
- ✅ localStorage for persistent user preferences
- ✅ Responsive design principles
- ✅ Browser APIs (Geolocation, matchMedia)

## 🔑 API Security Note

This project uses the OpenWeatherMap API with environment variables (`.env` file) to keep the API key secure during development. The key is never exposed in the frontend code and is only accessible server-side through Vite's build process.

**Important:** Never commit your `.env` file to version control. It's included in `.gitignore` by default.

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

**Note:** Geolocation feature requires HTTPS in production environments.

## 📱 Mobile Compatibility

- Form submit works with mobile keyboard (Enter key)
- Touch-friendly interface with appropriate button sizes
- Responsive layout adapts to all screen sizes
- Optimized for both portrait and landscape orientations

## 🎨 Weather Conditions Supported

The app changes backgrounds based on these weather types:
- ☀️ Clear/Sunny
- ☁️ Cloudy/Overcast
- 🌧️ Rain/Drizzle
- ⛈️ Thunderstorm
- 🌫️ Fog/Mist/Haze
- ❄️ Snow

## 🐛 Known Issues

- Geolocation requires HTTPS (works on localhost and production, not HTTP)
- Some mobile browsers may block geolocation by default
- API rate limits apply (60 calls/minute for free tier)

## 🔮 Future Enhancements

- [ ] Weather alerts and warnings
- [ ] Air quality index
- [ ] UV index display
- [ ] Wind speed and direction visualization
- [ ] Sunrise/sunset times
- [ ] Multiple city bookmarks
- [ ] Weather radar map integration
- [ ] Hourly temperature graph

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [The Odin Project](https://www.theodinproject.com/) - For the amazing curriculum
- [OpenWeatherMap](https://openweathermap.org/) - For providing the weather API
- [Google Material Symbols](https://fonts.google.com/icons) - For the icons
- [Tailwind CSS](https://tailwindcss.com/) - For utility classes

## 👨‍💻 Author

**Your Name**
- LinkedIn: [juliannurfadzlin](https://www.linkedin.com/in/juliannurfadzlin/)

---

⭐ If you found this project helpful, please give it a star!