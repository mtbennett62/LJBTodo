using Duende.IdentityServer.EntityFramework.Options;
using LJBTodo.Models;
using LJBTodo.Models.Spaces;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LJBTodo.Data
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public ApplicationDbContext(DbContextOptions options)
            : base(options)
        {

        }

        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<RepeatTaskTemplate> RepeatTaskTemplates { get; set; }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Escalation> Escalations { get; set; }
        public DbSet<Priority> Priorities { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Space> Spaces { get; set; }
        public DbSet<Tool> Tools { get; set; }
    }
}