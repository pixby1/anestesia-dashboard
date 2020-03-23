import { model, Schema } from 'mongoose';

const anonymousSchema = new Schema({
  patient: {
      type: String
  },
  age: {
      type: String
  },
  imc: {
      type: String
  },
  asa: {
      type: String
  },
  location: {
      type: String
  },
  time: {
      type: String
  },
  assistant: {
      type: String
  },
  supevisor: {
      type: String
  },
  other: {
      type: String
  },
  problem: {
      type: String
  },
  descriptionProblem: {
      type: String
  }
});

export default model("Anonymous", anonymousSchema);

