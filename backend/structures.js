const boilerPlateData = {
  fullstack: {
    MERN: {
      frontend: {
        files: [],
      },
      backend: {},
    },
  },
  react: {
    files: [
      {
        name: "index.js",
        path: "src",
        content: `import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));`,
      },
      {
        name: "App.js",
        path: "src",
        content: `import React from 'react';
import './App.css';

function App() {
    return (
        <div className="App">
            <h1>React Application</h1>
        </div>
    );
}

export default App;`,
      },
      {
        name: "index.css",
        path: "src",
        content: "",
      },
      {
        name: "App.css",
        path: "src",
        content: "",
      },
      {
        name: "package.json",
        path: "",
        content: `{
    "name": "react-app",
    "version": "0.1.0",
    "private": true,
    "dependencies": {
        "react": "^17.0.1",
        "react-dom": "^17.0.1",
        "react-scripts": "4.0.1",
        "web-vitals": "^0.2.4"
    },
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
    },
    "eslintConfig": {
        "extends": [
            "react-app",
            "react-app/jest"
        ]
    },
    "browserslist": {
        "production": [
            ">0.2%",
            "not dead",
            "not op_mini all"
        ],
        "development": [
            "last 1 chrome version",
            "last 1 firefox version",
            "last 1 safari version"
        ]
    }
}`,
      },
      {
        name: "README.md",
        path: "",
        content: "",
      },
      {
        name: "index.html",
        path: "public",
        content: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
            name="description"  
            content="Web site created using create-react-app"
        />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <title>React App</title>
    </head>
    <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
    </body>
</html>`,
      },
      {
        name: "manifest.json",
        path: "public",
        content: `{
    "short_name": "React App",
    "name": "Create React App Sample",
    "icons": [
        {
            "src": "favicon.ico",
            "sizes": "64x64 32x32 24x24 16x16",
            "type": "image/x-icon"
        },
        {
            "src": "logo192.png",
            "type": "image/png",
            "sizes": "192x192"
        },
        {
            "src": "logo512.png",
            "type": "image/png",
            "sizes": "512x512"
        }
    ],
    "start_url": ".",
    "display": "standalone",
    "theme_color": "#000000",
    "background_color": "#ffffff"
}`,
      },
      {
        name: "robots.txt",
        path: "public",
        content: `User-agent: *
Disallow:`,
      },
    ],
  },
};

module.exports = structures;
