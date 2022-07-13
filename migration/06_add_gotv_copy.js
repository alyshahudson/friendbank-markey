const { MongoClient, ObjectId } = require('mongodb');

const {
  MONGODB_URL,
} = process.env;

const { ENGLISH, SPANISH } = require('../src/shared/lang');

(async function() {
  const client = await MongoClient.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  db = client.db();

  const campaigns = db.collection('campaigns');

  const markeyCampaign = await campaigns.findOne({ domains: 'support.edmarkey.com' });

  const copy = JSON.stringify({
    ...JSON.parse(markeyCampaign.copy),
    'idQuestions.vote.label': {
      [ENGLISH]: 'Are you planning to vote by mail for Kyle Parrish in the North Carolina District 5 Congressional Election?',
    },
    'idQuestions.vote.subtitle': {
      [ENGLISH]: 'Voting by mail is the easiest way to make your voice heard in this election, and yet Republicans are trying to pass laws to make it harder to vote by mail. Make sure you follow all the rules and fill out the correct forms to Vote Early by Mail. Skip the polls, stay safe, and get your vote for Kyle Parrish in early -- vote by mail!',
    },
    'idQuestions.vote.options': {
      [ENGLISH]: [
        'Yes, and I’ve already sent in my vote by mail application',
        'Yes, and I need a vote by mail application',
        'No, I’m not sure about voting by mail',
        'I’d like to learn more about voting by mail',
      ],
    },
    'actions.gotv.label': {
      [ENGLISH]: 'GOTV Actions',
    },
    'actions.gotv.options': {
      [ENGLISH]: [
        'Received Ballot Application',
        'Mailed in Ballot Application',
        'Received Ballot',
        'Voted for Kyle! (Mailed in completed ballot)',
      ],
    },
  });

  await campaigns.updateOne(
    { domains: 'support.edmarkey.com' },
    {
      '$set': {
        copy,
      },
    },
  );

  process.exit(0);
})();
