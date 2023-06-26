import { verify } from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  const beartoken = req.headers.authorization;
  if (beartoken) {
    const token = beartoken.split(' ')[1];
    try {
      const tokenDecoded = verify(token, process.env.JWT_SECRET_KEY);
      if (tokenDecoded) {
        req.accountId = tokenDecoded.id;
        next();
      }
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized!' });
      return;
    }
  } else {
    res.status(401).json({ message: 'Unauthorized!' });
    return;
  }
};

export default verifyToken;
