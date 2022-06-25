module.exports = async function findUser(db, email, campaign) {
  try {
    const users = db.collection('users');

    const campaignId = typeof campaign === 'string'
      ? campaign
      : campaign._id.toString();

    const user = await users.findOne({
      email,
      campaign: campaignId,
    });
    console.log("user")
    console.log(user)
    return user;
  } catch (error) {
    return error;
  }
}
