


// const { app, BrowserWindow } = require('electron');
// const path = require('path');
// const fs = require('fs');
// const { fork } = require('child_process');

// let backendProcess = null;

// // ============================
// // Logging helper
// // ============================
// const logDir = path.join(app.getPath('userData'), 'logs');
// if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
// const logFile = path.join(logDir, 'main.log');

// function log(...args) {
//     const message = `[${new Date().toISOString()}] ${args.join(' ')}\n`;
//     fs.appendFileSync(logFile, message);
//     console.log(...args);
// }

// // ============================
// // Create Electron window
// // ============================
// function createWindow() {
//     const mainWindow = new BrowserWindow({
//         width: 1200,
//         height: 800,
//         webPreferences: {
//             nodeIntegration: true,
//             contextIsolation: false
//         }
//     });

//     const indexPath = app.isPackaged
//         ? path.join(process.resourcesPath, 'frontend', 'dist', 'index.html')
//         : path.join(__dirname, 'frontend', 'dist', 'index.html');

//     if (!fs.existsSync(indexPath)) {
//         log('❌ index.html not found:', indexPath);
//     } else {
//         mainWindow.loadFile(indexPath);
//     }

//     mainWindow.on('closed', () => {
//         log('Main window closed');
//     });
// }

// // ============================
// // Start backend process safely
// // ============================
// function startBackend() {
//     const backendPath = app.isPackaged
//         ? path.join(process.resourcesPath, 'backend', 'index.js')
//         : path.join(__dirname, 'backend', 'index.js');

//     if (!fs.existsSync(backendPath)) {
//         log('❌ Backend file not found:', backendPath);
//         return;
//     }

//     log('🚀 Starting backend at', backendPath);

//     backendProcess = fork(backendPath, [], {
//         cwd: path.dirname(backendPath),
//         env: {
//             ...process.env, // keep current environment variables
//             NODE_ENV: app.isPackaged ? 'production' : 'development'
//         }
//     });

//     backendProcess.on('message', (msg) => {
//         log('📩 Backend message:', JSON.stringify(msg));
//     });

//     backendProcess.on('exit', (code) => {
//         log(`🛑 Backend exited with code ${code}`);
//     });

//     backendProcess.on('error', (err) => {
//         log('❌ Backend process error:', err);
//     });
// }

// // ============================
// // App lifecycle
// // ============================
// app.whenReady().then(() => {
//     log('Starting backend...');
//     startBackend();
//     createWindow();

//     app.on('activate', () => {
//         if (BrowserWindow.getAllWindows().length === 0) {
//             createWindow();
//         }
//     });
// });

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });

// app.on('before-quit', () => {
//     if (backendProcess) {
//         log('🛑 Killing backend process...');
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
            contextIsolation: false,
            webSecurity: false
        }
    });
mainWindow.webContents.openDevTools();

    const indexPath = app.isPackaged
        ? path.join(process.resourcesPath, 'frontend', 'dist', 'index.html')
        : path.join(__dirname, 'frontend', 'dist', 'index.html');

    log('🧭 indexPath:', indexPath);

    if (!fs.existsSync(indexPath)) {
        log('❌ index.html not found:', indexPath);
        mainWindow.loadURL('about:blank'); // fallback if file doesn't exist
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
    let backendPath = app.isPackaged
        ? path.join(process.resourcesPath, 'backend', 'index.js')
        : path.join(__dirname, 'backend', 'index.js');

    // Fix path if somehow becomes file:// URI (happens in some packaging cases)
    if (backendPath.startsWith('file://')) {
        backendPath = new URL(backendPath).pathname;
        if (process.platform === 'win32' && backendPath.startsWith('/')) {
            backendPath = backendPath.slice(1); // Remove leading slash (e.g. /C:/path → C:/path)
        }
        backendPath = decodeURIComponent(backendPath);
    }

    log('🧪 backendPath:', backendPath);
    log('🧪 fs.existsSync:', fs.existsSync(backendPath));
    log('🧪 CWD:', process.cwd());
    log('🧪 Platform:', process.platform);

    if (!fs.existsSync(backendPath)) {
        log('❌ Backend file not found:', backendPath);
        return;
    }

    log('🚀 Starting backend at', backendPath);

    try {
        backendProcess = fork(backendPath, [], {
            cwd: path.dirname(backendPath),
            env: {
                ...process.env,
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

        backendProcess.stderr?.on('data', (data) => {
            log('⚠️ Backend stderr:', data.toString());
        });

        backendProcess.stdout?.on('data', (data) => {
            log('✅ Backend stdout:', data.toString());
        });
    } catch (e) {
        log('❌ Failed to fork backend:', e);
    }
}

// ============================
// App lifecycle
// ============================
app.whenReady().then(() => {
    log('⚡ App ready - starting backend...');
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
