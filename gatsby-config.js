require("dotenv").config()

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/templates/`,
        ignore: [`**/*.js`],
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-google-docs`,
      options: {
        folders: ["1vx3FteyxlUrMxvi4EDNwUcfzt3lIN_lA"],
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Nodeshool San Miguel`,
        short_name: `nodeschoolsm`,
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#000`,
        display: `minimal-ui`,
        icon: `src/assets/image/favicon.png`,
      },
    },
  ],
}
