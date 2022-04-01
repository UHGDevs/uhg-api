
const Messages = {
  INVALID_TYPE: (name, expected, an = false) => `Supplied ${name} is not a${an ? 'n' : ''} ${expected}.`,

  API_KEY_INVALIDE: 'An invalid Hypixel API key was provided.',
  API_KEY_MISSING: 'Request to use API key, but no API key was found.',
};

for (const [name, message] of Object.entries(Messages)) register(name, message);
