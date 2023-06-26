import db from './models/index.js';
const Accounts = db.Account;
const Owners = db.Owner;
const Candidates = db.Candidate;
const Stores = db.Store;
const Contracts = db.Contract;
const Applications = db.Application;

export default async () => {
  try {
    const ownerAccount = await Accounts.create({
      username: 'adminA',
      password: 'admin',
      role: 'owner',
    });
    const candidateAccount = await Accounts.create({
      username: 'adminB',
      password: 'admin',
      role: 'candidate',
    });
    const owner = await Owners.create({
      fullName: 'Nguyen Van A',
      phone: '0123456789',
      email: 'adminA@gmail.com',
      dob: '2001-01-01',
      avatar: 'https://picsum.photos/200',
      address: 'Ho Chi Minh',
      gender: true,
      fk_accountId: ownerAccount.id,
    });
    const candidate = await Candidates.create({
      phone: '0123456789',
      fullName: 'Nguyen Van B',
      email: 'adminB@gmail.com',
      dob: '2001-01-01',
      avatar: 'https://picsum.photos/200',
      gender: true,
      address: 'Ho Chi Minh',
      fk_accountId: candidateAccount.id,
    });
    const store = await Stores.create({
      name: 'Store A',
      address: 'Ho Chi Minh',
      phone: '0123456789',
      email: 'StoreA@Gmail.com',
      logo: 'https://picsum.photos/200',
      status: 'active',
      fk_ownerId: owner.id,
    });
    const contract = await Contracts.create({
      fk_candidateId: candidate.id,
      fk_storeId: store.id,
      status: 'active',
      expiredAt: '2025-12-31',
    });
    const application = await Applications.create({
      fk_candidateId: candidate.id,
      fk_storeId: store.id,
      status: 'passed',
    });
  } catch (err) {
    console.log(err);
  }
};
