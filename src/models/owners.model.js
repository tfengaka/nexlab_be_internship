export default (sequelize, DataTypes) => {
  const Owner = sequelize.define('owners', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
    },
    fullName: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    dob: {
      type: DataTypes.DATE,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.BOOLEAN,
    },
  });

  return Owner;
};
