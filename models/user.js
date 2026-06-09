const mongose = require("mongoose");

//modelos o esquemas de la base de datos
const userSchema = new mongose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  verified: { type: Boolean, default: false },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongose.model("User", userSchema);

module.exports = User;
