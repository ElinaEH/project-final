app.get("/protected", authenticate, (req, res) => {
  res.send(`Hello $(req.user.name"), you are authenticated!`);
});
