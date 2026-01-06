const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const fixIndex = async () => {
  try {
    console.log("Connecting to Database...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected.");
    
    console.log("Attempting to drop 'username_1' index...");
    try {
        // Access the raw collection and drop the index
        await mongoose.connection.collection('users').dropIndex('username_1');
        console.log("✅ Success! The 'username_1' index has been dropped.");
    } catch (err) {
        if (err.code === 27) {
            console.log("ℹ️ Index 'username_1' not found. It might have already been removed.");
        } else {
            console.error("❌ Failed to drop index:", err.message);
        }
    }
    
    console.log("You can now restart your server and Sign Up.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Connection Error:", error);
    process.exit(1);
  }
};

fixIndex();
