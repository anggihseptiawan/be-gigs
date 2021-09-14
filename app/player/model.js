const mongoose = require("mongoose");

let playerSchema = mongoose.Schema(
	{
		email: { type: String, require: [true, "Email harus diisi"] },
		name: { type: String, require: [true, "Nama harus diisi"] },
		username: { type: String, require: [true, "Username harus diisi"] },
		password: { type: String, require: [true, "Password harus diisi"] },
		role: { type: String, enum: ["admin", "user"], default: "user" },
		status: { type: String, enum: ["Y", "N"], default: "Y" },
		avatar: { type: String },
		fileName: { type: String },
		phoneNumber: {
			type: String,
			require: [true, "Nomor telepon harus diisi"],
		},
		favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
	},
	{ timeStamps: true }
);

module.exports = mongoose.model("Player", playerSchema);
