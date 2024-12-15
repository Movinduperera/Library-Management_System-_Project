import axios from 'axios';

const API_BASE_URL = 'http://localhost:5202/api'; // Replace with your API base URL

export const getBooks = async () => {
  const response = await axios.get(`${API_BASE_URL}/books`);
  return response.data;
};

export const createBook = async (book: { title: string; author: string; description: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/books`, book, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error in createBook API:', error);
    throw error;
  }
};

// API call to update a book
export const updateBook = async (id: string, book: { title: string; author: string; description: string }) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/books/${id}`, book);
    return response.data;
  } catch (error) {
    console.error('Error in updateBook API:', error);
    throw error;
  }
};

export const deleteBook = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/books/${id}`);
  return response.data;
};
