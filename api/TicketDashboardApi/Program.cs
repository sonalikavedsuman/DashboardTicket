using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using TicketDashboardApi.DataContext;
using TicketDashboardApi.Models;
using TicketDashboardApi.Services.ClientContentService;
using TicketDashboardApi.Services.DocumentEditorService;
using TicketDashboardApi.Services.PersonalInfoService;
using TicketDashboardApi.Services.ProjectInfoService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<TicketDashboardDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"),
        x => x.MigrationsAssembly("TicketDashboardApi")));

builder.Services.AddScoped<IPersonalInfoService, PersonalInfoService>();
builder.Services.AddScoped<IProjectInfoService, ProjectInfoService>();
builder.Services.AddScoped<IClientContentService, ClientContentService>();
builder.Services.AddScoped<IDocumentEditorService, DocumentEditorService>();
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.WriteIndented = true; // Optional: for prettier JSON
    });
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
