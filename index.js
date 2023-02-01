const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const secretkey = "islamabad@1175";

app.get("/", (req, res) => {
  res.json({
    message: "A Sample API",
  });
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    username: "raahi",
    email: "raahikhan@gmail.com",
  };

  app.post("/profile", varifyToken, (req, res) => {
    jwt.verify(req.token, secretkey, (error, authData) => {
      if (error) {
        res.send({
          result: "invalid access",
        });
      } else {
        res.json({
          message: "profile accessed",
          authData,
        });
      }
    });
  });

  function varifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const token = bearer[1];
      req.token = token;
      next();
    } else {
      res.send({
        result: "token is invalid",
      });
    }
  }

  jwt.sign({ user }, secretkey, { expiresIn: "3600s" }, (error, token) => {
    res.json({
      token,
    });
  });
});

app.listen(8000, () => {
  console.log("App is running on 5000 port");
});
