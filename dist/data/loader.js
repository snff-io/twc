"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const LoaderUnit_1 = require("../eng/LoaderUnit");
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
// Function to connect to MongoDB
async function connectToDatabase() {
    const uri = 'mongodb://localhost:27017'; // MongoDB connection URI
    const client = new mongodb_1.MongoClient(uri);
    await client.connect(); // Connect to MongoDB
    console.log('Connected to MongoDB');
    return client.db('worldcomputer'); // Return the database object
}
// Function to insert a user document into the database
async function addUnit(db, unit) {
    const unitCollection = db.collection(unit.displayType());
    await unitCollection.insertOne(unit);
    console.log('User inserted:', unit);
}
// Function to read names from a file line by line
function readNamesFromFile(filename) {
    return new Promise((resolve, reject) => {
        const names = [];
        const rl = readline.createInterface({
            input: fs.createReadStream(filename, { encoding: 'utf8' }),
            crlfDelay: Infinity // Preserve newlines in output
        });
        rl.on('line', (line) => {
            // Process each line (assuming each line contains a name)
            names.push(line);
        });
        rl.on('close', () => {
            resolve(names);
        });
        rl.on('error', (err) => {
            reject(err);
        });
    });
}
// Main function to demonstrate serialization and deserialization
async function main() {
    var file_name = "../../storage/names_heart.txt";
    var collection_name = "Heart";
    try {
        const db = await connectToDatabase();
        // Example user object
        var names = await readNamesFromFile(file_name);
        for (const n of names) {
            var splitName = n.split(',');
            if (splitName.length != 2) {
                console.error(n + " has comma issue!");
                continue; // Skip invalid names
            }
            var unit = new LoaderUnit_1.LoaderUnit(splitName[0].trim(), // Trim to remove leading/trailing spaces
            splitName[1].trim(), collection_name);
            await addUnit(db, unit);
        }
        console.log('All units added successfully.');
    }
    catch (error) {
        console.error('Error:', error);
    }
}
async function main_me() {
    const db = await connectToDatabase();
    var mind = new LoaderUnit_1.LoaderUnit("Zedskee", "Zampino", "Mind");
    var soul = new LoaderUnit_1.LoaderUnit("Wilhelm", "Zampino", "Mind");
    var spirit = new LoaderUnit_1.LoaderUnit("Through-The-Door", "Zampino", "Mind");
    var heart = new LoaderUnit_1.LoaderUnit("Z", "Zampino", "Mind");
    var body = new LoaderUnit_1.LoaderUnit("Joshua", "Zampino", "Mind");
    await addUnit(db, mind);
    await addUnit(db, soul);
    await addUnit(db, spirit);
    await addUnit(db, heart);
    await addUnit(db, body);
}
// Call the main function
main().catch(console.error);
//# sourceMappingURL=loader.js.map