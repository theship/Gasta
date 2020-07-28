# Gasta



## Used Gatsby Starter: Typescript + SASS
Starter with the essentials needed for a [Gatsby](https://www.gatsbyjs.org/) site. This setup includes:

- Typescript
- Typescript linting
- SASS support

Install this starter by running this from your [Gatsby CLI](https://next.gatsbyjs.org/tutorial/part-zero/#install-the-gatsby-cli):
```
gatsby new gatsby-site https://github.com/tdharmon/gatsby-starter-typescript-sass
```

## Adding Airtable

I have an Airtable Base (app56znB40HogXVeJ) that has a table Main Views, with Candidate and Description fields. (It's recommended that you populate the table with at least one entry to begin with.)

https://api.airtable.com/v0/appqXt7eNeh7PHaiB/General%20projects?api_key=AIRTABLE_KEY

I'm going to add this Airtable base:

* Add Airtable and Gatsby's source package to the codebase

>> yarn add airtable 
>> yarn add gatsby-source-airtable

* Add the plugin to the Gatsby config file, gatsby-config.js:

-- I'm going to require dotenv at the top of the gatsby-config.js file:

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

-- Add the API URL to the siteMetaData:

,
  apiUrl: process.env.API_URL,

-- And add the plugin:

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

* environment variables to the gatsby node file:

I copy my .env.* files over from my last project. I have a .env, .env.development, and a .env.production file all with the same values from Airtable:

API_URL=https://api.airtable.com

AIRTABLE_KEY=♨𝓈𝔼℃Ｒ𝔼𝐓𝕒𝕀ŘＴάｂＬẸⓚ𝕖𝔂

AIRTABLE_BASE_ID=appqXt7eNeh7PHaiB

The secret key and base id, are unique to each Airtable account, of course. So don't use those silly strings I've used.

Then, in the gatsby-node.js file, I require the environment variables:

require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
  })


### My Airtable Base schema

-- Now, that I've wired up the Airtable, I'll run the server again:

>> gatsby develop

At http://localhost:8000/___graphql, I'll select allAirtable > edges> node > data > Candidate and Description.

The query that is built is:

query MyQuery {
  allAirtable {
    edges {
      node {
        data {
          Candidate
          Description
        }
      }
    }
  }
}

Now I could go ahead and create a GraphQL query object on a page and then use the data returned directly in a function, as I in Part one "Airtable & Gatsby Apollo GraphQL with Typescript" (https://medium.com/@pequodcapt/airtable-gatsby-apollo-graphql-with-typescript-51aed78649cd).

