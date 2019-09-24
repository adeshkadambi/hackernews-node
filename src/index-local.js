const { GraphQLServer } = require('graphql-yoga')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  },
{
    id: 'link-1',
    url: 'www.google.ca',
    description: 'Google Search'
}]

let idCount = links.length

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    findLink: (parent, args) => links.find(link => link.id === args.id), // find link by id.
  },

  Mutation: {
    post: (parent, args) => {
       const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },

    updateLink: (parent, args) => {
        for (var i=0; i < links.length; i++) {
            if (links[i].id === args.id) {
                links[i].url = args.url;
                links[i].description = args.description;
                return links[i];
            }
        }
    },

    deleteLink: (parent, args) => {
        for (var i=0; i < links.length; i++) {
            if (links[i].id === args.id) {
                var removed = links[i]
                links.splice(i, 1); 
                return removed;
            }
        }
    }
  },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))