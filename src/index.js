const express = require("express")

const app = express()
const port = process.env.PORT || 8000

app.get("/*", (req, res) => {
  res.send("Welcome to Greenify bot 🚀")
})

app.listen(port, () =>
  console.log(`Greenify bot (Twit Hunter 🤖) is up on port ${port}🚀`)
)

require("./bot")
