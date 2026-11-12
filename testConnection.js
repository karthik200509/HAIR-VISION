const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from backend/.env
dotenv.config({ path: path.resolve(__dirname, '.env') });

const maskUri = (uri) => {
  if (!uri) return '[No URI Provided]';
  return uri.replace(/:\/\/([^:]+):([^@]+)@/, '://$1:********@');
};

async function testMongoAtlasConnection() {
  console.log('====================================================');
  console.log('       🔍 HairVision MongoDB Atlas Connection Test   ');
  console.log('====================================================');

  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!uri || uri.trim() === '') {
    console.error('❌ ERROR: process.env.MONGO_URI is missing or empty in backend/.env!');
    console.log('Please add your MongoDB Atlas connection string to backend/.env:');
    console.log('MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/hairvision?retryWrites=true&w=majority\n');
    process.exit(1);
  }

  const maskedUri = maskUri(uri);
  console.log(`📌 Target Connection String: ${maskedUri}`);
  console.log('⏳ Connecting to MongoDB Atlas cluster...');

  try {
    const startTime = Date.now();
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 6000,
    });
    const duration = Date.now() - startTime;

    console.log('\n✅ SUCCESS: Connected to MongoDB Atlas successfully!');
    console.log(`   Host:     ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    console.log(`   State:    Connected (ReadyState: ${conn.connection.readyState})`);
    console.log(`   Latency:  ${duration}ms`);

    await mongoose.disconnect();
    console.log('🔌 Disconnected cleanly.');
    console.log('====================================================\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ FAILED: Could not connect to MongoDB Atlas cluster.');
    console.error(`   Error Name:    ${error.name}`);
    console.error(`   Error Message: ${error.message}`);

    console.log('\n💡 Diagnostic Tips:');
    if (error.message.includes('querySrv') || error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      console.log('   1. Domain Resolution Issue:');
      console.log('      Your URI hostname is currently set to: ' + (uri.split('@')[1] ? uri.split('@')[1].split('/')[0] : 'unknown'));
      console.log('      MongoDB Atlas cluster hostnames have a unique cluster ID, e.g.:');
      console.log('      cluster0.abc12.mongodb.net  (instead of just cluster.mongodb.net)');
      console.log('      Please copy the exact connection string from MongoDB Atlas:');
      console.log('      Atlas Dashboard -> Database -> Connect -> Drivers -> copy connection string.');
    } else if (error.message.includes('Authentication failed') || error.message.includes('bad auth')) {
      console.log('   2. Authentication Failed:');
      console.log('      Check your database username and password in backend/.env.');
      console.log('      Ensure special characters in password are URL-encoded if necessary.');
    } else if (error.message.includes('whitelist') || error.message.includes('timed out')) {
      console.log('   3. IP Whitelist Issue:');
      console.log('      In MongoDB Atlas dashboard, go to Network Access -> Add IP Address -> Allow Access from Anywhere (0.0.0.0/0).');
    }
    console.log('====================================================\n');
    process.exit(1);
  }
}

testMongoAtlasConnection();
