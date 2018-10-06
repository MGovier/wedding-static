module.exports = {
  siteMetadata: {
    title: 'Birgit and Merlin 2018'
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'img',
        path: `${__dirname}/src/`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        precision: 8
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Birgit and Merlin 2018',
        short_name: 'B+M 2018',
        start_url: '/',
        background_color: '#8c5a2f',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icons: [
          {
            src: `/android-icon.png`,
            sizes: `512x512`,
            type: `image/png`
          }
        ]
      }
    },
    'gatsby-plugin-offline'
  ]
};
