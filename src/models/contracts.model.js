export default (sequelize, DataTypes) => {
  const Contract = sequelize.define('contracts', {
    status: {
      type: DataTypes.STRING,
    },
    expiredAt: {
      type: DataTypes.DATE,
    },
  });

  return Contract;
};
