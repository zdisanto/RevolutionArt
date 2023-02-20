pipeline {
  agent any
  
  tools {nodejs "16.17.0"}
  
  stages {
      stage('Install Dependencies & Build - backend'){
        steps{
          dir('SourceCode/server'){
            sh 'npm install'
            sh 'npm run build'
          }
        }
      }
      stage('Install Dependencies & Build - frontend'){
        steps{
          dir('SourceCode/client'){
            sh 'npm install --legacy-peer-deps'
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
