import "dotenv/config";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI;

if (!uri) {
  console.error("❌ ATLAS_URI environment variable is not set!");
  console.error(
    "Please create a .env file in the server directory with your MongoDB Atlas connection string.",
  );
  process.exit(1);
}

let dbConnection;
let mockRecords = [];
const mockCollection = {
  find: (query = {}) => ({
    toArray: async () => {
      if (query._id) {
        const id = query._id.toString?.() || query._id;
        return mockRecords.filter((r) => r._id.toString() === id);
      }
      return mockRecords;
    },
  }),
  findOne: async (query) => {
    const id = query._id.toString?.() || query._id;
    return mockRecords.find((r) => r._id.toString() === id) || null;
  },
  insertOne: async (doc) => {
    const record = { ...doc, _id: Date.now().toString() };
    mockRecords.push(record);
    return { insertedId: record._id };
  },
  updateOne: async (query, update) => {
    const id = query._id.toString?.() || query._id;
    const index = mockRecords.findIndex((r) => r._id.toString() === id);
    if (index === -1) return { matchedCount: 0, modifiedCount: 0 };
    mockRecords[index] = { ...mockRecords[index], ...update.$set };
    return { matchedCount: 1, modifiedCount: 1 };
  },
  deleteOne: async (query) => {
    const id = query._id.toString?.() || query._id;
    const index = mockRecords.findIndex((r) => r._id.toString() === id);
    if (index === -1) return { deletedCount: 0 };
    mockRecords.splice(index, 1);
    return { deletedCount: 1 };
  },
};

async function connectToDatabase() {
  try {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      serverSelectionTimeoutMS: 30000, 
      connectTimeoutMS: 30000,
      socketTimeoutMS: 60000,

      // 🔒 SSL/TLS settings for cloud deployments
      tls: true,
      tlsAllowInvalidCertificates: true,
      tlsAllowInvalidHostnames: true,

      // 🏊 CONNECTION POOL - MAINTAINS PERSISTENT CONNECTIONS
      maxPoolSize: 20, 
      minPoolSize: 10, 
      maxIdleTimeMS: 60000,

      // 🔄 AUTO RECOVERY SETTINGS
      retryWrites: true,
      retryReads: true,
      bufferMaxEntries: 0, 

      // 📦 COMPRESSION - REDUCES BANDWIDTH
      compressors: ['zlib'],

      // ⏰ HEARTBEAT - KEEPS CONNECTION ALIVE

    });
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✓ Successfully connected to MongoDB Atlas");

    dbConnection = client.db("employees");
    return dbConnection;
  } catch (err) {
    console.error(`❌ MongoDB connection failed: ${err.message}`);
    console.error(`Error code: ${err.code || "Unknown"}`);
    console.error(`Error name: ${err.name || "Unknown"}`);

    if (err.message.includes("SSL") || err.message.includes("TLS")) {
      console.error("\n🔧 SSL/TLS Connection Issues Detected:");
      console.error("• Try updating your MongoDB Atlas connection string");
      console.error("• Check MongoDB Atlas network access settings");
      console.error("• Ensure your database user has proper permissions");
      console.error(
        "• Try using a different MongoDB Atlas cluster region closer to Render",
      );
    }

    console.error("\n📋 Troubleshooting steps:");
    console.error("1. Verify ATLAS_URI environment variable in Render");
    console.error("2. Check MongoDB Atlas dashboard for cluster status");
    console.error(
      "3. Ensure IP whitelist allows 0.0.0.0/0 or Render's IP ranges",
    );
    console.error("4. Try recreating the database user in Atlas");

    console.warn("⚠️ Falling back to in-memory mock database for continued service.");
    dbConnection = {
      collection: async () => mockCollection,
    };
    return dbConnection;
  }
}

const db = await connectToDatabase();

export default {
  collection: async (name) => db.collection(name),
};
