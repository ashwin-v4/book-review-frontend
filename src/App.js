import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://3.6.126.133'; // Your backend EC2 instance IP

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
  });

  // Fetch all books
  useEffect(() => {
    axios.get(`${API_BASE_URL}/books`)
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook(prev => ({ ...prev, [name]: value }));
  };

  // Add a new book
  const addBook = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE_URL}/books`, newBook)
      .then(() => {
        alert('Book added successfully!');
        setNewBook({ title: '', author: '', genre: '', description: '' });
        return axios.get(`${API_BASE_URL}/books`); // Refresh book list
      })
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error adding book:', error));
  };

  return (
    <div className="App">
      <h1>Book Review System</h1>

      <form onSubmit={addBook}>
        <input
          type="text"
          name="title"
          value={newBook.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="author"
          value={newBook.author}
          onChange={handleInputChange}
          placeholder="Author"
          required
        />
        <input
          type="text"
          name="genre"
          value={newBook.genre}
          onChange={handleInputChange}
          placeholder="Genre"
          required
        />
        <textarea
          name="description"
          value={newBook.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        ></textarea>
        <button type="submit">Add Book</button>
      </form>

      <h2>Book List</h2>
      <ul>
        {books.map(book => (
          <li key={book.BookID}>
            <strong>{book.Title}</strong> by {book.Author} ({book.Genre})
            <p>{book.Description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
