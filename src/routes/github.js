const { sendCustomMessageEmbed } = require('./discord')
const { MessageBuilder } = require('webhook-discord')

/**
 * Used for any Webhook that is set up with GitHub.
 *
 * Upon initial creation, it'll just forward messages to a GitHub channel in my
 * Discord server. Later, I may incorporate other features.
 */
class GitHub {
  /**
   * Handles any POST requests to the GitHub endpoint.
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async getMethod (req, res, next) {
    res.send(200, 'This endpoint has not been implemented or is currently under construction.')
  }

  /**
   * Handles any POST requests sent to the GitHub endpoint.
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async postMethod (req, res, next) {
    try {
      const msgEmbed = await buildMsgEmbed(req)
      const dhRes = await sendCustomMessageEmbed(msgEmbed)
      console.log(dhRes)
      res.send(200)
      return next()
    } catch (err) {
      console.error('Error within postMethod...', err)
      return next(err)
    }
  }
}

const buildMsgEmbed = async req => {
  try {
    const builder = new MessageBuilder()
    const eventType = getEventType(req)
    const end = builder.setAuthor('GitHub', 'https://i.imgur.com/ngfp9X3.png', 'https://github.com/4lch4')
      .setAvatar('https://i.imgur.com/ngfp9X3.png')
      .setName('GitHub-Webhook')
      .setDescription(`A GH event has been generated: ${eventType}`)
      .setTitle('A webhook has received a message from GitHub')

    console.log(req)

    return end
  } catch (err) {
    console.error(err)
    return err
  }
}

/**
 * Gets the event type of the GitHub request from the headers and returns it as
 * a String.
 *
 * @param {*} req
 */
const getEventType = req => {
  return req.header('X-GitHub-Event', 'Unknown')
}

module.exports = new GitHub()
