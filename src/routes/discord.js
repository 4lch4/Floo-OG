const { PrimaryDiscordWH } = require('../utils/config')

const { MessageBuilder, Webhook } = require('webhook-discord')
const dHook = new Webhook(PrimaryDiscordWH)

const sendMessageEmbed = async (req, res, next) => {
  if (req.body) {
    // dHook.info('Floo', 'Hello there, <@524419859291963403>.')
    const msgEmbed = buildMsg(req.body)
    const dHookRes = await dHook.send(msgEmbed)
    res.send(200, dHookRes)
  } else res.send(400, 'You must provide at least a body in the request.')

  return next()
}

/**
 * Sends a custom embed/MessageBuilder object to the primary Discord WH and
 * returns the result via a promise.
 *
 * @param {MessageBuilder} embed The MessageBuilder/embed you wish to send.
 */
const sendCustomMessageEmbed = async embed => dHook.send(embed)

/**
 * Builds a message to be sent via a Discord Webhook.
 *
 * @param {WebhookEmbed} msg The object containing the data to be sent in the embed.
 *
 * @returns {MessageBuilder}
 */
const buildMsg = msg => {
  const MsgBuilder = new MessageBuilder()

  try {
    MsgBuilder.setAuthor(msg.author.username | 'Floo', msg.author.iconUrl | undefined, msg.author.url)
      .setAvatar(msg.avatarUrl)
      .setColor(msg.colorString)
      .setDescription(msg.description)
      .setFooter(msg.footer.footerText, msg.footer.footerIcon)
      .setImage(msg.imageUrl)
      .setName(msg.name)
      .setText(msg.text)
      .setThumbnail(msg.thumbnailUrl)
      .setTime(msg.time) // uses current time if nothing is provided
      .setTitle(msg.title)
      .setURL(msg.url)
    if (msg.fields) msg.fields.forEach(field => MsgBuilder.addField(field.name, field.value, field.inline))

    return MsgBuilder
  } catch (err) { return err }
}

const sanitizeEmbedInputs = embed => {
  const sanitizedEmbed = {}
  if (embed.author) {
    if (embed.author.username) sanitizedEmbed.author.username = embed.author.username
    else sanitizedEmbed.author.username = 'Unknown'

    // if (embed.author.iconUrl)
  }
}

module.exports = {
  sendMessageEmbed,
  sendCustomMessageEmbed
}

/**
 * @typedef {Object} WebhookEmbed
 *
 * @prop {EmbedAuthor} [author]
 * @prop {String} [avatarUrl]
 * @prop {String} [colorString]
 * @prop {String} [description]
 * @prop {EmbedFooter} [footer]
 * @prop {String} [imageUrl]
 * @prop {String} [name]
 * @prop {String} [text]
 * @prop {String} [thumbnailUrl]
 * @prop {Number} [time]
 * @prop {String} [title]
 * @prop {String} [url]
 * @prop {EmbedField[]} [fields]
 */

/**
 * @typedef {Object} EmbedAuthor
 *
 * @prop {String} username
 * @prop {String} iconUrl
 * @prop {String} url
 */

/**
 * @typedef {Object} EmbedFooter
 *
 * @prop {String} footerText
 * @prop {String} footerIcon
 */

/**
 * @typedef {Object} EmbedField
 *
 * @prop {String} name The name/title of the field to be displayed.
 * @prop {String} value The value to be displayed.
 * @prop {boolean} inline Whether or not the field is displayed inline with others.
 */
