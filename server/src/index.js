let { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
    },
    Mutation: {
        post: (parent, args) => {
            let idCount = links.length
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            return link
        },

        updateLink: (parent, args) => {
            //Update Link here
            let tempLinks = [...links]
            let index = tempLinks.findIndex((element) => element.id === args.id);
            console.log(index);
            if (args.url) tempLinks[index].url = args.url;
            if (args.description) tempLinks[index].description = args.description;
            links = tempLinks;
        },

        deleteLink: (parent, args) => {
            //Delete Link here
            let tempLinks = [...links]
            let filteredLinks = tempLinks.filter(item => item.id !== args.id);
            links = filteredLinks;
        }
    }
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf-8'
    ),
    resolvers
})

server
    .listen()
    .then(({ url }) => console.log(`Server is running on ${url}`));