# CodeMind 🎯  
An AI-powered quiz game where users test their knowledge on selected themes. Inspired by Trivia Crack, the app provides a fun and engaging experience with AI-generated questions.  

## Features  
✅ **AI-Generated Quizzes** – Questions are dynamically created based on the selected theme.  
✅ **Trivia Crack-Style Interface** – Multiple-choice questions with four possible answers.  
✅ **Scoring System** – Tracks and displays the user's score out of 20 at the end of the game.  

### Planned Features 🚀  
🔧 **Configurable Number of Questions** – Users can select how many questions they want per game.  
💰 **Ads Integration** – Monetization via Google AdMob & Apple Store.  

## Tech Stack  
### Frontend (Mobile App)  
- **React Native** – Cross-platform development for Android & iOS.  

### Backend  
- **Node.js (Express/NestJS)** – Fast and scalable API.  

### AI for Quiz Generation  
- **OpenAI API (GPT-4 or future versions)** – Generates quiz questions dynamically.  

## Contributing  
Feel free to fork the repo, open issues, and submit pull requests!  

## License  
MIT License.

## Commands 
Run npx expo without the --tunnel flag: npx expo start --dev-client --port 80
Install ngrok separate and run : ngrok http 80 --log stdout
npm install --legacy-peer-deps when adding a new dependency

## TODO
iOS Bundling failed 65510ms node_modules\expo\AppEntry.js (889 modules)
The package at "node_modules\dotenv\lib\main.js" attempted to import the Node standard library module "path".
It failed because the native React runtime does not include the Node standard library.
To fix this, install the `path` package in your project.
