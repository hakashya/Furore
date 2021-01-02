using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TheGameBackend.Models
{
    public class Answer
    {
        public string answer { get; set; }
        public string participantName { get; set; }
        public int vote { get; set; }
    }
}
