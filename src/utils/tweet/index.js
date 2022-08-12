const { authedClient: client } = require("../../services/twitter")

const retweet = (retweetID) => {
  client.post("statuses/retweet/:id", { id: retweetID }, (err, res) => {
    if (res) {
      console.log(`====> RETWEET SUCCESS ${retweetID}`)
    }
    if (err) {
      console.log(`====> ERROR in RETWEET ${err}`)
    }
  })
}

module.exports = {
  retweet,
}
