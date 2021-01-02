using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TheGameBackend.Models;

namespace TheGameBackend.Utilities
{
    public class QuestionGeneration
    {
        IConfiguration Configuration;
        public QuestionGeneration(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public string fetchQuestion(string name)
        {
            List<Question> questions = readQuestions();
            Random random = new Random();
            return questions[random.Next(0, questions.Count - 1)].question.Replace("placeholder",name);

        }

        private List<Question> readQuestions()
        {
            string questionsFilePath = Configuration["QuestionsFilePath"];
            var jArray = JsonConvert.DeserializeObject<List<Question>>(File.ReadAllTextAsync(questionsFilePath).Result);
            
            return jArray;
        }
    }
}
