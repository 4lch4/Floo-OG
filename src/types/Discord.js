/**
 * The object that must be sent to Discord if you wish to send a custom Embed
 * instead of a simple message of text.
 */
const WebhookEmbed = {
  /** The Author of the Embed to be sent. */
  author: {
    /** The username of the Author. */
    username: '',
    /** A URL to an image that'll be used as the icon for the Author. */
    iconUrl: '',
    /** The URL to be directed to if someone clicks the name/username. */
    url: ''
  },

  /**
   * A URL to an image that will be used as the Avatar of the author who sent
   * the message. This is different than the iconUrl associated with the Author
   * property.
   */
  avatarUrl: '',
  colorString: '',
  description: '',
  footer: {},
  imageUrl: '',
  name: '',
  text: '',
  thumbnailUrl: '',
  time: '',
  title: '',
  url: '',
  fields: [{}]
}

module.exports = {
  WebhookEmbed
}

// const

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
