const { authedClient: client } = require("../../services/twitter")

const retweet = (retweetID) => {
  client.post("statuses/retweet/:id", { id: retweetID }, (err, res) => {
    if (err) console.log(`====> ERROR in RETWEET ${err}`)

    if (res) {
      console.log(`====> RETWEET SUCCESS ${retweetID}`)
    }
  })
}

const tweet = (retweetID) => {
  client.post("statuses/update", { status: tweet }, (err, res) => {
    if (err) {
    }
    if (res) {
      console.log(`====> TWEET SUCCESS ${retweetID}`)
    }
  })
}

module.exports = {
  retweet,
  tweet,
}
