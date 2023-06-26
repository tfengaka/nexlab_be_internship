import db from '~/models/index.js';
const Stores = db.Store;

const StoreController = {
  getStoresByOwner: async (req, res) => {
    const { ownerId } = req.params;
    try {
      const stores = await Stores.findAll({
        where: { fk_ownerId: ownerId },
      });
      return res.status(200).json(stores);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  createStore: async (req, res) => {
    const {
      user: { id },
      role,
    } = req;
    const { name, email, address, phone, logo } = req.body;
    if (role !== 'owner') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    try {
      const store = await Stores.create({
        name,
        email,
        address,
        phone,
        logo,
        status: 'active',
        fk_ownerId: id,
      });
      return res.status(201).json({ message: 'Create store successfully', store });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};

export default StoreController;
