using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TheGameBackend.Models
{
    public class Game
    {
        public string roomCode { get; set; }
        public int participantCount { get; set; }
        public int roundCount { get; set; }
        public List<Participant> participants { get; set; }

        public Game(string roomCode)
        {
            this.roomCode = roomCode;
            participants = new List<Participant>();
            participantCount = 0;
            roundCount = 0;

        }
    }
}
