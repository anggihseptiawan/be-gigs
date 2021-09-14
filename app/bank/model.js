const mongoose = require("mongoose");

let bankSchema = mongoose.Schema(
	{
		name: { type: String, require: [true, "Nama harus diisi"] },
		bankName: { type: String, require: [true, "Nama Bank harus diisi"] },
		rekeningNumber: {
			type: String,
			require: [true, "Nomor rekening harus diisi"],
		},
	},
	{ timeStamps: true }
);

module.exports = mongoose.model("Bank", bankSchema);
