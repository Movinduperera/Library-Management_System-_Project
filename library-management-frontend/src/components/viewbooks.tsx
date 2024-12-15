import React, { useEffect, useState } from 'react';
import { getBooks } from '../api/api';
import './viewbookstyles.css';


const ViewBooks: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Books List</h2>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <table border={1} style={{ width: '100%', marginBottom: '20px', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewBooks;
