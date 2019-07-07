import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';


const getBookQuery = gql`
  {
    books {
      name
      id
    }
  }
`

class BookList extends React.Component {
  displayBooks() {
    var data = this.props.data;
    if(data.loading) {
      return (
        <div>Loading books...</div>
      )
    } else {
      return data.books.map(book => (
        <li key={book.id}>{ book.name }</li>
      ))
    }
  }
  render() {
    return ( 
      <div>
        <ul id="book-list">
          { this.displayBooks() }
        </ul>
      </div>
    );
  }
}

export default graphql(getBookQuery)(BookList);