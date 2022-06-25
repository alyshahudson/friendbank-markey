const apiErrorHandler = require('../utils/apiErrorHandler');
const getCampaignForDomain = require('../db/getCampaignForDomain');

module.exports = ({ db }) => {
  async function loadCampaign(req, res, next) {
    try {
      console.log("loadCampagin fx")
      const host = req.get('host');

      const campaign = await getCampaignForDomain(db, host);
      console.log("host: ", host)


      if (campaign instanceof Error) {
        console.log("campaign errors: ", host)
        throw campaign;
      }

      if (!campaign) {
        res.status(403).json({ error: 'Not authorized campaign' });
        return;
      }

      req.campaign = campaign;
      next();
    } catch (error) {
      apiErrorHandler(res, error);
    }
  }

  return loadCampaign;
};
