import db from '~/models/index';
const Applications = db.Application;

const ApplicationController = {
  applyToStore: async (req, res) => {
    const { storeId } = req.params;
    const { id: candidateId } = req.user;
    try {
      const application = await Applications.create({
        fk_candidateId: candidateId,
        fk_storeId: storeId,
        status: 'pending',
      });
      return res.status(201).json({
        message: 'Apply to store successfully',
        applicationId: application.id,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};

export default ApplicationController;
