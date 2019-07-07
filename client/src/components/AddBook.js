import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';


const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`

class AddBook extends React.Component {

  displayAuthors() {
    var data = this.props.data;
    if(data.loading) {
      return (
        <option disabled>Loading authors</option>
      )
    } else {
      return data.authors.map(author => {
        return (
          <option id={author.id} value={author.id}>{author.name}</option>
        )
      })
    }
  }
  
  render() {
    return ( 
      <div>
        <form id="add-book">
          <div className="field">
            <label>Book name:</label>
            <input type="text" />
          </div>
          <div className="field">
            <label>Genre:</label>
            <input type="text" />
          </div>
          <div className="field">
            <label>Author:</label>
            <select>
              <option>Select author</option>
              { this.displayAuthors() }
            </select>
          </div>
          <button> + </button>
        </form>
      </div>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);