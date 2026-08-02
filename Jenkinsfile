pipeline {
    agent any

    parameters {
        string(
            name: 'VERSION',
            defaultValue: '1.0.0',
            description: 'Version of the application'
        )
    }
tools {
        nodejs 'Node-18' // Must match the name you gave in Global Tool Configuration
    }
    stages {

        stage('Checkout') {
            steps {
                echo 'Source code already checked out by Jenkins.'
                checkout scm
                sh 'ls -la'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'

                dir('apps/api') {
                    sh 'npm install --fetch-retries=5 --fetch-timeout=600000'
                }

                dir('apps/frontend') {
                    sh 'npm install --fetch-retries=5 --fetch-timeout=600000'
                }
            }
        }

        stage('Lint') {
            steps {
                echo 'Running lint...'

                // dir('apps/api') {
                //     sh 'npm run lint'
                // }

                // dir('apps/frontend') {
                //     sh 'npm run lint'
                // }
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'

                dir('apps/api') {
                    sh 'npm run test'
                }

                // dir('apps/frontend') {
                //     sh 'npm run test'
                // }
            }
        }

        stage('Build') {
            steps {
                echo "Building TaskFlow version ${params.VERSION}"

                // dir('apps/frontend') {
                //     sh 'npm run build'
                // }
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running code quality checks...'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images...'

                dir('apps/frontend') {
                    sh "docker build -t alyanshahid/taskflow:frontend-${params.VERSION} ."
                }

                dir('apps/api') {
                    sh "docker build -t alyanshahid/taskflow:api-${params.VERSION} ."
                }
            }
        }

        stage('Trivy Scan') {
            steps {
                echo 'Scanning Docker images...'

                // sh "trivy image alyanshahid/taskflow:frontend-${params.VERSION}"
                // sh "trivy image alyanshahid/taskflow:api-${params.VERSION}"
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'

                    sh "docker push alyanshahid/taskflow:frontend-${params.VERSION}"
                    sh "docker push alyanshahid/taskflow:api-${params.VERSION}"

                    sh 'docker logout'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
            }
        }

        stage('Health Check') {
            steps {
                echo 'Running health checks...'
            }
        }

        stage('Slack Notification') {
            steps {
                echo 'Sending Slack notification...'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }

        failure {
            echo 'Pipeline failed.'
        }

        always {
            echo 'Pipeline finished.'
        }

        cleanup {
            cleanWs()
        }
    }
}