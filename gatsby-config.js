require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    name: `Hello Typescript World!`,
    tagline: `Gatsby + SASS + Typescript = 💪`,
    apiUrl: process.env.API_URL,
  },  
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tslint`,
    {
      resolve: 'gatsby-source-airtable',
      options: {
        apiKey: process.env.AIRTABLE_KEY,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: 'Candidates',
            tableView: `Main View`,
            defaultValues: {
              // currently does not accept null / undefined. use empty string instead
              // and perform your conditional logic on 
              // name_of_field.length > 0 ? condition_1 : condition_2
              NAME_OF_FIELD_THAT_WILL_OTHERWISE_NOT_BE_RETURNED_IF_ALL_VALUES_ARE_BLANK:
                "",
              // ... etc
            },
            mapping: { Image: "fileNode" },
          },
        ],
      },
    },
  ],
}
