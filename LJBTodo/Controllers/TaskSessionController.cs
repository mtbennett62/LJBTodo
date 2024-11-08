using LJBTodo.Models.DTOs;
using LJBTodo.Models.Tasks;
using LJBTodo.Services.Interfaces;
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
            ClaimsPrincipal user = this.User;
            var userId = _userManager.GetUserId(user);
            var userGuid = Guid.Parse(userId);

            taskSession.UserGuid = userGuid;

            var newTaskSession = await _taskSessionService.CreateTaskSession(taskSession);
            return Ok(newTaskSession);
        }

        [HttpPut]
        public ActionResult<TaskSession> PutTaskSession(TaskSession taskSession)
        {
            var updatedTaskSession = _taskSessionService.UpdateTaskSession(taskSession);
            return Ok(updatedTaskSession);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTaskSession(long id)
        {
            await _taskSessionService.DeleteTaskSession(id);
            return Ok();
        }

        [HttpPost("updatetasks")]
        public async Task<ActionResult> UpdateTasksForSession(UpdateSessionTasksDTO updateSessionTasksDTO)
        {
            await _taskSessionService.UpdateTasksForSession(updateSessionTasksDTO.TaskSessionId, updateSessionTasksDTO.AddedTaskIds, updateSessionTasksDTO.RemovedTaskIds);
            return Ok();
        }

        [HttpPost("addrepeats/{id}")]
        public async Task<ActionResult<AddRepeatTasksToSessionResponse>> AddRepeatTasksToSession(long id, List<long> templateIds)
        {
            return await _taskSessionService.AddRepeatTasksForSession(id, templateIds);
        }


    }
}
