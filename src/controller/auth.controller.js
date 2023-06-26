import jwt from 'jsonwebtoken';
import db from '~/models/index.js';
const Accounts = db.Account;
const Owners = db.Owner;
const Candidates = db.Candidate;

const AuthController = {
  SignIn: async (req, res) => {
    const { username, password } = req.body;
    const account = await Accounts.findOne({
      where: { username, password },
      attributes: ['id', 'username', 'role'],
    });
    if (!account) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: account.id, role: account.role }, 'JWT_SECRET', {
      expiresIn: '1d',
    });
    return res.status(200).json({ username: account.username, access_token: token });
  },
  getMe: async (req, res) => {
    const { user, role } = req;
    return res.status(200).json({ ...user, role });
  },
};

export default AuthController;
