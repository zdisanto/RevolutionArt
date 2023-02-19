pipeline {
  agent any
  stages {
      stage('Install Dependencies & Build'){
        steps{
          dir('RevolutionArt/SourceCode/client'){
            sh 'npm install'
            sh 'npm run build'
          }
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
