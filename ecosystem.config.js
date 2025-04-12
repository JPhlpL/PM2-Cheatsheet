module.exports = {
  apps: [
    {
      name: "perks-next",
      script: "cmd.exe",
      args: "/c npm start",
      cwd: "C:\\wamp64\\www\\DNPH\\perks",
      env: {
        PORT: 3000,
        NODE_ENV: "production"
      },
    },
    {
      name: "nextjs-fastapi-supa",
      script: "cmd.exe",
      args: "/c npm start",
      cwd: "C:\\wamp64\\www\\languages\\nextjs\\nextjs-fastapi-supa",
      env: {
        PORT: 3001,
        NODE_ENV: "production"
      },
    },
    {
      name: "nextjs-portfolio",
      script: "cmd.exe",
      args: "/c npm start",
      cwd: "C:\\wamp64\\www\\languages\\nextjs\\nextjs-portfolio",
      env: {
        PORT: 3002,
        NODE_ENV: "production"
      },
    },
    {
      name: "perks-fastapi",
      // Use the virtual environment's python interpreter to launch uvicorn.
      script: "C:\\wamp64\\www\\DNPH\\perks\\python-api\\venv\\Scripts\\python.exe",
      args: "-m uvicorn src.main:app --host 0.0.0.0 --port 5000",
      cwd: "C:\\wamp64\\www\\DNPH\\perks\\python-api",
      env: {
        NODE_ENV: "production"
      },
    }
  ],
};
