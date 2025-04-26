const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const flash = require('express-flash');
const ejs = require('ejs');

app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { success: req.flash('success'), error: req.flash('error') });
});
app.post('/profile', async (req, res) => {
  const input = req.body.username.trim();
  let username = input;

  // Extract username from URL if needed
  if (username.startsWith("http")) {
      const pathParts = new URL(username).pathname.split('/').filter(Boolean);
      username = pathParts.includes('u') ? pathParts[pathParts.indexOf('u') + 1] : pathParts[0];
  }

  console.log(`Sending GraphQL query for username: ${username}`);

  try {
      const query = `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            profile {
              userAvatar
              realName
              ranking
              reputation
              location
            }
            contributions {
              points
            }
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
          }
        }`;

      const response = await axios.post(
          'https://leetcode.com/graphql',
          {
              query,
              variables: { username },
          },
          {
              headers: {
                  'Content-Type': 'application/json',
                  'Referer': 'https://leetcode.com/',
              },
          }
      );

      console.log("GraphQL Response:", response.data); // Log the response to debug

      const user = response.data.data.matchedUser;

      if (!user) {
          req.flash('error', `No profile found for "${username}". Please double-check the username.`);
          return res.redirect('/');
      }

      const points = user.contributions.points;
      const stats = user.submitStats.acSubmissionNum;

      req.flash('success', `Profile fetched successfully for "${username}"!`);
      res.render('card', {
          username,
          avatar: user.profile.userAvatar,
          name: user.profile.realName || username,
          ranking: user.profile.ranking,
          reputation: user.profile.reputation,
          points,
          stats,
          location: user.profile.location,
          success: req.flash('success'),
          error: req.flash('error')
      });

  } catch (error) {
      console.error("Error fetching profile:", error.message);
      if (error.response) {
          console.error("Error response data:", error.response.data); // Log the error response
      }
      req.flash('error', "We couldn’t connect to LeetCode. Please try again later.");
      res.redirect('/');
  }
});

app.get('/card/:username', async (req, res) => {
    const username = req.params.username;
    console.log(`Sending GraphQL query for username: ${username}`);

    try {
        const query = `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              profile {
                userAvatar
                realName
                ranking
                reputation
                calendar {
                  totalDays
                  streak
                }
              }
              contributions {
                points
              }
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                }
                streak
              }
              topicStats {
                topics {
                  topic
                  solved
                }
              }
            }
          }`;

        const response = await axios.post(
            'https://leetcode.com/graphql',
            {
                query,
                variables: { username },
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Referer': 'https://leetcode.com/',
                },
            }
        );

        const user = response.data.data.matchedUser;

        if (!user) {
            return res.status(404).send('User not found');
        }

        const userData = {
            username,
            avatar: user.profile.userAvatar,
            name: user.profile.realName || username,
            ranking: user.profile.ranking,
            reputation: user.profile.reputation,
            points: user.contributions.points,
            streak: user.submitStats.streak,
            calendar: user.profile.calendar,
            topicStats: user.topicStats.topics,
        };

        const html = await ejs.renderFile('./views/card.ejs', userData);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html);
        const imageBuffer = await page.screenshot({ type: 'png' });
        await browser.close();

        res.set('Content-Type', 'image/png');
        res.send(imageBuffer);

    } catch (error) {
        console.error("Error fetching profile:", error.message);
        res.status(500).send('Error generating image');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
