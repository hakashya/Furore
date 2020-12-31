using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using TheGameBackend.Models;
using TheGameBackend.Utilities;

namespace TheGameBackend.SignalRHubs
{
    public class RoomHub: Hub
    {
        FileAccess fileAccess;
        IConfiguration Configuration;
        public RoomHub(IConfiguration configuration)
        {
            fileAccess = new FileAccess(configuration);
            Configuration = configuration;
        }

        public virtual Task OnDisconnectedAsync(bool stopCalled)
        {
            // Add your own code here.
            // For example: in a chat application, mark the user as offline, 
            // delete the association between the current connection id and user name.
            return base.OnDisconnectedAsync(new Exception());
        }

        public Task SendMessage(string user, string message)
        {
            return Clients.All.SendAsync("participantUpdate", user, message);
        }

        public async Task<List<Participant>> joinGameRoom(string roomCode, Participant self)
        {
            List<Participant> retVal;
            try
            {
                Game game = fileAccess.GetGame(roomCode);
                game.participants.Add(self);
                game.participantCount++;
                fileAccess.UpdateGame(game);
                retVal = game.participants;
                await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);
                await Clients.Group(roomCode).SendAsync("participantUpdate", game.participants);
                //await Clients.All.SendAsync("participantUpdate", game.participants);
            }
            catch (InvalidOperationException)
            {
                Game game = new Game(roomCode);
                game.participantCount++;
                game.participants.Add(self);
                fileAccess.AddGame(game);
                retVal = game.participants;
                await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);
                await Clients.Group(roomCode).SendAsync("participantUpdate", game.participants);
                //await Clients.All.SendAsync("participantUpdate", game.participants);
            }
            return retVal;
        }

        public async Task readinessUpdate(string roomCode, string participantName)
        {
            try
            {
                Game game = fileAccess.GetGame(roomCode);
                Participant participant = game.participants.First<Participant>(x => x.participantName.Equals(participantName));
                game.participants.Remove(participant);
                participant.isReady = true;
                game.participants.Add(participant);
                fileAccess.UpdateGame(game);
                await Clients.Group(roomCode).SendAsync("participantUpdate", game.participants);

                var count = 0;
                foreach(var person in game.participants)
                {
                    if (person.isReady == true)
                        count++;
                }
                if (count == game.participantCount)
                {
                    QuestionGeneration questionGeneration = new QuestionGeneration(Configuration);
                    await Clients.Group(roomCode).SendAsync("receiveQuestion",questionGeneration.fetchQuestion(game.participants[0].participantName));
                }
                    
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message + "\n");
                Console.WriteLine(e.StackTrace);
            }
        }

        public async Task leaveGameRoom(string roomCode, string participantName)
        {
            try
            {
                Game game = fileAccess.GetGame(roomCode);
                game.participantCount--;
                game.participants.Remove(game.participants.First(x => x.participantName==participantName));
                fileAccess.UpdateGame(game);
                await Clients.Group(roomCode).SendAsync("participantUpdate", game.participants);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message + "\n");
                Console.WriteLine(e.StackTrace);
            }
        }
    }
}
