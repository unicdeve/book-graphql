const graphql = require('graphql');
const _ = require('lodash');

const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLID, 
  GraphQLInt,
  GraphQLList
} = graphql;

// dummy data
var books = [
  {name: 'Men Around the messager', genre: 'Islam', id: '1', authorId: '1'},
  {name: 'Women Around the messager', genre: 'Islam', id: '2', authorId: '2'},
  {name: 'The Nectars', genre: 'Religion', id: '3', authorId: '3'},
  {name: 'The React Pro', genre: 'Programming', id: '4', authorId: '2'},
  {name: 'Intro to Django', genre: 'Python', id: '5', authorId: '3'},
  {name: 'Pro Django + React', genre: 'Python', id: '6', authorId: '3'}
]

var authors = [
  {name: 'Ogunola Shola', age: 23, id: '1'},
  {name: 'Abdullah Thabit Shola', age: 13, id: '2'},
  {name: 'Olajubu HOD shitty', age: 63, id: '3'}
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorId: {type: GraphQLString },
    author: {
      type:AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return _.find(authors, {id: parent.authorId});
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, {authorId: parent.id})
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: { type: GraphQLID }},
      resolve(parent, args) {
        // code to get data from db/other source
        return _.find(books, {id: args.id})
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return _.find(authors, {id: args.id})
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})

