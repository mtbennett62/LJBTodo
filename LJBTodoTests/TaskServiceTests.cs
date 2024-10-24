using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Duende.IdentityServer.Extensions;
using LJBTodo.Data.Repositories.Interfaces;
using LJBTodo.Models;
using LJBTodo.Models.Tasks;
using LJBTodo.Services;
using Moq;
using NUnit;
using NUnit.Framework;
using NUnit.Framework.Legacy;

namespace LJBTodo.Tests.Services
{
    public class TaskServiceTests
    {
        private Mock<ITodoRepository> _todoRepositoryMock;
        private TaskService _taskService;
        private Mock<IRepository<RepeatTaskTemplate>> _repeatTaskTemplateRepositoryMock;

        [SetUp]
        public void Setup()
        {
            _todoRepositoryMock = new Mock<ITodoRepository>();
            _repeatTaskTemplateRepositoryMock = new Mock<IRepository<RepeatTaskTemplate>>();
            _taskService = new TaskService(_todoRepositoryMock.Object, _repeatTaskTemplateRepositoryMock.Object);
        }

        [Test]
        public async Task GetAllTasksForUser_ShouldReturnAllTasksForUser()
        {
            // Arrange
            Guid userId = Guid.NewGuid();
            IEnumerable<TodoItem> expectedTasks = new List<TodoItem>
                {
                    new TodoItem { Id = 1, UserGuid = userId, Description = "Task 1" },
                    new TodoItem { Id = 2, UserGuid = userId, Description = "Task 2" },
                    new TodoItem { Id = 3, UserGuid = userId, Description = "Task 3" }
                };
            _todoRepositoryMock.Setup(repo => repo.GetTodoForUser(userId)).ReturnsAsync(expectedTasks);

            // Act
            var result = await _taskService.GetAllTasksForUser(userId);

            // Assert
            CollectionAssert.AreEqual(expectedTasks, result);

        }

        [Test]
        public async Task GetAllTasksForUser_ShouldReturnEmptyListIfNoTasksForUser()
        {
            // Arrange
            Guid userId = Guid.NewGuid();
            IEnumerable<TodoItem> expectedTasks = new List<TodoItem>();
            _todoRepositoryMock.Setup(repo => repo.GetTodoForUser(userId)).ReturnsAsync(expectedTasks);

            // Act
            var result = await _taskService.GetAllTasksForUser(userId);

            // Assert
            CollectionAssert.AreEqual(expectedTasks, result);
        }

        [Test]
        public async Task GetAllTasksForUser_ShouldNotReturnTasksForOtherUsers()
        {
            // Arrange
            Guid userId = Guid.NewGuid();
            Guid otherUserId = Guid.NewGuid();
            IEnumerable<TodoItem> expectedTasks = new List<TodoItem>
                {
                    new TodoItem { Id = 1, UserGuid = userId, Description = "Task 1" },
                    new TodoItem { Id = 2, UserGuid = userId, Description = "Task 2" },
                    new TodoItem { Id = 3, UserGuid = userId, Description = "Task 3" }
                };
            _todoRepositoryMock.Setup(repo => repo.GetTodoForUser(userId)).ReturnsAsync(expectedTasks);

            // Act
            var result = await _taskService.GetAllTasksForUser(otherUserId);

            // Assert
            Assert.That(result.IsNullOrEmpty());
        }

        [Test]
        public async Task GetAllTasksForUser_ShouldReturnTasksInOrderOfDueDateThenPriority()
        {             // Arrange
            Guid userId = Guid.NewGuid();
            var priorityLow = new Priority { Id = 1, OrderPosition = 2, Name = "Low" };
            var priorityMedium = new Priority { Id = 2,  OrderPosition = 3, Name = "Medium" };
            var priorityHigh = new Priority { Id = 3, OrderPosition = 10, Name = "High" };

            IEnumerable<TodoItem> expectedTasks = new List<TodoItem>
                {
                    new TodoItem { Id = 1, UserGuid = userId, Description = "Task 1", DueDate = DateTime.Now.AddDays(1), Priority = priorityMedium },
                    new TodoItem { Id = 2, UserGuid = userId, Description = "Task 2", DueDate = DateTime.Now.AddDays(1), Priority = priorityHigh },
                    new TodoItem { Id = 3, UserGuid = userId, Description = "Task 3", DueDate = DateTime.Now.AddDays(3), Priority = priorityMedium },
                    new TodoItem { Id = 4, UserGuid = userId, Description = "Task 4", DueDate = DateTime.Now.AddDays(2), Priority = priorityMedium },
                    new TodoItem { Id = 5, UserGuid = userId, Description = "Task 5", DueDate = DateTime.Now.AddDays(3), Priority = priorityHigh },
                    new TodoItem { Id = 6, UserGuid = userId, Description = "Task 6", DueDate = DateTime.Now.AddDays(1), Priority = priorityLow },
                    new TodoItem { Id = 7, UserGuid = userId, Description = "Task 7", DueDate = DateTime.Now.AddDays(2), Priority = priorityHigh },
                    new TodoItem { Id = 8, UserGuid = userId, Description = "Task 8", DueDate = DateTime.Now.AddDays(3), Priority = priorityLow },
                    new TodoItem { Id = 9, UserGuid = userId, Description = "Task 9", DueDate = DateTime.Now.AddDays(2), Priority = priorityLow }
                };
            _todoRepositoryMock.Setup(repo => repo.GetTodoForUser(userId)).ReturnsAsync(expectedTasks);

            // Act
            var result = await _taskService.GetAllTasksForUser(userId);

            // Assert
            Assert.That(result, Is.Ordered.By("DueDate").Then.By("Priority.OrderPosition"));
        }


        // Add more unit tests for other methods

        // public async Task<TodoItem> CreateTask(TodoItem task)
        [Test]
        public async Task CreateTask_ShouldCreateTask()
        {
            // Arrange
            var task = new TodoItem { Id = 1, Description = "Task 1" };
            _todoRepositoryMock.Setup(repo => repo.CreateAsync(task, false)).ReturnsAsync(task);

            // Act
            var result = await _taskService.CreateTask(task);

            // Assert
            Assert.That(result.Equals(task));
        }
         
        // public async Task<bool> DeleteTask(long taskId)
        // public async Task<TodoItem> GetTaskById(long taskId)
        // public async Task<TodoItem> UpdateTask(TodoItem task)
    }
}
