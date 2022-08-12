const Twit = require("twit")

const {
  TwitterApi,
  ETwitterStreamEvent,
  TweetStream,
  ETwitterApiError,
} = require("twitter-api-v2")

const config = require("../../config")

const authedClient = new Twit(config.twitterKeys)
const appClient = new TwitterApi({
  appKey: config.twitterKeys.consumer_key,
  appSecret: config.twitterKeys.consumer_secret,
})

module.exports = {
  authedClient,
  appClient,
}
