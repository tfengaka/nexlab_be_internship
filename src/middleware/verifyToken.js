import { verify } from 'jsonwebtoken';
import db from '~/models/index.js';
const Owners = db.Owner;
const Candidates = db.Candidate;

const verifyToken = async (req, res, next) => {
  const beartoken = req.headers.authorization;
  if (beartoken) {
    const token = beartoken.split(' ')[1];
    try {
      const tokenDecoded = verify(token, 'JWT_SECRET');
      if (tokenDecoded) {
        const { id, role } = tokenDecoded;
        if (role === 'owner') {
          const me = await Owners.findOne({
            where: { fk_accountId: id },
          });
          const { fk_accountId: _, ...meData } = me.dataValues;
          const userData = {
            ...meData,
            gender: meData.gender ? 'Nam' : 'Nữ', // 1: Nam, 0: Nữ
          };
          req.user = userData;
        } else {
          const me = await Candidates.findOne({
            where: { fk_accountId: id },
          });
          const { fk_accountId: _, ...meData } = me.dataValues;
          const userData = {
            ...meData,
            gender: meData.gender ? 'Nam' : 'Nữ', // 1: Nam, 0: Nữ
          };
          req.user = userData;
        }
        req.role = role;
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
