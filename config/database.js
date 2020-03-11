module.exports = {
  connectionString: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@secureapp-db-hvz1s.mongodb.net/test?retryWrites=true`,
  dbName: 'SecureAppDB'
};
