﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using TheGameBackend.Models;
using TheGameBackend.SignalRHubs;
using TheGameBackend.Utilities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TheGameBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomManagementController : ControllerBase
    {
        private static FileAccess fileAccess;
        IConfiguration Configuration;
        ///IMemoryCache cache;
        public RoomManagementController(IConfiguration configuration)
        {
            fileAccess = new FileAccess(configuration);
            Configuration = configuration;
        }

         
        // GET: api/<RoomManagementController>
        [HttpGet]
        public void Get()
        {

           /* QuestionGeneration generation = new QuestionGeneration(Configuration);
            Console.WriteLine(generation.fetchQuestion("Harsha"));*/
        }

        // GET api/<RoomManagementController>/5
        [HttpGet("{id}")]
        public IActionResult Get(string id, string roomCode, string name)
        {
            HttpResponseMessage httpResponse = new HttpResponseMessage();
            if (id.Equals("Quit"))
            {
                Game game = fileAccess.GetGame(roomCode);
                game.participantCount--;
                game.participants.Remove(game.participants.First(x => x.participantName.Equals(name)));
                if (game.participantCount <= 0)
                {
                    fileAccess.DeleteGame(game);
                }
                else
                {
                    fileAccess.UpdateGame(game);
                }
                return new ContentResult()
                {
                    StatusCode = (int)HttpStatusCode.OK,
                };
            }
            else if (id.Equals("All"))
            {
                return new ContentResult()
                {
                    //Content = $"{{\"content\":{JsonConvert.SerializeObject(fileAccess.GetGame(roomCode).participants)}}}",
                    Content = JsonConvert.SerializeObject(fileAccess.GetGame(roomCode).participants),
                    ContentType = "application/json",
                    StatusCode = (int)HttpStatusCode.OK,
                };
            }
            else
            {
                return new ContentResult()
                {
                    StatusCode = (int)HttpStatusCode.NotFound,
                };
            }
        }

        // POST api/<RoomManagementController>
        [HttpPost]
        public async Task<HttpResponseMessage> PostAsync([FromBody] Participant details)
        {
            
            HttpResponseMessage httpResponse = new HttpResponseMessage();
            try
            {
                Game game = fileAccess.GetGame(details.roomCode);
                game.participants.Add(details);
                game.participantCount++;
                fileAccess.UpdateGame(game);
                httpResponse.StatusCode = System.Net.HttpStatusCode.OK;
                //await _hub.Clients.All.SendAsync("participantUpdate", game.participants);
                //await this.room.SendMessage("Hello","World");
                return httpResponse;
            }
            catch(InvalidOperationException)
            {
                Game game = new Game(details.roomCode);
                game.participantCount++;
                game.participants.Add(details);
                fileAccess.AddGame(game);
                httpResponse.StatusCode = System.Net.HttpStatusCode.Created;
                //await _hub.Clients.All.SendAsync("participantUpdate", game.participants);
                //await this.room.SendMessage("Hello", "World");
                return httpResponse;
            }
            catch(Exception E)
            {
                Console.WriteLine(E.StackTrace);
                httpResponse.StatusCode = System.Net.HttpStatusCode.InternalServerError;
                return httpResponse;
            }
        }

        // PUT api/<RoomManagementController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<RoomManagementController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
