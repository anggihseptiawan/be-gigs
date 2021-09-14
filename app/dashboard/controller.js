module.exports = {
	index: async (req, res) => {
		try {
			res.render("index", {
				name: req.session.user.name,
				title: "Dashboard",
			});
		} catch (error) {
			console.log(err);
		}
	},
};
