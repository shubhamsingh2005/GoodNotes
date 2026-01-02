require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ MONGO_URI is missing from .env");
  process.exit(1);
}

console.log("📝 Testing MongoDB Connection...");

// mask password for safety in logs
const maskedUri = uri.replace(/:([^:@]+)@/, ':****@');
console.log(`🔗 URI: ${maskedUri}`);

try {
    // Try to parse it to see if it's valid
    // Note: mongodb+srv URLs might not parse with standard URL object in older node versions correctly without protocols, 
    // but let's check basic structure.
    if (!uri.startsWith('mongodb')) {
        console.error("❌ URI does not start with 'mongodb://' or 'mongodb+srv://'");
    }
} catch (e) {
    console.error("❌ Invalid URL format");
}

mongoose.connect(uri)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Connection Failed:");
    console.error(err.message);
    if (err.code === 'ENOTFOUND') {
        console.error("👉 TIP: This is a DNS error. Check your Hostname (the part after '@').");
    }
    process.exit(1);
  });
