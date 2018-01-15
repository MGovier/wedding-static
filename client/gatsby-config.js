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
    }
  ]
}
