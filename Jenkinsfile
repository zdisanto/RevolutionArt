pipeline {
  agent any
  stages {
      stage('Install Dependencies & Build'){
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
