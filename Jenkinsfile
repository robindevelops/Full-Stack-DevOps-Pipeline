pipeline {
    agent any
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
                // NOTE: Commented out because backend doesn't have a lint script yet!
                // dir('apps/api') {
                //     sh 'npm run lint' 
                // }
               dir('apps/frontend') {
                    sh 'npm run lint' 
               }
            }
        }
        stage('test'){
            steps{
                dir('apps/api') {
                    sh 'npm run test' 
               }
               dir('apps/frontend') {
                    sh 'npm run test' 
               }
            }
        }
        stage('build'){
            steps{
                dir('apps/frontend') {
                    sh 'npm run build'
                }
        
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
            }
        }
        stage('trivy scan'){
            steps{
                echo 'trivy scan'
            }
        }

        stage('push image to docker hub'){
            steps{
                echo 'push image to docker hub'
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
}




