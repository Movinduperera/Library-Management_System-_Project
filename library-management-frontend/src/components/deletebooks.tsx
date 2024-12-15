import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Interface to define the structure of Book data
interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

const DeleteBook: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);  
  const [loading, setLoading] = useState<boolean>(true);  
  const [error, setError] = useState<string | null>(null);  

  // Fetch books on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5202/api/books');
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching books. Please try again later.');
        setLoading(false);
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  // Function to delete a book
  const handleDelete = async (bookId: number) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`http://localhost:5202/api/books/${bookId}`);
        alert('Book deleted successfully!');
        // Remove the book from the list after deletion
        setBooks(books.filter((book) => book.id !== bookId));
      } catch (error) {
        alert('Failed to delete book.');
        console.error('Error deleting book:', error);
      }
    }
  };

  // Render the component
  return (
    <div>
      <h2>Delete Book</h2>
      {loading ? (
        <p>Loading books...</p> 
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p> 
      ) : books.length === 0 ? (
        <p>No books available to delete.</p>  
      ) : (
        <table border={1} style={{ width: '100%', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.description}</td>
                <td>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DeleteBook;
