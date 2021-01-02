using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TheGameBackend.Models;

namespace TheGameBackend.Utilities
{
    public class FileAccess : IDataAccess
    {
        IConfiguration Configuration;
        public FileAccess(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public void AddGame(Game game)
        {
            string filePath = $"{Configuration["FilePath"]}\\{game.roomCode}.json";

            if (!File.Exists(filePath))
            {
                try
                {
                    File.Create(filePath).Close();

                    var jsonObj = JsonConvert.SerializeObject(game, Formatting.Indented);
                    File.WriteAllTextAsync(filePath, jsonObj);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.StackTrace);
                }
            }
            else throw new InvalidOperationException();
        }

        public void DeleteGame(Game game)
        {
            string filePath = $"{Configuration["FilePath"]}\\{game.roomCode}.json";
            if (!File.Exists(filePath))
            {
                throw new InvalidOperationException();
            }
            else
            {
                File.Delete(filePath);
            }
        }

        public List<Game> GetAllGames()
        {
            throw new NotImplementedException();
        }

        public Game GetGame(string roomCode)
        {
            Game game;
            string filePath = $"{Configuration["FilePath"]}\\{roomCode}.json";
            if (File.Exists(filePath))
            {
                var jsonObj = File.ReadAllTextAsync(filePath);
                game = JsonConvert.DeserializeObject<Game>(jsonObj.GetAwaiter().GetResult());
                return game;
            }
            else
            {
                throw new InvalidOperationException();
            }
        }

        public void UpdateGame(Game game)
        {
            if(game.participantCount <=0)
            {
                this.DeleteGame(game);
                return;
            }

            string filePath = $"{Configuration["FilePath"]}\\{game.roomCode}.json";

            if (File.Exists(filePath))
            {
                try
                {
                    var jsonObj = JsonConvert.SerializeObject(game, Formatting.Indented);
                    File.WriteAllTextAsync(filePath, jsonObj);
                }
                catch(Exception e)
                {
                    Console.WriteLine(e.StackTrace);
                }
                
            }
            else
            {
                throw new InvalidOperationException();
            }
        }
    }
}
