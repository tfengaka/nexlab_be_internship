export default (sequelize, DataTypes) => {
  const Store = sequelize.define('stores', {
    name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    logo: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
  });
  return Store;
};
