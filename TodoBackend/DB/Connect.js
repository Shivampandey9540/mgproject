const mongoose = require("mongoose");

const url = process.env.MONGO_URL;
const conection = async () => {
  await mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(
        "Connection to database has been stablished, You can use Schmea now"
      );
    })
    .catch((e) => {
      console.log(e);
      console.log("due to the error we have been stop the  Connection");
      process.exit(0);
    });
};

module.exports = conection;
