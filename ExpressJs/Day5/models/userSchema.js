const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
        },
        dob: {
            type: String,
        },
        profilePhoto: {
            type: String,
        },
        addresses: [
            {
                local: String,
                city: String,
                state: String,
                PostalCode: String,
                Country: String,
                PhoneNumber: String,
            },
        ],
        isProfileComplete: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// ------------- default preferences ---------------
userSchema.pre("findOneAndUpdate", function () {
    this.options.runValidators = true;
    this.options.new = true;
});
userSchema.pre("updateOne", function () {
    this.options.runValidators = true;
    this.options.new = true;
});
userSchema.pre("updateMany", function () {
    this.options.runValidators = true;
    this.options.new = true;
});
// --------------------------------------------------

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password.toString(), 12);
    }
    next();
});

const UserModel = model("user", userSchema);

module.exports = { UserModel };
