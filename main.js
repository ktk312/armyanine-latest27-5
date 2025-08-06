// const { app, BrowserWindow } = require('electron');
// const path = require('path');
// const fs = require('fs');
// const { exec } = require('child_process');
// let backendProcess = null;
// // Create the Electron window
// function createWindow() {
//     const mainWindow = new BrowserWindow({
//         width: 1200,
//         height: 800,
//         webPreferences: {
//             nodeIntegration: true, // for dev use only
//             contextIsolation: false // for dev use only
//         },
//     });




//     // Adjust the index path for dev vs packaged mode
//     const indexPath = app.isPackaged
//         ? path.join(process.resourcesPath, 'frontend', 'dist', 'index.html')  // Path for packaged app
//         : path.join(__dirname, 'frontend', 'dist', 'index.html'); // Path for development
//     if (!fs.existsSync(indexPath)) {
//         console.error('❌ index.html not found at:', indexPath);
//     } else {
//         mainWindow.loadFile(indexPath);
//     }
//     mainWindow.loadFile(indexPath);
// }

// // Start backend process
// function startBackend() {
//     // Ensure correct path for backend files when packaged
//     const backendPath = app.isPackaged
//         ? path.join(process.resourcesPath, 'backend', 'index.js') // Path for packaged app
//         : path.join(__dirname, 'backend', 'index.js'); // Path for development

//     const command = app.isPackaged
//         ? `node "${backendPath}"` // Run backend using Node
//         : `"${process.execPath}" "${backendPath}"`; // Dev mode

//     backendProcess = exec(command, (err, stdout, stderr) => {
//         if (err) console.error('❌ Backend error:', err);
//         if (stderr) console.error('⚠️ Backend stderr:', stderr);
//         if (stdout) console.log('✅ Backend stdout:', stdout);
//     });

//     return backendProcess;
// }

// // Handle app ready event
// app.whenReady().then(() => {
//     console.log('Starting backend...');
//     startBackend(); // Start the backend
//     createWindow(); // Open the main window
// });

// // Quit when all windows are closed (except macOS)
// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') app.quit();
// });

// // App quit cleanup

// app.on('before-quit', () => {
//     if (backendProcess) {
//         console.log('🛑 Killing backend process...');
//         backendProcess.kill();
//     }
// });



const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
const { fork } = require('child_process');

let backendProcess = null;

// ============================
// Logging helper
// ============================
const logDir = path.join(app.getPath('userData'), 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
const logFile = path.join(logDir, 'main.log');

function log(...args) {
    const message = `[${new Date().toISOString()}] ${args.join(' ')}\n`;
    fs.appendFileSync(logFile, message);
    console.log(...args);
}

// ============================
// Create Electron window
// ============================
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    const indexPath = app.isPackaged
        ? path.join(process.resourcesPath, 'frontend', 'dist', 'index.html')
        : path.join(__dirname, 'frontend', 'dist', 'index.html');

    if (!fs.existsSync(indexPath)) {
        log('❌ index.html not found:', indexPath);
    } else {
        mainWindow.loadFile(indexPath);
    }

    mainWindow.on('closed', () => {
        log('Main window closed');
    });
}

// ============================
// Start backend process safely
// ============================
function startBackend() {
    const backendPath = app.isPackaged
        ? path.join(process.resourcesPath, 'backend', 'index.js')
        : path.join(__dirname, 'backend', 'index.js');

    if (!fs.existsSync(backendPath)) {
        log('❌ Backend file not found:', backendPath);
        return;
    }

    log('🚀 Starting backend at', backendPath);

    backendProcess = fork(backendPath, [], {
        cwd: path.dirname(backendPath),
        env: {
            ...process.env, // keep current environment variables
            NODE_ENV: app.isPackaged ? 'production' : 'development'
        }
    });

    backendProcess.on('message', (msg) => {
        log('📩 Backend message:', JSON.stringify(msg));
    });

    backendProcess.on('exit', (code) => {
        log(`🛑 Backend exited with code ${code}`);
    });

    backendProcess.on('error', (err) => {
        log('❌ Backend process error:', err);
    });
}

// ============================
// App lifecycle
// ============================
app.whenReady().then(() => {
    log('Starting backend...');
    startBackend();
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('before-quit', () => {
    if (backendProcess) {
        log('🛑 Killing backend process...');
        backendProcess.kill();
    }
});