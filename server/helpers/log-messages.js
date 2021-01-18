const FgBlack = '\x1b[30m';
const FgRed = '\x1b[31m';
const FgGreen = '\x1b[32m';
const FgYellow = '\x1b[33m';
const FgBlue = '\x1b[34m';
const FgMagenta = '\x1b[35m';
const FgCyan = '\x1b[36m';
const FgWhite = '\x1b[37m';
const consoleMsg = (message, color) => console.log(color, message, '\x1b[0m');

module.exports = {
    error: (message) => consoleMsg(message, FgRed),
    success: (message) => consoleMsg(message, FgGreen),
    warning: (message) => consoleMsg(message, FgYellow),
    inform: (message) => consoleMsg(message, FgBlue)
}