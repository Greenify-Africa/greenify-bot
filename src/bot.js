const { ETwitterStreamEvent, ETwitterApiError } = require("twitter-api-v2")

const config = require("./config")
const { appClient } = require("./services/twitter")
const { retweet } = require("./utils/tweet")
// const consumerClient = new TwitterApi({
//   appKey: config.twitterKeys.consumer_key,
//   appSecret: config.twitterKeys.consumer_secret,
//   // accessToken: config.twitterKeys.access_token,
//   // clientSecret: config.twitterKeys.access_token_secret,
// })

// For v2

const watch = async () => {
  const client = await appClient.appLogin()
  const rules = await client.v2.streamRules()

  if (rules.result_count === 0) {
    console.log("i ran!!", "added rules!")
    const addedRules = await client.v2.updateStreamRules({
      add: [
        { value: "#greenify", tag: "greenify hashtag1" },
        { value: "#greenifyafrica", tag: "greenify hashtag2" },
        // { value: "#Greenify", tag: "greenify hashtag3" },// not needed as twitter api is mad
        // { value: "#GreenifyAfrica", tag: "greenify hashtag4" },
      ],
    })
  }

  console.log("starting stream service")
  const stream = await client.v2.searchStream()

  stream.on(ETwitterStreamEvent.Data, (tweet) => {
    console.log("This is my tweet:", tweet)
    // do a retweet
    retweet(config.twitterConfig.UID, tweet.id)
  })
  // You can also use async iterator to iterate over tweets!
  // for await (const { data } of stream) {
  //   console.log("This is my tweet:", data)
  // }
}

console.log("==== #Greenify Bot Starting... ====")
watch()

// // console.log("==== #Greenify Bot Starting... ====")

// // Import dependencies
// const Twit = require("twit")
// const schedule = require("node-schedule")

// // Configuration
// const config = require("./config")
// const TwitterBot = new Twit(config.twitterKeys)

// // API
// const retweet = () => {
//   const params = {
//     q: config.query,
//     result_type: config.result_type,
//     lang: config.lang,
//     tweet_mode: "extended",
//   }

//   TwitterBot.get(
//     "search/tweets",
//     { q: "@GreenifyAfrica, #GreenifyAfrica", result_type: config.result_type },
//     (err, data) => {
//       const fs = require("fs")
//       const path = require("path")
//       fs.writeFileSync(path.resolve("tweet1.json"), JSON.stringify(data))
//       // when no errors
//       if (!err) {
//         if (data.statuses.length > 0) {
//           // if there is only one hashtag get the tweet's ID
//           let retweetID = data.statuses[0].id_str
//           console.log(data.statuses[0].text)
//           TwitterBot.post(
//             "statuses/retweet/:id",
//             { id: retweetID },
//             (err, res) => {
//               if (res) {
//                 console.log(`====> RETWEET SUCCESS ${retweetID}`)
//               }
//               if (err) {
//                 console.log(`====> ERROR in RETWEET ${err}`)
//               }
//             }
//           )
//         } else {
//           console.log("====> Nothing to tweet")
//         }
//       } else {
//         console.log(`====> ERROR ${err}`)
//       }
//     }
//   )
// }

// // Invoke API
// retweet()
// // 30 minutes
// setInterval(retweet, 1800000)

// // freeCodeCamp's Discord Channel Promotion

// const SHARE_DISCORD_CHANNEL_LINK = `
// Here's the link to the official #100DaysOfCode Discord Channel!
// Join us to:
// 1) Get help
// 2) Help others
// 3) Connect
// 4) Discuss anything
// https://discord.com/invite/k77v9BnDcB
// `

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
