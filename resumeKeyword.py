from flask import Flask, request, jsonify
import os
import textract
import docx
import PyPDF2

app = Flask(__name__)

# Function to extract technical skills and IT-related keywords from text
def extract_keywords(text):
    # Implement your logic to extract keywords here
    # For this example, let's assume we're extracting keywords that start with "tech_" or "IT_"
    keywords = [ "Python", "Java", "C++", "JavaScript", "Ruby", "PHP", "C#", "Swift",
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
    "Redash", "Kibana", "Sisense", "Periscope Data", "Pentaho", "Cognos", "Zoho Analytics"]
    return keywords

@app.route('/')
def main():
    return 'Homepage'

# API endpoint to upload files and extract keywords
@app.route('/upload', methods=['POST'])
def upload_file():
    uploaded_files = request.files.getlist("file")
    keywords = []

    for file in uploaded_files:
        if file:
            file_extension = os.path.splitext(file.filename)[1].lower()
            if file_extension in ['.pdf', '.doc', '.docx']:
                # Extract text from the file
                if file_extension == '.pdf':
                    text = textract.process(file).decode('utf-8')
                elif file_extension == '.docx':
                    doc = docx.Document(file)
                    text = '\n'.join([p.text for p in doc.paragraphs])
                elif file_extension == '.doc':
                    # You may need to install antiword for .doc files: apt-get install antiword
                    # Note: This part assumes a Unix-like environment
                    text = os.popen('antiword -t ' + file).read()

                # Extract keywords from the text
                keywords.extend(extract_keywords(text))

    return jsonify(keywords=keywords)

if __name__ == '__main__':
    app.run(debug=True)
