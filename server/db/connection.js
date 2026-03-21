import "dotenv/config";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI;

if (!uri) {
  console.error("❌ ATLAS_URI environment variable is not set!");
  console.error("Please create a .env file in the server directory with your MongoDB Atlas connection string.");
  process.exit(1);
}

let dbConnection;

async function connectToDatabase() {
  try {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      serverSelectionTimeoutMS: 10000, // Increased timeout
      tls: true,
      tlsAllowInvalidCertificates: false,
      retryWrites: true,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✓ Successfully connected to MongoDB Atlas");

    dbConnection = client.db("employees");
    return dbConnection;
  } catch (err) {
    console.error(`❌ MongoDB connection failed: ${err.message}`);
    console.error("Please check your ATLAS_URI environment variable and MongoDB Atlas network access settings.");
    console.error("The application cannot function without a proper database connection.");
    process.exit(1);
  }
}

const db = await connectToDatabase();

export default {
  collection: async (name) => db.collection(name),
};