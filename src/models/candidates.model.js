export default (sequelize, DataTypes) => {
  const Candidate = sequelize.define('candidates', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    fullName: {
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
    address: {
      type: DataTypes.STRING,
    },
  });

  return Candidate;
};
