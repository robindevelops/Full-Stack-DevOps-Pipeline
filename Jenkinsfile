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
echo 'linting'

                // NOTE: Commented out because backend doesn't have a lint script yet!
                // dir('apps/api') {
                //     sh 'npm run lint' 
                // }
            //    NOTE: 'oxlint' is throwing a fatal OS-level "Bus error" inside 
            //    the Jenkins Docker container due to an architecture mismatch.
            //    dir('apps/frontend') {
            //         sh 'npm run lint' 
            //    }
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
               echo 'building'
        
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




