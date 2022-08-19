const { authedClient: client } = require("../../services/twitter")

const retweet = (retweetID) => {
  client.post("statuses/retweet/:id", { id: retweetID }, (err, res) => {
    if (err) console.log(`====> ERROR in RETWEET ${err}`)

    if (res) {
      console.log(`====> RETWEET SUCCESS ${retweetID}`)
    }
  })
}

const tweet = (tweet) => {
  client.post("statuses/update", { status: tweet }, (err, res) => {
    if (err) {
      return
    }
    if (res) {
      console.log(`====> TWEET SUCCESS ${tweet}`)
    }
  })
}

module.exports = {
  retweet,
  tweet,
}
