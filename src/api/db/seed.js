const { MongoClient, ObjectId } = require('mongodb');
const { passwordHash } = require('../utils/auth');
const { ENGLISH, SPANISH } = require('../../shared/lang');
const { STAFF_ROLE } = require('../../shared/roles');
const { TRANSACTIONAL_EMAIL } = require('../../shared/emailFrequency');

(async function() {
  console.log('Seeding database...');

  const client = await MongoClient.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  db = client.db();

  await db.dropDatabase();

  const defaultMediaObjects = [
    {
      _id: 'default',
      type: 'image',
      source: 'https://kyleparrish.s3.amazonaws.com/websiteimages/fwdparrishgraphics+(1)/fulllogo+Sideways.png',
      alt: 'Ed at the Podium',
    },
    {
      _id: 'hoops',
      type: 'image',
      source: 'https://kyleparrish.s3.amazonaws.com/websiteimages/fwdparrishgraphics+(1)/fulllogo+Sideways.png',
      alt: 'Ed shooting hoops',
    },
    {
      _id: 'air-flight-89',
      type: 'image',
      source: 'https://kyleparrish.s3.amazonaws.com/websiteimages/fwdparrishgraphics+(1)/fulllogo+Sideways.png',
      alt: 'Ed wearing his pair of Air Flight ‘89s',
    },
    {
      _id: 'ed-clapping',
      type: 'image',
      source: 'https://kyleparrish.s3.amazonaws.com/websiteimages/fwdparrishgraphics+(1)/fulllogo+Sideways.png',
      alt: 'Ed clapping at an event',
    },
    {
      _id: 'ed-climate-march',
      type: 'image',
      source: 'https://kyleparrish.s3.amazonaws.com/websiteimages/fwdparrishgraphics+(1)/fulllogo+Sideways.png',
      alt: 'Ed at a climate march with young students',
    },
    {
      _id: 'ed-serving',
      type: 'image',
      source: 'https://kyleparrish.s3.amazonaws.com/websiteimages/fwdparrishgraphics+(1)/fulllogo+Sideways.png',
      alt: 'Ed serving food',
    },
    {
      _id: 'ed-seiu',
      type: 'image',
      source: 'https://kyleparrish.s3.amazonaws.com/websiteimages/fwdparrishgraphics+(1)/fulllogo+Sideways.png',
      alt: 'Ed standing with supporters',
    },
    {
      _id: 'ed-laughing',
      type: 'image',
      source: 'https://kyleparrish.s3.amazonaws.com/websiteimages/fwdparrishgraphics+(1)/fulllogo+Sideways.png',
      alt: 'Ed laughing',
    },
    {
      _id: 'ed-ew-supporters',
      type: 'image',
      source: 'https://kyleparrish.s3.amazonaws.com/websiteimages/fwdparrishgraphics+(1)/fulllogo+Sideways.png',
      alt: 'Ed standing with supporters'
    },
    {
      _id: 'ed-unite-here',
      type: 'image',
      source: 'https://kyleparrish.s3.amazonaws.com/websiteimages/fwdparrishgraphics+(1)/fulllogo+Sideways.png',
      alt: 'Ed marching with a labor union',
    },
  ];

  const media = db.collection('media');
  await media.insertMany(defaultMediaObjects);

  const config = JSON.stringify({
    disableNavDonate: true,
    media: defaultMediaObjects.map((object) => object._id),
    defaultMedia: {
      _id: 'ed-climate-march',
      type: 'image',
      source: 'https://kyleparrish.s3.amazonaws.com/websiteimages/fwdparrishgraphics+(1)/fulllogo+Sideways.png',
      alt: 'Ed at a climate march with young students',
    },
  });

  const copy = JSON.stringify({
    'idQuestions.support.label': {
      [ENGLISH]: 'Will you commit tvote to elect Kyle Parrish to Congress for the North Carolina 5th Congressional District?',
      [SPANISH]: '¿Comprometerá votar para elegir a Kyle Parrish al Congreso por el 5to Distrito Congresional de Carolina del Norte?',
    },
    'idQuestions.support.options': {
      [ENGLISH]: [
        'Definitely',
        'Probably',
        'Undecided',
        'Probably not',
        'Definitely not',
        'Too Young/Ineligible to Vote',
      ],
      [SPANISH]: [
        'Definitivamente',
        'Probablemente',
        'Indeciso',
        'Probablemente no',
        'Definitivamente no',
        'Demasiado joven/Inelegible para votar',
      ],
    },
    'idQuestions.volunteer.label': {
      [ENGLISH]: 'Will you volunteer with Team Parrish?',
      [SPANISH]: '¿Quiéres ser voluntario con el Equipo Parrish?',
    },
    'idQuestions.volunteer.options': {
      [ENGLISH]: [
        'Yes',
        'Maybe',
        'Later',
        'No',
      ],
      [SPANISH]: [
        'Sí',
        'Tal vez',
        'Más tarde',
        'No',
      ],
    },
    'idQuestions.vote.label': {
      [ENGLISH]: 'Are you planning to vote by mail for Kyle in the North Carolina 5th District Congressional Election?',
    },
    'idQuestions.vote.subtitle': {
      [ENGLISH]: 'Voting by mail is the safest way to make your voice heard in this election, and new laws have expanded access to vote by mail in North Carolina for every registered voter. An application to vote by mail will be mailed to each registered voter in MA (or you can download one and mail or email it in). Just complete that application, send it back, and you’ll receive a ballot to vote for Ed by mail. Skip the polls, stay safe, and get your vote for Ed in early -- vote by mail!',
    },
    'idQuestions.vote.options': {
      [ENGLISH]: [
        'Yes, and I’ve already sent in my vote by mail application',
        'Yes, and I need a vote by mail application',
        'No, I’m not sure about voting by mail',
        'I’d like to learn more about voting by mail',
      ],
    },
    'voteStatus.label': {
      [ENGLISH]: 'Make a plan to vote for Kyle in the Congressional election!',
    },
    'voteStatus.subtitle': {
      [ENGLISH]: 'Our future and our planet are on the line. Make your voice heard by making a plan to vote for Kyle Parrish in the Massachusetts Senate Primary Election. If you have not already applied to vote by mail, please make a plan to vote early or on Election Day.',
    },
    'voteStatus.options': {
      [ENGLISH]: [
        'I’ve already voted',
        'I’ve received my mail-in ballot and still need to return it',
        'I’m planning to vote early between August 22-28',
        'I’m planning to vote on Election Day, September 1',
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
    'homepage.formTitle': {
      [ENGLISH]: 'Create your own Kyle Parrish supporter page',
      [SPANISH]: 'Crea tu propia página de apoyo para Kyle Parrish',
    },
    'homepage.formSubtitle': {
      [ENGLISH]: 'Our grassroots campaign is powered by people like you who are connecting with family, friends, and neighbors about this important election. Complete the sections below to create your own personal supporter page and reach out to your network about why you’re a member of Team Parrish!',
      [SPANISH]: 'Nuestra campaña está impulsada por gente como tú que se está conectando con familia, amigos y vecinos sobre esta elección importante. Completa las siguientes secciones para crear tu propia página de apoyo personal y hablarle a tus redes de por qué eres miembro del Equipo Parrish!',
    },
    'homepage.customizeTitle': {
      [ENGLISH]: 'Customize your page',
      [SPANISH]: 'Personaliza tu página',
    },
    'homepage.customizeSubtitle': {
      [ENGLISH]: `Fill out the sections below to personalize the title, description, and design of your supporter page to tell your network why you’re #StickingWithKyle. Share your story of why you’re a member of this movement -- feel free to get creative!`,
      [SPANISH]: `Llena las siguientes secciones para personalizar el título, la descripción y el diseño de tu página de apoyo para decirle a tus redes por qué estás #ConKyle. Comparte tu historia de por qué eres miembro de este movimiento. ¡Siéntete libre de ser creativo!`,
    },
    'homepage.formButtonLabel': {
      [ENGLISH]: 'next',
      [SPANISH]: 'siguiente',
    },
    'homepage.createButtonLabel': {
      [ENGLISH]: 'create page',
      [SPANISH]: 'crear página',
    },
    'homepage.defaultTitle': {
      [ENGLISH]: `{{FIRST_NAME}} is #StickingWithKyle because...`,
      [SPANISH]: '{{FIRST_NAME}} está #ConKyle porque...'
    },
    'homepage.defaultSubtitle': {
      [ENGLISH]: 'Kyle will fight to bring the 5th full access to affordable broadband, accessible healthcare, fully funded schools, jobs, and better physical infrastructure!',
      [SPANISH]: 'Kyle luchará para brindarle al quinto acceso completo a banda ancha asequible, atención médica accesible, escuelas totalmente financiadas, empleos y una mejor infraestructura física!',
    },
    'signupPage.postSignupSubtitle': {
      [ENGLISH]: 'Next, keep up the momentum by sharing this link with your friends, family, and network, and help {{FIRST_NAME}} reach their goal! Or, make your own page and get everyone you know to join the fight.',
      [SPANISH]: '¡Mantén el impulso compartiendo este enlace con tus amigos, familia y redes y ayuda a {{FIRST_NAME}} alcanzar su objetivo! O haz tu propia página y haz que todo el que conoces se una a la lucha.',
    },
    'signupPage.postSignupCreateTitle': {
      [ENGLISH]: 'Make your own page',
      [SPANISH]: 'Haz tu propia página',
    },
    'signupPage.postSignupCreateSubtitle': {
      [ENGLISH]: 'Create your own supporter page and become a grassroots organizer for Kyle. We’ll show you how!',
      [SPANISH]: 'Crea tu propia página de apoyo y conviértete en un organizador en tu comunidad para Kyle. ¡Te mostraremos cómo!',
    },
    'signupPage.postSignupCreateButtonLabel': {
      [ENGLISH]: 'Get started',
      [SPANISH]: 'Comenzar',
    },
    'signupPage.modalTitle': {
      [ENGLISH]: `Here's how you can join in and support Kyle's campaign:`,
      [SPANISH]: 'Así es como puede unirse y apoyar la campaña de Kyle',
    },
    'signupPage.modalCopy': {
      [ENGLISH]: [
        `### Send your link far and wide`,
        `Share this page with your network to help us grow Team Parrish! Your friends, family, neighbors, colleagues, roommates, classmates, Facebook friends, Twitter peeps, your Zoom hangout friends -- the sky's the limit, and we need to reach everyone.`,
        `### Relational organizing tips`,
        ` - Call 5 friends and ask them to fill out your link`,
        ` - Email your link to 50 people`,
        ` - Share it on your Facebook and other social media`,
        ` - Go through your contact list in your phone and text the link to at least 10 people!`,
        ' ',
        `### Volunteer with Team Parrish`,
        `[Join the movement here](https://kyleparrishforcongress.com/volunteer).`,
      ],
      [SPANISH]: [
        '### Comparte tu enlace',
        `¡Comparte esta página con tus redes para ayudarnos a crecer el Equipo Parrish! Tus amigos, familia, vecinos, colegas, compañeros de habitación, compañeros de clase, amigos de Facebook, seguidores en Twitter, tus amigos de Zoom...el cielo es el límite y tenemos que llegar a todos.`,
        `### Consejos para organizar relacionalmente`,
        ` - Llama a 5 amigos y pídeles que llenen tu enlace`,
        ` - Envía tu enlace a 50 personas`,
        ` - Compártelo en tu Facebook y otras redes sociales`,
        ` - ¡Revisa la lista de contactos de tu teléfono y envía el enlace al menos a 10 personas!`,
        ` `,
        `### Ser voluntario con el Equipo Parrish`,
        `[Únete al movimiento aquí](https://kyleparrishforcongress.com/volunteer).`,
      ],
    },
    'signupPage.modalCloseLabel': {
      [ENGLISH]: 'Okay, got it',
      [SPANISH]: 'Perfecto, lo tengo.',
    },
    'nav.logoAlt': {
      [ENGLISH]: 'Kyle Parrish For Congress Logo',
      [SPANISH]: 'Logo de Kyle Parrish para el Congress',
    },
    'nav.return': {
      [ENGLISH]: '← return to kyleparrishforcongress.com',
      [SPANISH]: '← volver a kyleparrishforcongress.com',
    },
    'nav.returnLink': {
      [ENGLISH]: 'https://kyleparrishforcongress.com/',
      [SPANISH]: 'https://kyleparrishforcongress.com/es',
    },
    'nav.donateForm': {
      [ENGLISH]: 'https://secure.actblue.com/donate/win5',
    },
    'phonebankPage.title': {
      [ENGLISH]: 'Add a Contact',
      [SPANISH]: 'Añadir un contacto',
    },
    'phonebankPage.subtitle': {
      [ENGLISH]: 'Enter your friends, family, and people in your network. Grow your list of the people you’re personally bringing to this grassroots movement, let Ed know if they support him, and help make sure this campaign reaches its goals.',
      [SPANISH]: 'Añade a tus amigos, familiares y personas de tu red. Crece tu lista de personas que personalmente trajiste a este movimiento impulsado por el pueblo, déjale saber a Ed si lo apoyan y ayuda a la campaña a alcanzar sus metas.',
    },
    'phonebankPage.successfullySubmitted': {
      [ENGLISH]: 'Successfully submitted contact!',
      [SPANISH]: '¡Contacto creado con éxito!',
    },
    'privacyPolicy.label': {
      [ENGLISH]: 'Privacy Policy',
      [SPANISH]: 'Política de privacidad',
    },
    'privacyPolicy.link': {
      [ENGLISH]: 'https://kyleparrishforcongress.com/privacy-policy/',
      [SPANISH]: 'https://kyleparrishforcongress.com/privacy-policy/',
    },
    'politicalDiclaimer': {
      [ENGLISH]: 'PAID FOR BY THE PARRISH COMMITTEE',
      [SPANISH]: 'PAGADO POR THE PARRISH COMMITTEE',
    },
    'smsDisclaimer': {
      [ENGLISH]: 'By providing your cell phone number you consent to receive periodic campaign updates from the Parrish Committee. Text HELP for help, STOP to end. Message & data rates may apply. https://kyleparrishforcongress.com/privacy-policy',
      [SPANISH]: 'Al proporcionar su número de teléfono celular usted consiente en recibir actualizaciones periódicas de la campaña de The Parrish Committee. Envíe un mensaje de texto que diga HELP para pedir ayuda o STOP para descontinuar los mensajes. Pueden aplicar tarifas de mensajes y data. https://kyleparrishforcongress.com/privacy-policy',
    },
    'genericError': {
      [ENGLISH]: 'Looks like we had an error, try again? If this continues to happen, please contact us https://kyleparrishforcongress.com/m/login?r=%2Fcontact-us',
      [SPANISH]: 'Parece que tuvimos un error, ¿intentar de nuevo? Si esto continúa sucediendo, por favor contáctenos https://kyleparrishforcongress.com/m/login?r=%2Fcontact-us',
    },
  });

  const campaigns = db.collection('campaigns');
  const campaignResult = await campaigns.insertOne({
    domains: ['localhost:3000','https://flipthefifth.herokuapp.com','flipthefifth.herokuapp.com'],
    name: 'Parrish',
    copy,
    config,
  });

  const campaign = campaignResult.ops[0];
  const campaignId = campaign._id.toString();

  const hashedPassword = await passwordHash('password');
  const users = db.collection('users');

  const userInsertResult = await users.insertOne({
    campaign: campaignId,
    email: 'admin@friendbank.us',
    password: hashedPassword,
    firstName: 'Joe',
    zip: '00000',
    emailFrequency: TRANSACTIONAL_EMAIL,
    createdAt: Date.now(),
    lastUpdatedAt: Date.now(),
    lastAuthenticationUpdate: Date.now(),
    role: STAFF_ROLE,
  });

  const adminUser = userInsertResult.ops[0];

  const signups = db.collection('signups');
  const signupSeed = new Array(50).fill({
    email: `${Math.round(Math.random() * 10000)}@gmail.com`,
    recruitedBy: adminUser._id.toString(),
    campaign: campaign._id.toString(),
    type: 'contact',
    lastUpdatedAt: Date.now(),
    firstName: 'First',
    phone: '',
    zip: '',
    supportLevel: '',
    volunteerLevel: '',
  }).map((signup, index) => ({
    ...signup,
    _id: new ObjectId(),
    lastName: `${index}`,
    note: `This is a note ${Math.random()}`,
  }));

  await signups.insertMany(signupSeed);
  process.exit(0);
})();
