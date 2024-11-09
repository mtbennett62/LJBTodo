using LJBTodo.Data;
using LJBTodo.Models.Spaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LJBTodo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SpacesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;


        public SpacesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Space>>> GetSpaces()
        {
            return await _context.Spaces.ToListAsync();
        }


        [HttpPost]
        public async Task<ActionResult<Space>> PostSpace(Space space)
        {
            _context.Spaces.Add(space);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSpace", new { id = space.Id }, space);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Space>> GetSpace(long id)
        {
            var space = await _context.Spaces.FindAsync(id);

            if (space == null)
            {
                return NotFound();
            }

            return space;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSpace(long id, Space space)
        {
            if (id != space.Id)
            {
                return BadRequest();
            }

            _context.Entry(space).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Spaces.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSpace(long id)
        {
            var space = await _context.Spaces.FindAsync(id);
            if (space == null)
            {
                return NotFound();
            }

            _context.Spaces.Remove(space);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("tools")]
        public async Task<ActionResult<IEnumerable<Tool>>> GetTools()
        {
            return await _context.Tools.ToListAsync();
        }

        [HttpPost("tools")]
        public async Task<ActionResult<Tool>> PostTool(Tool tool)
        {
            _context.Tools.Add(tool);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTool", new { id = tool.Id }, tool);
        }

        [HttpGet("tools/{id}")]
        public async Task<ActionResult<Tool>> GetTool(long id)
        {
            var tool = await _context.Tools.FindAsync(id);

            if (tool == null)
            {
                return NotFound();
            }

            return tool;
        }

        [HttpPut("tools/{id}")]
        public async Task<IActionResult> PutTool(long id, Tool tool)
        {
            if (id != tool.Id)
            {
                return BadRequest();
            }

            _context.Entry(tool).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Tools.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("tools/{id}")]
        public async Task<IActionResult> DeleteTool(long id)
        {
            var tool = await _context.Tools.FindAsync(id);
            if (tool == null)
            {
                return NotFound();
            }

            _context.Tools.Remove(tool);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
