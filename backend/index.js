const express = require("express");
const {
setupKinde,
protectRoute,
getUser,
} = require("@kinde-oss/kinde-node-express");
const app = express();
const config = {
clientId: "300ed3cf5c804e0ca56753c0878641b9",
issuerBaseUrl: "https://ellasevents.kinde.com",
siteUrl: "http://localhost:3000",
secret: "mwxLbo5znwRXFB6CvFHweh73CPZ9lJ2yXoz1msLZxoUBrzKl3wW",
redirectUrl: "http://localhost:3000/kinde_callback",
};
setupKinde(config, app);