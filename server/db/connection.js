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
      // 🚀 PRODUCTION CONNECTION SETTINGS FOR 24/7 UPTIME
      serverSelectionTimeoutMS: 30000, // How long to wait for server selection (30s)
      connectTimeoutMS: 30000,         // Initial connection timeout (30s)
      socketTimeoutMS: 60000,          // Socket operation timeout (60s)

      // 🔒 SSL/TLS settings for cloud deployments
      tls: true,
      tlsAllowInvalidCertificates: true,
      tlsAllowInvalidHostnames: true,

      // 🏊 CONNECTION POOL - MAINTAINS PERSISTENT CONNECTIONS
      maxPoolSize: 20,        // Maximum connections in pool (increased for production)
      minPoolSize: 10,        // Minimum connections to maintain (prevents cold starts)
      maxIdleTimeMS: 60000,   // Keep connections alive for 60 seconds when idle

      // 🔄 AUTO RECOVERY SETTINGS
      retryWrites: true,      // Automatically retry failed writes
      retryReads: true,       // Automatically retry failed reads
      bufferMaxEntries: 0,    // Don't buffer operations when disconnected

      // 📦 COMPRESSION - REDUCES BANDWIDTH
      compressors: ['zlib'],

      // ⏰ HEARTBEAT - KEEPS CONNECTION ALIVE
      heartbeatFrequencyMS: 10000,  // Check connection every 10 seconds
    });
    });

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✓ Successfully connected to MongoDB Atlas");

    dbConnection = client.db("employees");
    return dbConnection;
  } catch (err) {
    console.error(`❌ MongoDB connection failed: ${err.message}`);
    console.error(`Error code: ${err.code || 'Unknown'}`);
    console.error(`Error name: ${err.name || 'Unknown'}`);

    if (err.message.includes('SSL') || err.message.includes('TLS')) {
      console.error('\n🔧 SSL/TLS Connection Issues Detected:');
      console.error('• Try updating your MongoDB Atlas connection string');
      console.error('• Check MongoDB Atlas network access settings');
      console.error('• Ensure your database user has proper permissions');
      console.error('• Try using a different MongoDB Atlas cluster region closer to Render');
    }

    console.error('\n📋 Troubleshooting steps:');
    console.error('1. Verify ATLAS_URI environment variable in Render');
    console.error('2. Check MongoDB Atlas dashboard for cluster status');
    console.error('3. Ensure IP whitelist allows 0.0.0.0/0 or Render\'s IP ranges');
    console.error('4. Try recreating the database user in Atlas');

    process.exit(1);
  }
}

const db = await connectToDatabase();

export default {
  collection: async (name) => db.collection(name),
};