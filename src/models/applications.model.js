export default (sequelize, DataTypes) => {
  const Application = sequelize.define('applications', {
    status: {
      type: DataTypes.STRING,
    },
  });

  return Application;
};
