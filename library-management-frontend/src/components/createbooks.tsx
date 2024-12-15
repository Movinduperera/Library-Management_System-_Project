import React, { useState } from 'react';
import { createBook } from '../api/api';
import './createbookstyles.css';

const CreateBooks: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error message before new cheking
    setErrorMessage('');

    // Basic validation to check if all fields are filled
    if (!title || !author || !description) {
      setErrorMessage('All fields are required!');
      return;
    }

    // check author to ensure it doesn't contain numbers
    const authorRegex = /\d/;
    if (author && authorRegex.test(author)) {
      setErrorMessage('Author field cannot contain numbers.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newBook = { title, author, description };
      await createBook(newBook);
      alert('Book created successfully!');
      setTitle('');
      setAuthor('');
      setDescription('');
    } catch (error) {
      console.error('Error creating book:', error);
      setErrorMessage('Failed to create book. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Book</h2>
      
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
};

export default CreateBooks;
