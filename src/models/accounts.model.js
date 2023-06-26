export default (sequelize, DataTypes) => {
  const Account = sequelize.define('accounts', {
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'candidate',
    },
  });
  return Account;
};
