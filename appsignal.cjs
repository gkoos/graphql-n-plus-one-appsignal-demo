require("dotenv/config");
const { Appsignal } = require("@appsignal/nodejs");

new Appsignal({
  active: true,
  name: "graphql-n-plus-one-demo",
  apiKey: process.env.APPSIGNAL_PUSH_API_KEY
});
