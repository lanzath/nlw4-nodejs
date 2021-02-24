import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      database:
        process.env.NODE_ENV === 'test'
        ? './src/database/database.test.sqlite'
        : defaultOptions.database,
      logging: process.env.NODE_ENV === 'test'
      ? false
      : defaultOptions.logging,
    })
  );
};
