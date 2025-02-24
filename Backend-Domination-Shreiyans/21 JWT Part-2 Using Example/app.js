// browser se kuch aata h voh aata h req me
// routes se kuch bjte h comes in response

// cookie set krne k liye koi package ki need nahi h
// only for get

// ab ek baar cookie chl gyi toh voh har route me chlegi

const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
// we set in middleware
// ab jo bhi route toh y phle hi cookie ko read krne ko de dega
app.use(cookieParser()); // vvv imp

app.get("/", (req, res) => {
  res.send("Main Pge");
});

// method 1

// app.get("/setCookie", (req, res) => {
//   // jate hue res me
//   res.cookie("age_naam_ki_cookie_", "255");
//   res.send("Cookie Is Set");
// });

// method 2

app.get("/setCookie", (req, res) => {
  // 2 sec k baad agar dobara se / route me toh cookie will delete
  // Like 1 din k baad user logout ho jae
  res.cookie("age_naam_ki_cookie_", "255", {
    maxAge: 10 * 60 * 1000,
    // means docouments.cookie se hum fronteded me access nahi kr skte
    // only readed by server not any other browser
    httpOnly: true,
    //coookie jab jaenge toh secure connection me jaenge by following https
    secure: true,
  });
  res.send("Cookie Is Set");
});

// M3
app.get("/ChecksetCookie", (req, res) => {
  res.send(req.cookie.age_naam_ki_cookie_);
});

app.get("/readCookie", (req, res) => {
  // aate hue req me , cookies
  res.send(req.cookies.age_naam_ki_cookie_);
});

app.listen(3000);
