import { MongoClient, Db, Collection, ObjectId } from 'mongodb';
import { LoaderUnit } from '../eng/LoaderUnit';
import * as fs from 'fs';
import * as readline from 'readline';

// Function to connect to MongoDB
async function connectToDatabase(): Promise<Db> {
  const uri = 'mongodb://localhost:27017'; // MongoDB connection URI
  const client = new MongoClient(uri);
  await client.connect(); // Connect to MongoDB
  console.log('Connected to MongoDB');
  return client.db('worldcomputer'); // Return the database object
}

// Function to insert a user document into the database
async function addUnit(db: Db, unit: IUnit): Promise<void> {
  const unitCollection: Collection<IUnit> = db.collection(unit.displayType());
  await unitCollection.insertOne(unit);
  console.log('User inserted:', unit);
}

// Function to read names from a file line by line
function readNamesFromFile(filename: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const names: string[] = [];

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
  var collection_name ="Heart" 
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

      var unit = new LoaderUnit(
        splitName[0].trim(), // Trim to remove leading/trailing spaces
        splitName[1].trim(),
        collection_name
      );

      await addUnit(db, unit);
    }

    console.log('All units added successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
}

async function main_me() {
  const db = await connectToDatabase();

  var mind = new LoaderUnit("Zedskee", "Zampino", "Mind")
  var soul = new LoaderUnit("Wilhelm", "Zampino", "Mind")
  var spirit = new LoaderUnit("Through-The-Door", "Zampino", "Mind")
  var heart = new LoaderUnit("Z", "Zampino", "Mind")
  var body = new LoaderUnit("Joshua", "Zampino", "Mind")

  await addUnit(db, mind);
  await addUnit(db, soul);
  await addUnit(db, spirit);
  await addUnit(db, heart);
  await addUnit(db, body);


}

// Call the main function
main().catch(console.error);
