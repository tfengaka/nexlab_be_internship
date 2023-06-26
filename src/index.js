import express from 'express';
import cors from 'cors';
import db, { connectDatabase } from '~/models';
import createExampleData from './data';

import API_ROUTER from './routes/index';

const InitializeServer = () => {
  const app = express();
  app.use(
    cors({
      origin: '*',
    })
  );
  app.use(express.json({ limit: '25mb' }));

  db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and re-sync db.');
    createExampleData();
  });

  app.use('/api', API_ROUTER);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

connectDatabase()
  .then(() => console.log('Connection has been established successfully.'))
  .then(() => InitializeServer())
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });
