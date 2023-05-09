pipeline {
  agent any
  
  environment {
        AWS_DEFAULT_REGION = 'us-east-1'
  }
  
  options {
  buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '27', daysToKeepStr: '', numToKeepStr: '27')
  }

  stages {
    stage('Slack') {
      steps {
        slackSend message: 'QA Pipleline Build Complete - Status: SUCCESS '
      }
    }
    
    stage('Build'){
      steps {
        sh 'echo "/Users/kishorekanchan/Workspace/JenkinsAutomation/deployBuildQa.p" > path.txt'
        archiveArtifacts(artifacts: '**/*.txt', followSymlinks: false)
        sh 'export PYTHONPATH=$PATH_TO_MODULE:$PYTHONPATH'
        sh 'pip3 install boto3 paramiko'
        sh 'python3 /Users/kishorekanchan/Workspace/JenkinsAutomation/deployBuildQa.py'
        
      }
      post {
        always {
          emailext attachLog: true, body: 'Revolution Art-Jenkins Build Report ', subject: 'Jenkins Build Report', to: 'revolutionart2023@gmail.com'
        }
      }
    }
    stage('Test'){
         steps{
          sh 'export PYTHONPATH=$PATH_TO_MODULE:$PYTHONPATH'
          sh 'pip3 install boto3 paramiko'
          sh 'python3 /Users/kishorekanchan/Workspace/JenkinsAutomation/testing.py'
         }
    }
     stage('Deploy'){
         steps{
          sh 'export PYTHONPATH=$PATH_TO_MODULE:$PYTHONPATH'
          sh 'pip3 install boto3 paramiko'
          sh 'python3 /Users/kishorekanchan/Workspace/JenkinsAutomation/deployToNginx.py'
         }
         post {
           always {
             emailext attachLog: true, 
               body: '''Greetings Revolution Art,
This email is to notify you that the latest Jenkins build has completed.

Please find the build log attached.

Regards,
Devs
''', 
               subject: 'Jenkins Build Report', to: 'revolutionart2023@gmail.com'
           }
         }
    }
    
  }
  
}









// pipeline {
//   agent any
  
//   environment {
//         AWS_DEFAULT_REGION = 'us-east-1'
//   }
  
//   stages {
//     stage('Build'){
//       steps {
//         sh 'export PYTHONPATH=$PATH_TO_MODULE:$PYTHONPATH'
//         sh 'pip3 install boto3 paramiko'
//         sh 'python3 /Users/kishorekanchan/Workspace/JenkinsAutomation/deployBuildQa.py'
        
//       }
//       post {
//         always {
//           emailext attachLog: true, body: 'Revolution Art-Jenkins Build Report ', subject: 'Jenkins Build Report', to: 'revolutionart2023@gmail.com'
//         }
//       }
//     }
//     stage('Test'){
//          steps{
//           sh 'export PYTHONPATH=$PATH_TO_MODULE:$PYTHONPATH'
//           sh 'pip3 install boto3 paramiko'
//           sh 'python3 /Users/kishorekanchan/Workspace/JenkinsAutomation/testing.py'
//          }
//     }
//      stage('Deploy'){
//          steps{
//           sh 'export PYTHONPATH=$PATH_TO_MODULE:$PYTHONPATH'
//           sh 'pip3 install boto3 paramiko'
//           sh 'python3 /Users/kishorekanchan/Workspace/JenkinsAutomation/deployToNginx.py'
//          }
//          post {
//            always {
//              emailext attachLog: true, 
//                body: 'Revolution Art-Jenkins Build Report', subject: 'Jenkins Build Report', to: 'revolutionart2023@gmail.com'
//            }
//          }
//     }
    
//   }
  
// }















// pipeline {
//   agent any
  
// //   tools {
// //     nodejs "16.17.0"
// //     pm2 "pm2"
// //   }
  
//   environment {
//         AWS_DEFAULT_REGION = 'us-east-1'
//   }
  
//   stages {
//     stage('Build'){
//       steps {
//         sh 'export PYTHONPATH=$PATH_TO_MODULE:$PYTHONPATH'
//         sh 'pip3 install boto3 paramiko'
//         sh 'python3 /Users/kishorekanchan/Workspace/JenkinsAutomation/deployBuildQa.py'
        
//       }
//     }
//     stage('Test'){
//          steps{
//           sh 'export PYTHONPATH=$PATH_TO_MODULE:$PYTHONPATH'
//           sh 'pip3 install boto3 paramiko'
//           sh 'python3 /Users/kishorekanchan/Workspace/JenkinsAutomation/testing.py'
//          }
//     }
//      stage('Deploy'){
//          steps{
//           sh 'export PYTHONPATH=$PATH_TO_MODULE:$PYTHONPATH'
//           sh 'pip3 install boto3 paramiko'
//           sh 'python3 /Users/kishorekanchan/Workspace/JenkinsAutomation/deployToNginx.py'
//          }
//     }
    
//   }
  
// }






  
//   stages {
//       stage('Test My Web Server') {
//          steps {
//              withCredentials([[
//                  $class: 'AmazonWebServicesCredentialsBinding', 
//                   credentialsId: '027942b3-025d-4d47-b4f2-7b0dc0435d31',
//                   accessKeyVariable: 'AWS_ACCESS_KEY_ID', 
//                   secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
//                     sh "echo $PATH"
//                     sh "export PATH=$PATH:/usr/local/bin"
//                     sh '/usr/local/bin/aws --version'  
//                     sh '/usr/local/bin/aws ec2 describe-instances'
//                   }
//         }
//       }
//       stage('Build & Deploy Node.js to web server') {
//         steps {
//           dir('SourceCode') {
//             sh 'scp -r server user@webserver:~'
//             sh 'ssh -o ConnectTimeout=10 user@webserver "cd server && pm2 delete my-app-backend || true"'
//             sh 'ssh -o ConnectTimeout=10 user@webserver "cd server && npm install && pm2 start npm --name my-app-backend -- start"'
//           }
//         }
//       }
//       stage('Build & Deploy React.js to web server') {
//         steps {
//           dir('SourceCode') {
//             sh 'scp -r client user@webserver:~'
//             sh 'ssh -o ConnectTimeout=10 user@webserver "cd client && pm2 delete my-app-frontend || true"'
//             sh 'ssh -o ConnectTimeout=10 user@webserver "cd client && npm install & pm2 start npm --name my-app-frontend -- start"'
//           }
//         }
//       }
//       stage('Test'){
//         steps{
//           sh 'testing'
//         }
//       }    
    
//     stage('Build & Deploy React.js to web server') {
//         steps {
//           dir('SourceCode/client') {
//             sh 'npm install --force'
//             sh 'npm run build'
//           }
//         }
//       }
   


