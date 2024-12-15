using Microsoft.EntityFrameworkCore;
using LibraryManagementAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// Add services to the container.
builder.Services.AddDbContext<LibraryContext>(options =>
    options.UseSqlite("Data Source= LibraryManagementDB.db"));
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add other services like controllers
builder.Services.AddControllers();

var app = builder.Build();

// 2. Use CORS middleware
app.UseCors("AllowAllOrigins");

// 3. Map controllers (API endpoints)
app.MapControllers();

app.Run();