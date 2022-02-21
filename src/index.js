const jsonServer = require("json-server");
const auth = require("json-server-auth");
const server = jsonServer.create();
const router = jsonServer.router("api.json");
const middlewares = jsonServer.defaults({
  noCors: false
});
const cors = require("cors");

server.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
  })
);
server.options("*", cors());

server.db = router.db;

const rules = auth.rewriter({
  // Permission rules
  // users: 600,
  // messages: 640
});

// You must apply the middlewares in the following order
server.use(rules);
server.use(auth);
server.use(middlewares);
server.use(router);
server.listen(5000, () => {
  console.log("JSON Server is running");
});
