const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new Database(dbPath, { verbose: console.log });

// Initialize Tables
function init() {
    // NGOs Table
    db.prepare(`
        CREATE TABLE IF NOT EXISTS ngos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            location TEXT NOT NULL,
            districts TEXT NOT NULL, -- Stored as comma-separated or JSON
            focus TEXT NOT NULL,
            impact TEXT NOT NULL,
            phone TEXT,
            email TEXT,
            address TEXT,
            website TEXT,
            description TEXT,
            verified INTEGER DEFAULT 1,
            rating REAL DEFAULT 0,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `).run();

    // Events Table
    db.prepare(`
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            date DATETIME NOT NULL,
            location TEXT NOT NULL,
            category TEXT NOT NULL,
            posterUrl TEXT,
            aiGenerated INTEGER DEFAULT 0,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `).run();

    // Chat Logs Table
    db.prepare(`
        CREATE TABLE IF NOT EXISTS chat_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sessionId TEXT NOT NULL,
            role TEXT NOT NULL,
            content TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `).run();

    // Registrations Table
    db.prepare(`
        CREATE TABLE IF NOT EXISTS registrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            eventId INTEGER NOT NULL,
            userName TEXT NOT NULL,
            userEmail TEXT NOT NULL,
            userPhone TEXT,
            status TEXT DEFAULT 'pending',
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (eventId) REFERENCES events(id)
        )
    `).run();

    console.log('✅ SQLite Database Initialized');
}

module.exports = {
    db,
    init
};
