import dotenv from "dotenv";
import pkg from "pg";

const { Pool } = pkg;

// Load environment variables from .env
dotenv.config();

// Read database URL from .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log("✅ Connected to PostgreSQL successfully!");
    client.release();
  } catch (err) {
    console.error("❌ Failed to connect to PostgreSQL:", err);
  } finally {
    pool.end();
  }
}

testConnection();
