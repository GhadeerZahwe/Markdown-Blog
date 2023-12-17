const express = require("express");
const articleRouter = require("./routes/articles");
const app = express();

app.set("view engine", "ejs");
app.use("/articles", articleRouter);
//create route
app.get("/", (req, res) => {
  const articles = [
    {
      title: "Test Article",
      createdAt: new Date(),
      description: "Test description",
    },
    {
      title: "Test Article 1",
      createdAt: new Date(),
      description: "Test description",
    },
  ];
  res.render("index", { articles: articles });
});

app.listen(5000);
