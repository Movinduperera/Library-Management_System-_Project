import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateBook } from '../api/api';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

const UpdateBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleEditClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedBook) {
      try {
        await updateBook(String(selectedBook.id), selectedBook);
        alert('Book updated successfully!');
        setSelectedBook(null);
        const updatedBooks = books.map((book) =>
          book.id === selectedBook.id ? selectedBook : book
        );
        setBooks(updatedBooks);
      } catch (error) {
        console.error('Error updating book:', error);
        alert('Failed to update book.');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (selectedBook) {
      const { name, value } = e.target;
      setSelectedBook({ ...selectedBook, [name]: value });
    }
  };

  return (
    <div>
      <h2>Update Book</h2>
      {loading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : books.length === 0 ? (
        <p>No books available to update.</p>
      ) : (
        <div>
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
                    <button onClick={() => handleEditClick(book)}>Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal Popup */}
          {selectedBook && (
            <div
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'white',
                padding: '20px',
                zIndex: 1000,
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              <h3>Edit Book</h3>
              <form onSubmit={handleUpdate}>
                <div>
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={selectedBook.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="author">Author:</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={selectedBook.author}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={selectedBook.description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" style={{ marginRight: '10px' }}>
                  Save Changes
                </button>
                <button type="button" onClick={() => setSelectedBook(null)}>
                  Cancel
                </button>
              </form>
            </div>
          )}

          {/* Background Overlay */}
          {selectedBook && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999,
              }}
              onClick={() => setSelectedBook(null)}
            ></div>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdateBooks;
