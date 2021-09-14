const mongoose = require("mongoose");

let transactionSchema = mongoose.Schema(
	{
		historyVoucherTopup: {
			gameName: { type: String, require: [true, "Nama game harus diisi"] },
			category: {
				type: String,
				require: [true, "Kategori game harus diisi"],
			},
			thumbnail: { type: String },
			coinName: { type: String, require: [true, "Nama koin harus diisi"] },
			coinQuantity: {
				type: String,
				require: [true, "Jumlah koin harus diisi"],
			},
			price: { type: Number },
		},
		historyPayment: {
			name: { type: String, require: [true, "Name harus diisi"] },
			type: { type: String, require: [true, "Tipe pembayaran harus diisi"] },
			bankName: { type: String, require: [true, "Nama bank harus diisi"] },
			rekeningNumber: {
				type: String,
				require: [true, "Nomor rekening harus diisi"],
			},
		},
		name: { type: String, require: [true, "Nama harus diisi"] },
		accountUser: { type: String, require: [true, "Nama akun harus diisi"] },
		tax: { type: Number, default: 0 },
		value: { type: Number, default: 0 },
		status: {
			type: String,
			enum: ["pending", "success", "failed"],
			default: "pending",
		},
		player: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
		historyUser: {
			name: { type: String, require: [true, "Nama player harus diisi"] },
			phoneNumber: {
				type: Number,
				require: [true, "Nomor telepon harus diisi"],
				maxlength: [12, "Panjang nomor tidak boleh lebih dari 12"],
				minlength: [11, "Panjang nomor minimal 11 angka"],
			},
		},
		category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
		user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	},
	{ timeStamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
