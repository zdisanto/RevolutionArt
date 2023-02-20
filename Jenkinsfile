pipeline {
  agent any
  
  tools {nodejs "16.17.0"}
  
  environment {
        AWS_DEFAULT_REGION = 'us-east-1'
  }
  
  stages {
      stage('aws test') {
         steps {
             withCredentials([[
                 $class: 'AmazonWebServicesCredentialsBinding', 
                  credentialsId: '35247357-c17d-4303-90d8-170ca161b229',
                  accessKeyVariable: 'AWS_ACCESS_KEY_ID', 
                  secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                    sh 'aws --version'  
                    sh 'aws ec2 describe-instances'
                  }
        }
      }
      stage('Install Dependencies & Build - backend'){
        steps{
          dir('SourceCode/server'){
            sh 'npm install'
            sh 'npm start' 
          }
        }
      }
      stage('Install Dependencies & Build - frontend'){
        steps{
          dir('SourceCode/client'){
            sh 'npm install --legacy-peer-deps'
            sh 'npm run build'
            sh 'scp -r build/* /var/www/html'
          }
        }
      }
      stage('Test'){
        steps{
          sh 'testing'
        }
      }    
   }
}
