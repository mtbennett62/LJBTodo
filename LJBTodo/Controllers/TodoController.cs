using LJBTodo.Data;
using LJBTodo.Models;
using LJBTodo.Models.Tasks;
using LJBTodo.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;


[Route("api/[controller]")]
[ApiController]
[Authorize]
public class TodoController : Controller
{
    private readonly ITaskService _taskService;
    private readonly IPriorityService _priorityService;
    private readonly ICategoryService _categoryService;
    private Guid _currentUserGuid;

    private UserManager<IdentityUser> _userManager;

    public TodoController(UserManager<IdentityUser> userManager, ITaskService taskService, IPriorityService priorityService, ICategoryService categoryService)
    {
        _userManager = userManager;
        _taskService = taskService;
        _priorityService = priorityService;

        _categoryService = categoryService;
    }

    public override void OnActionExecuting(ActionExecutingContext context)
    {
        base.OnActionExecuting(context);
        ClaimsPrincipal user = this.User;
        var userId = _userManager.GetUserId(user);
        _currentUserGuid = Guid.Parse(userId);
    }

    [HttpGet]

    public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
    {
        try
        {
            var items = await _taskService.GetAllTasksForUser(_currentUserGuid);
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
        var todoItem = await _taskService.GetTaskById(id);

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

        var newItem = await _taskService.CreateTask(item);

        return CreatedAtAction(nameof(GetTodoItem), new { id = newItem.Id }, newItem);
    }

    [HttpPut("{id}")]
    public IActionResult PutTodoItem(long id, TodoItem item)
    {
        if (id != item.Id)
        {
            return BadRequest();
        }

        _taskService.UpdateTask(item);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodoItem(long id)
    {
        await _taskService.DeleteTask(id);

        return NoContent();
    }

    [HttpGet("priorities")]
    public ActionResult<IEnumerable<Priority>> GetPriorities()
    {
        try
        {
            var priorities = _priorityService.GetPriorities();
            return Ok(priorities);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpGet("categories")]
    public ActionResult<IEnumerable<Category>> GetCategories()
    {
        try
        {
            var categories = _categoryService.GetCategories();
            return Ok(categories);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpPost("categories")]
    public async Task<ActionResult<Category>> PostCategory(Category category)
    {
        var newCategory = await _categoryService.CreateCategory(category);

        return CreatedAtAction(nameof(GetCategories), new { id = newCategory.Id }, newCategory);
    }

    [HttpPut("categories/{id}")]
    public IActionResult PutCategory(long id, Category category)
    {
        if (id != category.Id)
        {
            return BadRequest();
        }

        _categoryService.UpdateCategory(category);

        return NoContent();
    }

    [HttpPost("priorities")]
    public async Task<ActionResult<Priority>> PostPriority(Priority priority)
    {
        var newPriority = await _priorityService.CreatePriority(priority);

        return CreatedAtAction(nameof(GetPriorities), new { id = newPriority.Id }, newPriority);
    }

    [HttpPut("priorities/{id}")]
    public IActionResult PutPriority(long id, Priority priority)
    {
        if (id != priority.Id)
        {
            return BadRequest();
        }

        _priorityService.UpdatePriority(priority);

        return NoContent();
    }

    [HttpGet("comments/{taskId}")]
    public async Task<ActionResult<IEnumerable<Comment>>> GetComments(long taskId)
    {
        try
        {
            var comments = await _taskService.GetCommentsForTask(taskId);
            return Ok(comments);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
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

        var newComment = await _taskService.CreateComment(comment);

        return CreatedAtAction(nameof(GetComments), new { taskId = newComment.TodoItemId }, newComment);
    }

    [HttpGet("repeatTasks")]
    public async Task<ActionResult<IEnumerable<RepeatTaskTemplate>>> GetRepeatTasks()
    {
        var templates = await _taskService.GetRepeatTaskTemplatesForUser(_currentUserGuid);
        return Ok(templates);
    }

    [HttpPost("repeatTask")]
    public async Task<ActionResult<RepeatTaskTemplate>> PostRepeatTask(RepeatTaskTemplate repeatTask)
    {
        if (repeatTask.PriorityId == 0)
        {
            repeatTask.PriorityId = repeatTask.Priority != null ? repeatTask.Priority.Id : 1;
        }

        var userId = _userManager.GetUserId(this.User);

        if (Guid.TryParse(userId, out Guid userGuid))
        {
            repeatTask.UserGuid = userGuid;
        }

        var newItem = await _taskService.CreateTask(repeatTask);

        return CreatedAtAction(nameof(GetRepeatTask), new { id = newItem.Id }, newItem);
    }

    [HttpPut("repeatTask/{id}")]
    public IActionResult PutRepeatTask(long id, RepeatTaskTemplate repeatTask)
    {
        if (id != repeatTask.Id)
        {
            return BadRequest();
        }

        _taskService.UpdateRepeatTaskTemplate(repeatTask);

        return NoContent();
    }

    [HttpDelete("repeatTask/{id}")]
    public async Task<IActionResult> DeleteRepeatTask(long id)
    {
        await _taskService.DeleteRepeatTaskTemplate(id);

        return NoContent();
    }

    [HttpGet("repeatTask/{id}")]
    public async Task<ActionResult<RepeatTaskTemplate>> GetRepeatTask(long id)
    {
        var repeatTask = await _taskService.GetRepeatTaskTemplateById(id);

        if (repeatTask == null)
        {
            return NotFound();
        }

        return repeatTask;
    }
}
