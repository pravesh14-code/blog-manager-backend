require('dotenv').config();
const app = require('./src/app');
const logger = require('./src/utils/logger');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

async function testDB() {
  try {
    await prisma.$connect();
    logger.info('✅ Connected to database successfully');
  } catch (err) {
    logger.error('❌ Failed to connect to database:', err.message);
    process.exit(1);
  }
}

testDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${PORT}`);
  });
});
