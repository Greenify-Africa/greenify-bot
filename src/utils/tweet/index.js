const { authedClient: client } = require("../../services/twitter")

export const retweet = (uid, retweetID) => {
  client.post("statuses/retweet/:id", { id: retweetID }, (err, res) => {
    if (res) {
      console.log(`====> RETWEET SUCCESS ${retweetID}`)
    }
    if (err) {
      console.log(`====> ERROR in RETWEET ${err}`)
    }
  })
}
