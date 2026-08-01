pipeline {
    agent any

environment{
    APP_NAME = "TaskFlow"
    Docker_FRONTEND_USERNAME = credentials('frontend')
    Docker_API_USERNAME = credentials('api')
}
parameters{
    string(name: 'VERSION', defaultValue: '1.0.0', description: 'Version of the application')
    
}

    stages{
        stage('checkout'){
            steps {
                echo 'Checking out source code...'
                checkout scm
                sh 'ls -la'
            }
        }

        stage('install dependency'){
            steps{
                echo 'install dependency'
               dir('apps/api') {
                    sh 'npm install --fetch-retries=5 --fetch-timeout=600000' 
               }
               dir('apps/frontend') {
                    sh 'npm install --fetch-retries=5 --fetch-timeout=600000' 
               }
            }
        }
        stage('lint'){
            steps{
                echo 'linting'

 
            }
        }
        stage('test'){
            steps{
                dir('apps/api') {
                    sh 'npm run test' 
               }
               // NOTE: Vitest also crashes with "Bus error" on Apple Silicon Docker
               // dir('apps/frontend') {
               //      sh 'npm run test' 
               // }
            }
        }
        stage('build'){
            steps{
                echo "Building ${APP_NAME} version ${params.VERSION}"
        
                // The Node.js backend does not need a "build" step since it's 
                // raw JavaScript and doesn't use TypeScript or Webpack!
            }
        }
        stage('code quality'){
            steps{
                echo 'code quality'
            }
        }
        stage('build docker image'){
            steps{
                echo 'build docker image'
                
                dir("apps/frontend"){
                    sh "docker build -t ${Docker_FRONTEND_USERNAME}/${APP_NAME}:frontend-${params.VERSION} ."
                }
                dir("apps/api"){
                    sh "docker build -t ${Docker_API_USERNAME}/${APP_NAME}:api-${params.VERSION} ."
                }
            }
        }
        stage('trivy scan'){
            steps{
                echo 'trivy scan'
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                echo 'Pushing images to Docker Hub...'
                
                // Keep login, push, and logout all inside the credentials wrapper
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    // Use single quotes for secrets so Bash evaluates them securely
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    
                    // Use double quotes here so Groovy can inject ${params.VERSION}
                    sh "docker push ${Docker_FRONTEND_USERNAME}/${APP_NAME}:frontend-${params.VERSION}"
                    sh "docker push ${Docker_API_USERNAME}/${APP_NAME}:api-${params.VERSION}"
                    
                    sh 'docker logout'
                }
            }
        }
        stage('deploy'){
            steps{
                echo 'code notify'
            }
        }
        stage('health check'){
            steps{
                echo 'health check'
            }
        }
        stage('slack notification'){
            steps{
                echo 'slack notification'
            }
        }

    }
    post{
        success{
            echo 'Pipeline completed successfully'
        }
        failure{
            echo 'Pipeline failed'
        }
        cleanup{
            echo 'Cleaning up'
        }
    }
}




