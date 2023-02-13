pipeline {
  agent {
    docker {
      image 'node:lts-alpine3.17'
      args '-v /var/run/docker.sock:/var/run/docker.sock'
    }

  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Install Dependencies & Build') {
      steps {
        dir('RevolutionArt/SourceCode/client') {
          sh 'npm install'
          sh 'npm run build'
        }
      }
    }
    stage('Test') {
      steps {
        dir('RevolutionArt/SourceCode/client') {
          sh 'npm test'
        }
      }
    }
    stage('Build and Push Docker Image') {
      steps {
        sh 'docker build -t my-react-app .'
        sh 'docker tag my-react-app:latest docker.io/shanshanli/my-react-app'
        sh 'docker push docker.io/shanshanli/my-react-app'
      }
    }
    stage('Deploy to Docker container') {
      steps {
        sh 'docker run -p 5000:5000 docker.io/shanshanli/my-react-app'
      }
    }
  }
}