const Voucher = require("./model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");
const Payment = require("../payment/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
	index: async (req, res) => {
		try {
			const alertMessage = req.flash("alertMessage");
			const alertStatus = req.flash("alertStatus");

			const alert = { message: alertMessage, status: alertStatus };
			const voucher = await Voucher.find()
				.populate("category")
				.populate("nominals");
			console.log(voucher);
			res.render("admin/voucher/view_voucher", {
				voucher,
				alert,
				name: req.session.user.name,
				title: "Voucher",
			});
		} catch (error) {
			req.flash("alertMessage", `${error.message}`);
			req.flash("alertStatus", "danger");
			res.redirect("/voucher");
		}
	},

	viewCreate: async (req, res) => {
		try {
			const category = await Category.find();
			const nominal = await Nominal.find();
			const payment = await Payment.find().populate("banks");
			res.render("admin/voucher/create", {
				category,
				nominal,
				payment,
				name: req.session.user.name,
				title: "Voucher",
			});
		} catch (error) {
			req.flash("alertMessage", `${error.message}`);
			req.flash("alertStatus", "danger");
			res.redirect("/voucher");
		}
	},

	actionCreate: async (req, res) => {
		try {
			const { name, category, nominals, payment } = req.body;
			if (req.file) {
				let tmp_path = req.file.path;
				let originalExt =
					req.file.originalname.split(".")[
						req.file.originalname.split(".").length - 1
					];
				let filename = req.file.filename + "." + originalExt;
				let target_path = path.resolve(
					config.rootPath,
					`public/uploads/${filename}`
				);

				const src = fs.createReadStream(tmp_path);
				const dest = fs.createWriteStream(target_path);
				src.pipe(dest);

				src.on("end", async () => {
					try {
						const voucher = new Voucher({
							name,
							category,
							nominals,
							payment,
							thumbnail: filename,
						});

						await voucher.save();

						req.flash("alertMessage", "Berhasil tambah voucher");
						req.flash("alertStatus", "success");
						res.redirect("/voucher");
					} catch (error) {
						req.flash("alertMessage", `${error.message}`);
						req.flash("alertStatus", "danger");
						res.redirect("/voucher");
					}
				});
			} else {
				const voucher = new Voucher({
					name,
					category,
					nominals,
					payment,
				});

				await voucher.save();

				req.flash("alertMessage", "Berhasil tambah voucher");
				req.flash("alertStatus", "success");
				res.redirect("/voucher");
			}
		} catch (error) {
			req.flash("alertMessage", `${error.message}`);
			req.flash("alertStatus", "danger");
			res.redirect("/voucher");
		}
	},

	viewEdit: async (req, res) => {
		try {
			const { id } = req.params;

			const category = await Category.find();
			const nominal = await Nominal.find();
			const payment = await Payment.find();
			const paymentBank = await Payment.find().populate("banks");
			console.log(paymentBank);
			const voucher = await Voucher.findOne({ _id: id })
				.populate("category")
				.populate("nominals")
				.populate([
					{
						path: "payment",
						model: "Payment",
						populate: {
							path: "banks",
							model: "Bank",
						},
					},
				]);
			res.render("admin/voucher/edit", {
				voucher,
				category,
				nominal,
				payment,
				paymentBank,
				name: req.session.user.name,
				title: "Voucher",
			});
		} catch (error) {
			req.flash("alertMessage", `${error.message}`);
			req.flash("alertStatus", "danger");
			res.redirect("/voucher");
		}
	},

	actionEdit: async (req, res) => {
		try {
			const { id } = req.params;
			const { name, category, nominals, payment } = req.body;
			if (req.file) {
				let tmp_path = req.file.path;
				let originalExt =
					req.file.originalname.split(".")[
						req.file.originalname.split(".").length - 1
					];
				let filename = req.file.filename + "." + originalExt;
				let target_path = path.resolve(
					config.rootPath,
					`public/uploads/${filename}`
				);

				const src = fs.createReadStream(tmp_path);
				const dest = fs.createWriteStream(target_path);
				src.pipe(dest);

				src.on("end", async () => {
					try {
						const voucher = await Voucher.findOne({ _id: id });
						let currrentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
						if (fs.existsSync(currrentImage)) {
							fs.unlinkSync(currrentImage);
						}

						await Voucher.findOneAndUpdate(
							{
								_id: id,
							},
							{
								name,
								category,
								nominals,
								payment,
								thumbnail: filename,
							}
						);

						req.flash("alertMessage", "Berhasil ubah voucher");
						req.flash("alertStatus", "success");
						res.redirect("/voucher");
					} catch (error) {
						req.flash("alertMessage", `${error.message}`);
						req.flash("alertStatus", "danger");
						res.redirect("/voucher");
					}
				});
			} else {
				await Voucher.findOneAndUpdate(
					{
						_id: id,
					},
					{
						name,
						category,
						nominals,
						payment,
					}
				);

				req.flash("alertMessage", "Berhasil ubah voucher");
				req.flash("alertStatus", "success");
				res.redirect("/voucher");
			}
		} catch (error) {
			req.flash("alertMessage", `${error.message}`);
			req.flash("alertStatus", "danger");
			res.redirect("/voucher");
		}
	},

	actionDelete: async (req, res) => {
		try {
			const { id } = req.params;

			const voucher = await Voucher.findOneAndDelete({ _id: id });
			let currrentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
			if (fs.existsSync(currrentImage)) {
				fs.unlinkSync(currrentImage);
			}

			req.flash("alertMessage", "Berhasil hapus voucher");
			req.flash("alertStatus", "success");
			res.redirect("/voucher");
		} catch (error) {
			req.flash("alertMessage", `${error.message}`);
			req.flash("alertStatus", "danger");
			res.redirect("/voucher");
		}
	},

	actionStatus: async (req, res) => {
		try {
			const { id } = req.params;
			const voucher = await Voucher.findOne({ _id: id });
			let status = voucher.status === "Y" ? "N" : "Y";
			await Voucher.findOneAndUpdate({ _id: id }, { status });

			req.flash("alertMessage", "Berhasil ubah status voucher");
			req.flash("alertStatus", "success");
			res.redirect("/voucher");
		} catch (error) {
			req.flash("alertMessage", `${error.message}`);
			req.flash("alertStatus", "danger");
			res.redirect("/voucher");
		}
	},
};
