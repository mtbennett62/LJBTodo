using LJBTodo.Data;
using LJBTodo.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;


[Route("api/[controller]")]
[ApiController]
[Authorize]
public class TodoController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    private UserManager<IdentityUser> _userManager;

    public TodoController(ApplicationDbContext context, UserManager<IdentityUser> userManager)
    {
        _context = context;
        _userManager = userManager;
        if (_context.TodoItems == null || _context.TodoItems.Count() == 0)
        {
            // Create a new TodoItem if collection is empty,
            // which means you can't delete all TodoItems.
            _context.TodoItems.Add(new TodoItem { Name = "Item1" });
            _context.SaveChanges();
        }
    }

    [HttpGet]

    public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
    {
        ClaimsPrincipal user = this.User;
        var userId =  _userManager.GetUserId(user);
        var userGuid = Guid.Parse(userId);

        return await _context.TodoItems.Where(x => x.UserGuid == userGuid).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItem>> GetTodoItem(long id)
    {
        var todoItem = await _context.TodoItems.FindAsync(id);

        if (todoItem == null)
        {
            return NotFound();
        }

        return todoItem;
    }

    [HttpPost]
    public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem item)
    {
        if(item.PriorityId == 0)
        {
            item.PriorityId = item.Priority != null ? item.Priority.Id : 1;
        }

        var userId = _userManager.GetUserId(this.User);

        if (Guid.TryParse(userId, out Guid userGuid))
        {
            item.UserGuid = userGuid;
        }

        var newItem = _context.TodoItems.Add(item);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTodoItem), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutTodoItem(long id, TodoItem item)
    {
        if (id != item.Id)
        {
            return BadRequest();
        }

        _context.Entry(item).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodoItem(long id)
    {
        var todoItem = await _context.TodoItems.FindAsync(id);

        if (todoItem == null)
        {
            return NotFound();
        }

        _context.TodoItems.Remove(todoItem);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpGet("priorities")]
    public async Task<ActionResult<IEnumerable<Priority>>> GetPriorities()
    {
        return await _context.Priorities.ToListAsync();
    }

    [HttpGet("categories")]
    public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
    {
        return await _context.Category.ToListAsync();
    }

    [HttpPost("categories")]
    public async Task<ActionResult<Category>> PostCategory(Category category)
    {
        _context.Category.Add(category);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCategories), new { id = category.Id }, category);
    }

    [HttpPut("categories/{id}")]
    public async Task<IActionResult> PutCategory(long id, Category category)
    {
        if (id != category.Id)
        {
            return BadRequest();
        }

        _context.Entry(category).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPost("priorities")]
    public async Task<ActionResult<Priority>> PostPriority(Priority priority)
    {
        _context.Priorities.Add(priority);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPriorities), new { id = priority.Id }, priority);
    }

    [HttpPut("priorities/{id}")]
    public async Task<IActionResult> PutPriority(long id, Priority priority)
    {
        if (id != priority.Id)
        {
            return BadRequest();
        }

        _context.Entry(priority).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
