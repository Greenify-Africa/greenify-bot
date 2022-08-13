const { ETwitterStreamEvent, ETwitterApiError } = require("twitter-api-v2")
const { twitterConfig } = require("./config")

const config = require("./config")
const { appClient } = require("./services/twitter")
const { retweet } = require("./utils/tweet")

const watch = async () => {
  const client = await appClient.appLogin()
  const rules = await client.v2.streamRules()

  if (rules.result_count === 0) {
    console.log("===> added rules! <===")
    await client.v2.updateStreamRules({
      add: [
        { value: "#greenify", tag: "greenify hashtag1" },
        { value: "#greenifyafrica", tag: "greenify hashtag2" },
      ],
    })
  }

  console.log("===== starting stream service =====")
  const stream = await client.v2.searchStream({
    "tweet.fields": ["author_id", "source"],
    expansions: [
      "author_id",
      "entities.mentions.username",
      "in_reply_to_user_id",
      "referenced_tweets.id",
      "referenced_tweets.id.author_id",
    ],
    "user.fields": ["username"],
  })

  console.log("===== streaming service has started =====")
  console.log("===> hunting for tweets <====")
  stream.on(ETwitterStreamEvent.Data, (tweet) => {
    // testing stuff (*_*)
    // const fs = require("fs")
    // const path = require("path")
    // fs.writeFileSync(path.resolve("tweet1.json"), JSON.stringify(tweet))
    const {
      data: { id, text },
      includes: { users },
    } = tweet

    // console.log("This is my tweet:", text)

    // do a retweet
    const username = twitterConfig.username
    if (users[0].username !== username) {
      retweet(id)
    }
  })
}

console.log("==== #Greenify Bot Starting... ====")
watch()

// const tweetDiscordLink = () => {
//   const tweet = `${SHARE_DISCORD_CHANNEL_LINK}`
//   TwitterBot.post("statuses/update", { status: tweet }, () => {
//     console.log("SUCCESS: Discord Channel Link Sent")
//   })
// }

// // Use cron-job to schedule Discord Channel Promotion
// const rule = new schedule.RecurrenceRule()
// rule.dayOfWeek = [0, new schedule.Range(1, 6)]
// rule.hour = 11
// rule.minute = 59

// // schedule.scheduleJob(rule, () => {
// //   // eslint-disable-next-line no-console
// //   console.log("Cron Job runs successfully")
// //   tweetDiscordLink()
// // })