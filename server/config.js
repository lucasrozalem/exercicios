if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { MONGODB_URI } = process.env;

const defaults = {
  MONGODB_URI: 'mongodb_uri'
};

Object.keys(defaults).forEach((key) => {
  if (!process.env[key] || process.env[key] === defaults[key]) {
    throw new Error(`Please enter a custom ${key} in environment variables.`);
  }
});

export { MONGODB_URI };