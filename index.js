const gateway = require("fast-gateway");
const AuthControler = require("./user/src/controlers/auth.controler");
let port = process.env.PORT || 5000;
require("./connectDb");

const server = gateway({
  routes: [
    {
      prefix: "/user",
      target: "http://localhost:5001"
    },
    {
      prefix: "/product",
      target: "http://localhost:5002"
    }
  ]
});

// server.post("/register", AuthControler.registerUser);
server.start(port).then((res) => {
  console.log("**********Gate way is running at port 5000****************");
});
