require("dotenv").config()

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: false,
            },
          },
          `gatsby-remark-static-images`,
        ],
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE,
        concurrency: 5,
        tables: [
          {
            baseId: `app95QzMBZ7lbOT9b`,
            tableName: `presentaciones`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-google-docs`,
      options: {
        folders: ["1vx3FteyxlUrMxvi4EDNwUcfzt3lIN_lA"],
        debug: true,
      },
    },
    `gatsby-plugin-sharp`,
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
