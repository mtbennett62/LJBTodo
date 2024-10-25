using LJBTodo.Models.Tasks;
using LJBTodo.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LJBTodo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskSessionController : ControllerBase
    {
        private readonly ITaskSessionService _taskSessionService;
        private UserManager<IdentityUser> _userManager;

        public TaskSessionController(ITaskSessionService taskSessionService, UserManager<IdentityUser> userManager)
        {
            _taskSessionService = taskSessionService;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskSession>>> GetTaskSessions()
        {
            try
            {
                ClaimsPrincipal user = this.User;
                var userId = _userManager.GetUserId(user);
                var userGuid = Guid.Parse(userId);

                var items = await _taskSessionService.GetTaskSessionsForUser(userGuid);
                return Ok(items);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskSession>> GetTaskSession(long id)
        {
            var taskSession = await _taskSessionService.GetTaskSessionById(id);
            return Ok(taskSession);
        }

        [HttpPost]
        public async Task<ActionResult<TaskSession>> PostTaskSession(TaskSession taskSession)
        {
            var newTaskSession = await _taskSessionService.CreateTaskSession(taskSession);
            return Ok(newTaskSession);
        }

        [HttpPut]
        public async Task<ActionResult<TaskSession>> PutTaskSession(TaskSession taskSession)
        {
            var updatedTaskSession = await _taskSessionService.UpdateTaskSession(taskSession);
            return Ok(updatedTaskSession);
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteTaskSession(long id)
        {
            await _taskSessionService.DeleteTaskSession(id);
            return Ok();
        }

        [HttpPost("addtasks")]
        public async Task<ActionResult> AddTasksToSession(long taskSessionId, IEnumerable<long> taskIds)
        {
            await _taskSessionService.AddTasksToSession(taskSessionId, taskIds);
            return Ok();
        }


    }
}
