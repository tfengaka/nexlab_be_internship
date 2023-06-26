import jwt from 'jsonwebtoken';
import db from '~/models/index.js';
const Accounts = db.Accounts;

const SignIn = async (req, res) => {
  const { username, password } = req.body;
  const account = await Accounts.findOne({
    where: { username },
    include: [
      {
        model: db.Owner,
        where: { fk_accountId: db.Sequelize.col('owners.fk_accountId') },
      },
    ],
  });
  const isMatchPwd = account.password === password;
  if (!account || !isMatchPwd) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  const token = jwt.sign({ id: account.id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
  return res.status(200).json({ account, access_token: token });
};

export default AuthController = { SignIn };
