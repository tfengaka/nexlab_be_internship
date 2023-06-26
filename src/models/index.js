'use strict';

import Sequelize from 'sequelize';
import baseConfig from '~/config/config.json';

import AccountModel from './accounts.model';
import OwnerModel from './owners.model';
import CandidateModel from './candidates.model';
import StoreModel from './stores.model';
import ContractModel from './contracts.model';
import ApplicationModel from './applications.model';

const env = process.env.NODE_ENV || 'development';
const config = baseConfig[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.Account = AccountModel(sequelize, Sequelize.DataTypes);
db.Owner = OwnerModel(sequelize, Sequelize.DataTypes);
db.Candidate = CandidateModel(sequelize, Sequelize.DataTypes);
db.Store = StoreModel(sequelize, Sequelize.DataTypes);
db.Contract = ContractModel(sequelize, Sequelize.DataTypes);
db.Application = ApplicationModel(sequelize, Sequelize.DataTypes);

// Account relationship
db.Account.hasOne(db.Owner, { foreignKey: 'fk_accountId', targetKey: 'id' });
db.Account.hasOne(db.Candidate, { foreignKey: 'fk_accountId', targetKey: 'id' });
db.Owner.belongsTo(db.Account, { foreignKey: 'fk_accountId' });
db.Candidate.belongsTo(db.Account, { foreignKey: 'fk_accountId' });

// Store relationship
db.Owner.hasMany(db.Store, { foreignKey: 'fk_ownerId', as: 'stores' });
db.Store.belongsTo(db.Owner, { foreignKey: 'fk_ownerId', as: 'owners' });

// Application relationship
db.Candidate.hasOne(db.Application, { foreignKey: 'fk_candidateId', targetKey: 'id' });
db.Store.hasOne(db.Application, { foreignKey: 'fk_storeId', targetKey: 'id' });
db.Application.belongsTo(db.Candidate, { foreignKey: 'fk_candidateId' });
db.Application.belongsTo(db.Store, { foreignKey: 'fk_storeId' });

// Contract relationship
db.Candidate.hasOne(db.Contract, { foreignKey: 'fk_candidateId', targetKey: 'id' });
db.Store.hasOne(db.Contract, { foreignKey: 'fk_storeId', targetKey: 'id' });
db.Contract.belongsTo(db.Candidate, { foreignKey: 'fk_candidateId' });
db.Contract.belongsTo(db.Store, { foreignKey: 'fk_storeId' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export async function connectDatabase() {
  try {
    await sequelize.authenticate();
  } catch (error) {
    throw error;
  }
}

export default db;
