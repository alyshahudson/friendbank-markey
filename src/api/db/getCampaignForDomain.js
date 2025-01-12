const createApiError = require('../utils/createApiError');

module.exports = async function getCampaignForDomain(db, domain) {
  try {
    console.log("ENV")
    console.log(process.env);

    const campaigns = db.collection('campaigns');

    const campaign = await campaigns.findOne({ domains: domain });

    console.log("campaign")
    console.log(campaign)
    return campaign;
  } catch (error) {
    return createApiError(error, 500, 'Error retrieving campaign from database');
  }
}
