const app = require("./app");
require("./DB/Connect")();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`We are listing at the port local ${PORT} and global unknown`);
});
