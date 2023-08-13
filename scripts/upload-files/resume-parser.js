
const natural = require('natural');
const fs = require('fs');
const PDFParser = require('pdf-parse');

const tokenizer = new natural.WordTokenizer();
async function extractTextFromPDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await PDFParser(dataBuffer);
  return data.text;
}
function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}
// Function to extract keywords from text
function extractKeywords(text) {
  // Tokenize the text
  var tokens = tokenizer.tokenize(text);
  var matched=[];
  // Filter keywords based on certain criteria
  const skills =["Python","angular","angular2+","react","redux","front end", "Java", "C++", "JavaScript", "Ruby", "PHP", "C#", "Swift",
  "Go", "Rust", "TypeScript", "Kotlin", "Perl", "Scala", "HTML", "CSS",
  "SQL", "R", "MATLAB", "Shell", "Bash", "Lua", "Perl", "Haskell", "Objective-C",
  "VB.NET", "Groovy", "Dart", "F#", "COBOL", "Fortran", "Ada", "Lisp", "Prolog",
  "Assembly", "Pascal", "PL/SQL", "T-SQL", "VBScript", "Delphi", "Scheme", "Clojure","Agile", "Scrum", "Kanban", "Lean", "XP (Extreme Programming)", "SAFe (Scaled Agile Framework)",
  "Crystal", "FDD (Feature-Driven Development)", "DSDM (Dynamic Systems Development Method)",
  "TDD (Test-Driven Development)", "BDD (Behavior-Driven Development)", "DevOps", "Continuous Integration",
  "Continuous Delivery", "Pair Programming", "Sprint", "User Story", "Product Owner", "Scrum Master",
  "Agile Coach", "Retrospective", "Planning Poker", "Agile Manifesto", "Agile Values", "Agile Principles",
  "Backlog", "Burn-down Chart", "Agile Estimation", "Daily Stand-up", "Incremental Development","Selenium", "Appium", "Cucumber", "TestNG", "JUnit", "Jenkins", "Travis CI",
  "CircleCI", "GitLab CI/CD", "TeamCity", "Bamboo", "Robot Framework", "Postman",
  "SoapUI", "JIRA", "Trello", "Confluence", "Maven", "Gradle", "Chef", "Puppet",
  "Ansible", "Docker", "Kubernetes", "Vagrant", "Terraform", "AWS CloudFormation",
  "Azure DevOps", "Octopus Deploy", "Nagios", "Zabbix", "Prometheus", "Grafana",
  "ELK Stack", "Splunk", "New Relic", "Datadog", "AppDynamics", "Splunk", "Graylog","Tableau", "Power BI", "QlikView", "Looker", "D3.js", "Plotly", "Matplotlib",
  "Seaborn", "Bokeh", "Highcharts", "Ggplot2", "FusionCharts", "Google Charts",
  "ECharts", "Flourish", "Infogram", "Chart.js", "FineReport", "Grapher", "Sigma.js",
  "GraphX", "Cytoscape", "NetworkX", "Vega", "Vega-Lite", "Splunk", "Grafana", "Metabase",
  "Redash", "Kibana", "Sisense", "Periscope Data", "Pentaho", "Cognos", "Zoho Analytics"];
  for(var token of tokens){
  for(var skill of skills){
    if(token.toLowerCase().trim() === skill.toLowerCase().trim()){
matched.push(skill)
    }
    }
  }
  return matched.filter(onlyUnique)
}
async function parseResumes(filePath){
  var keywords=[];
  await extractTextFromPDF(filePath)
  .then(text => {
    const resumeText =text;
    keywords = extractKeywords(resumeText);
    console.log(keywords)
    
  })
  .catch(error => {
    console.error('Error extracting text from PDF:', error);
  });
  
  return keywords
  // Usage example
 
}
module.exports =parseResumes;