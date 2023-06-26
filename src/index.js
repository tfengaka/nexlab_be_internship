import express from 'express';
import cors from 'cors';
import db, { connectDatabase } from '~/models';

const InitializeServer = () => {
  const app = express();
  app.use(
    cors({
      origin: '*',
    })
  );
  app.use(express.json());
  db.sequelize.sync({ force: true });

  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to application.' });
  });

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
