const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      index: true,
      required: [true, "Email is required"],
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    deviceId: {
      type: String,
    },
    roles: {
      type: Array,
      required: false,
      default: [],
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const hash = await bcrypt.hash(this.password, process.env.BCRYPT_SALT);
  this.password = hash;

  next();
});

module.exports = mongoose.model("users", userSchema);
