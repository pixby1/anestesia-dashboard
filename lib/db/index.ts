// Packages
import { connect } from 'mongoose';

let cacheDb: any = null;

async function connectToDB(uri: string) {
  if (cacheDb) {
    console.log('> Using cached database instance');
    return Promise.resolve(cacheDb);
  }
  console.log('> DB is connected');
  const db = await connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    ssl: true
  });
  cacheDb = db;
  return cacheDb;
}

export { connectToDB };
