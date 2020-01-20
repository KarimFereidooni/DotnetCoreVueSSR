const app = require("./renderOnNode");
const port = process.env.PORT || 8080;

app.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log(`Server started at localhost:${port}`);
});
