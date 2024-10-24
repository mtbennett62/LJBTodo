using LJBTodo.Data;
using LJBTodo.Models;
using LJBTodo.Models.Tasks;
using LJBTodo.Services;
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
    private readonly ITaskService _taskService;

    private UserManager<IdentityUser> _userManager;

    public TodoController(ApplicationDbContext context, UserManager<IdentityUser> userManager, ITaskService taskService)
    {
        _context = context;
        _userManager = userManager;
        _taskService = taskService;
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
        try
        {
            ClaimsPrincipal user = this.User;
            var userId = _userManager.GetUserId(user);
            var userGuid = Guid.Parse(userId);

            //return await _context.TodoItems.Where(x => x.UserGuid == userGuid).Include(x => x.Comments).ToListAsync();
            var items = await _taskService.GetAllTasksForUser(userGuid);
            return Ok(items);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }

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
        if (item.PriorityId == 0)
        {
            item.PriorityId = item.Priority != null ? item.Priority.Id : 1;
        }

        var userId = _userManager.GetUserId(this.User);

        if (Guid.TryParse(userId, out Guid userGuid))
        {
            item.UserGuid = userGuid;
        }

        //var newItem = _context.TodoItems.Add(item);
        //await _context.SaveChangesAsync();

        var newItem = await _taskService.CreateTask(item);

        return CreatedAtAction(nameof(GetTodoItem), new { id = newItem.Id }, newItem);
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

    [HttpGet("comments/{taskId}")]
    public async Task<ActionResult<IEnumerable<Comment>>> GetComments(long taskId)
    {
        return await _context.Comments.Where(c => c.TodoItemId == taskId).ToListAsync();
    }

    [HttpPost("comment")]
    public async Task<ActionResult<Comment>> PostComment(Comment comment)
    {
        comment.CreatedAt = DateTime.Now;
        var userId = _userManager.GetUserId(this.User);

        if (Guid.TryParse(userId, out Guid userGuid))
        {
            comment.CreatedBy = userGuid;
        }

        _context.Comments.Add(comment);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetComments), new { taskId = comment.TodoItemId }, comment);
    }

    [HttpGet("repeatTasks")]
    public async Task<ActionResult<IEnumerable<RepeatTaskTemplate>>> GetRepeatTasks()
    {
        return await _context.RepeatTaskTemplates.ToListAsync();
    }

    [HttpPost("repeatTask")]
    public async Task<ActionResult<RepeatTaskTemplate>> PostRepeatTask(RepeatTaskTemplate repeatTask)
    {
        _context.RepeatTaskTemplates.Add(repeatTask);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetRepeatTasks), new { id = repeatTask.Id }, repeatTask);
    }

    [HttpPut("repeatTask/{id}")]
    public async Task<IActionResult> PutRepeatTask(long id, RepeatTaskTemplate repeatTask)
    {
        if (id != repeatTask.Id)
        {
            return BadRequest();
        }

        _context.Entry(repeatTask).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
