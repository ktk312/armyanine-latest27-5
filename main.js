const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
let backendProcess = null;
// Create the Electron window
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true, // for dev use only
            contextIsolation: false // for dev use only
        },
    });




    // Adjust the index path for dev vs packaged mode
    const indexPath = app.isPackaged
        ? path.join(process.resourcesPath, 'frontend', 'dist', 'index.html')  // Path for packaged app
        : path.join(__dirname, 'frontend', 'dist', 'index.html'); // Path for development
    if (!fs.existsSync(indexPath)) {
        console.error('❌ index.html not found at:', indexPath);
    } else {
        mainWindow.loadFile(indexPath);
    }
    mainWindow.loadFile(indexPath);
}

// Start backend process
function startBackend() {
    // Ensure correct path for backend files when packaged
    const backendPath = app.isPackaged
        ? path.join(process.resourcesPath, 'backend', 'index.js') // Path for packaged app
        : path.join(__dirname, 'backend', 'index.js'); // Path for development

const command = `"${process.execPath}" "${backendPath}"`;

     backendProcess = exec(command, (err, stdout, stderr) => {
        if (err) console.error('❌ Backend error:', err);
        if (stderr) console.error('⚠️ Backend stderr:', stderr);
        if (stdout) console.log('✅ Backend stdout:', stdout);
    });

    return backendProcess;
}

// Handle app ready event
app.whenReady().then(() => {
    console.log('Starting backend...');
    startBackend(); // Start the backend
    createWindow(); // Open the main window
});

// Quit when all windows are closed (except macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// App quit cleanup

app.on('before-quit', () => {
    if (backendProcess) {
        console.log('🛑 Killing backend process...');
        backendProcess.kill();
    }
});
