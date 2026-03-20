import "dotenv/config";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const uri = process.env.ATLAS_URI;
let realDb = null;
let mockRecords = [];

// Mock collection for in-memory storage (when MongoDB unavailable)
const mockCollection = {
  find: (query = {}) => {
    return {
      toArray: async () => {
        if (query._id) {
          const id = query._id.toString?.() || query._id;
          return mockRecords.filter(r => r._id.toString() === id);
        }
        return mockRecords;
      },
    };
  },
  findOne: async (query) => {
    const id = query._id.toString?.() || query._id;
    return mockRecords.find(r => r._id.toString() === id) || null;
  },
  insertOne: async (doc) => {
    const newDoc = { ...doc, _id: new ObjectId() };
    mockRecords.push(newDoc);
    return { insertedId: newDoc._id };
  },
  updateOne: async (query, update) => {
    const id = query._id.toString?.() || query._id;
    const idx = mockRecords.findIndex(r => r._id.toString() === id);
    if (idx === -1) return { matchedCount: 0, modifiedCount: 0 };
    mockRecords[idx] = { ...mockRecords[idx], ...update.$set };
    return { matchedCount: 1, modifiedCount: 1 };
  },
  deleteOne: async (query) => {
    const id = query._id.toString?.() || query._id;
    const idx = mockRecords.findIndex(r => r._id.toString() === id);
    if (idx === -1) return { deletedCount: 0 };
    mockRecords.splice(idx, 1);
    return { deletedCount: 1 };
  },
};

let defaultExport;

async function initDb() {
  if (!uri) {
    console.warn("⚠️  Using in-memory mock database (ATLAS_URI not set)");
    return {
      collection: async () => mockCollection,
    };
  }

  try {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      serverSelectionTimeoutMS: 5000,
      tls: true,
      tlsAllowInvalidCertificates: false,
      tlsInsecure: false,
      retryWrites: true,
    });

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✓ Connected to MongoDB Atlas");
    realDb = client.db("employees");
    return {
      collection: async (name) => realDb.collection(name),
    };
  } catch (err) {
    console.warn(`⚠️  MongoDB connection failed: ${err.message}. Using in-memory mock database.`);
    return {
      collection: async () => mockCollection,
    };
  }
}

defaultExport = await initDb();

export default defaultExport;