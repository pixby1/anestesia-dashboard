import { model, Schema } from "mongoose";

const validRoles = {
  values: ["ADMIN_ROLE", "SUPERVISOR_ROLE", "USER_ROLE"],
  message: "{VALUE} not a valid role"
};

const validState = {
  values: ["PENDING", "APPROVED"],
  message: "{VALUE} not a valid role"
}

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "the name is mandatory"]
  },
  lastName: {
    type: String,
    required: [true, "the lastName is mandatory"]
  },
  birthday: {
    type: String,
    required: [true, "the birthday is mandatory"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "the email is mandatory"]
  },
  phone: {
    type: String,
    required: [true, "the phone is mandatory"]
  },
  gender: {
    type: String,
    required: [true, "the gender is mandatory"]
  },
  jobRole: {
    type: String,
    required: [true, "the jobRole is mandatory"]
  },
  country: {
    type: String,
    required: [true, "the country is mandatory"]
  },
  city: {
    type: String,
    required: [true, "the city is mandatory"]
  },
  society: {
    type: String,
    required: [true, "the society is mandatory"]
  },
  date: {
    type: String,
    required: [true, 'the date is mandatory']
  },
  // datos que usare en el backend (no seran visible para el usuario)
  userRemove: {
    type: Boolean,
    default: false
  },
  state: {
    type: String,
    enum: validState,
    default: "PENDING"
  },
  role: {
    type: String,
    enum: validRoles,
    default: "USER_ROLE"
  }
});

export default model("User", userSchema);
