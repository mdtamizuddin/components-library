import mongoose from "mongoose";

const connect = () => {
  if (mongoose.connections[0]?.readyState) {
    console.log("Connected Alrady");
  } else {
    mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log("Db Connected");
      }
    );
  }
};

export default connect;
