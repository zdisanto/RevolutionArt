pipeline {
  agent any
  
  dir('RevolutionArt/SourceCode/client'){
    stages {
      stage('Install Dependencies & Build'){
        steps{
          sh 'npm install'
          sh 'npm run build'
        }
      }
      stage('Test'){
        steps{
          sh 'testing'
        }
      }
      stage('Deploy'){
        steps{
          sh 'deploying'
        }
      }
    }
  }
}
