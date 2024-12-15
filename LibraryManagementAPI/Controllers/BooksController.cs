using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryManagementAPI.Data;
using LibraryManagementAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace LibraryManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly LibraryContext _context;

        public BooksController(LibraryContext context)
        {
            _context = context;
        }

        // Get a book by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound(new { message = "Book not found." });
            }

            return book;
        }

        // Get all books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            var books = await _context.Books.ToListAsync();

            if (books.Count == 0)
            {
                return NotFound(new { message = "No books available." });
            }

            return books;
        }

        // Create a new book
        [HttpPost]
        public async Task<IActionResult> CreateBook([FromBody] Book book)
        {
            // check input data
            if (book == null)
            {
                return BadRequest(new { message = "Invalid book data." });
            }

            // check Title and Author fields
            if (string.IsNullOrWhiteSpace(book.Title) || string.IsNullOrWhiteSpace(book.Author))
            {
                return BadRequest(new { message = "Title and Author are required." });
            }

            // check Author to ensure it does not contain numbers
            if (ContainsNumbers(book.Author))
            {
                return BadRequest(new { message = "Author field cannot contain numbers." });
            }

            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
        }

        // Update an existing book
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, Book book)
        {
            if (id != book.Id)
            {
                return BadRequest(new { message = "Book ID mismatch." });
            }

            // check Author to ensure it does not contain numbers
            if (ContainsNumbers(book.Author))
            {
                return BadRequest(new { message = "Author field cannot contain numbers." });
            }

            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound(new { message = "Book not found." });
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
        }

        // Delete a book by ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound(new { message = "Book not found." });
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Helper method to check if Author contains numbers
        private bool ContainsNumbers(string input)
        {
            return Regex.IsMatch(input, @"\d");
        }

        // Helper method to check if a book exists
        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.Id == id);
        }
    }
}
