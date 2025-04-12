https://pm2.keymetrics.io/docs/usage/application-declaration/

Part I: Installing & Deploying PM2 on Windows with PM2-Windows-Service
This guide assumes you have Node.js installed (and using nvm for Windows if desired) and that your projects have valid "start" scripts defined in their package.json files.
1. Install PM2 Globally
	1. Open a Command Prompt.
	2. Run the following command to install PM2 globally:

bash
Copy
npm install -g pm2
	3. Verify the installation:

bash
Copy
pm2 --version
2. Create Your Ecosystem Configuration File
Create a file (for example, ecosystem.config.js) with the following contents. This file tells PM2 how to manage your three Next.js projects:

js
Copy
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
    }
  ],
};
	Notes:
		○ We use cmd.exe with the argument /c npm start so that the command is run via the command shell.
		○ The cwd values are full absolute Windows paths where your projects reside.
		○ Ensure that every project has a valid "start": "next start" script in its package.json.
3. Test Your Configuration
Before deploying via PM2, verify that each project starts manually:
	1. Open a Command Prompt.
	2. Navigate to one of your project directories (e.g., C:\wamp64\www\DNPH\perks):

bash
Copy
cd C:\wamp64\www\DNPH\perks
npm start
	3. If the app starts without issues, repeat for the remaining projects.
4. Start Your Applications Using PM2
	1. Navigate to the directory where your ecosystem.config.js is saved.
	2. Run:

bash
Copy
pm2 start ecosystem.config.js
	3. Verify that the apps are running:

bash
Copy
pm2 list
	4. Check the logs if necessary:

bash
Copy
pm2 logs
5. Install PM2 as a Windows Service
Running PM2 as a Windows service hides the command windows and automatically manages your processes at system boot.
a. Install the Service Package
	1. Open a Command Prompt as Administrator.
	2. Install pm2-windows-service globally:

bash
Copy
npm install -g pm2-windows-service
b. Run the Service Installation Script
Still in the elevated prompt, run:

bash
Copy
pm2-service-install
You will be prompted with several configuration questions. Here’s how to answer:
	• Perform environment setup (recommended)?
Answer: Yes
(This sets up necessary environment variables.)
	• Set PM2_HOME?
Answer: Yes
(Choose a directory that is accessible to the service user; for example, you might enter C:\PM2.)
	• PM2_HOME value:
Answer: Enter an absolute path (e.g., C:\PM2) that does not include user-specific variables like %APPDATA%.
	• Set PM2_SERVICE_SCRIPTS?
Answer: Yes
(This allows the service to automatically load your startup scripts.)
	• Set the list of startup scripts/files (semi-colon separated):
Answer: Enter the full path to your ecosystem file. For example:

arduino
Copy
C:\wamp64\www\ecosystem.config.js
	• Set PM2_SERVICE_PM2_DIR?
Answer: Yes
(This specifies where the global PM2 is located.)
	• Specify the directory containing the pm2 version to be used by the service:
Answer:
Based on your setup, run:

bash
Copy
npm root -g

In your case, the global modules are located at C:\nvm4w\nodejs\node_modules. Therefore, enter:

makefile
Copy
C:\nvm4w\nodejs\node_modules\pm2\index.js
After confirming these answers, the installation script will complete. The PM2 service will be installed and automatically start in the background.
6. Save Your Process List for Auto-Resurrection
Once your applications are running and managed by PM2, save the process list to enable auto-resurrection after reboots:

bash
Copy
pm2 save
The PM2 service will now automatically load and restart your apps on system boot.
7. Summary of the Deployment Process
	1. Install PM2 globally using npm.
	2. Create the ecosystem.config.js file with your app definitions.
	3. Test each project manually with npm start to ensure they work.
	4. Deploy the ecosystem using pm2 start ecosystem.config.js.
	5. Install and configure pm2-windows-service (using pm2-service-install) while providing:
		○ A valid PM2_HOME (e.g., C:\PM2)
		○ The startup script (e.g., C:\wamp64\www\ecosystem.config.js)
		○ The correct global PM2 path (e.g., C:\nvm4w\nodejs\node_modules\pm2\index.js)
	6. Save the PM2 process list with pm2 save.
Your applications should now run silently in the background as part of a Windows service.

Part II: PM2 Command Cheat Sheet
Below is a quick-reference cheat sheet for the most commonly used PM2 commands:
Command	Description
pm2 list	List all processes managed by PM2.
pm2 status	Display a status overview (similar to list).
`pm2 show <app_name	id>`
pm2 logs	Tail logs for all processes.
`pm2 logs <app_name	id>`
`pm2 restart <app_name	id>`
`pm2 stop <app_name	id>`
`pm2 delete <app_name	id>`
pm2 start ecosystem.config.js	Start all processes defined in your ecosystem configuration file.
pm2 reload ecosystem.config.js	Reload processes gracefully (zero-downtime reload) using the ecosystem config file.
pm2 save	Save the current process list to disk to enable auto-resurrect after a reboot.
pm2 resurrect	Restore processes from the previously saved list (usually run automatically on reboot if configured).
pm2 monit	Open the PM2 monitoring interface to view CPU and memory usage.
pm2 update	Update the PM2 daemon to the latest version without losing process data.
pm2 kill	Terminate the PM2 daemon and all managed processes.
	Note: When PM2 is running as a Windows service (using pm2-windows-service), most of these commands still work for managing processes. However, starting the service, auto-resurrect, and log management are handled by the service itself.
