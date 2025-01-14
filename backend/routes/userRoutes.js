
app.post("/user", async (req, res) => {
	try{
		const { name, password } = req.body;
		const user = new user({name, password: bcrypt.hashSync(password)});
		user.save();
		res.status(201).json({id: user._id, accessToken: user.accessToken});
	} catch (error) {
		res.status(400).json({message: "Could not create user", errors: error.errors});
	}
});

// Secret endpoint
app.get("/secrets", authenticateUser);
app.get("/secrets", req, res) => {
	res.json({secret: "This is a super secret message."});
});

app.post("/sessions", async (req, res) => {
	const user = await User.findOne({name: req.body.email});
	if (user && bcrypt.compareSync(req.body.password, user.password)) {
	} else {
		res.json({notFound: true});
	}
});

// Fix this component it's not correct!
