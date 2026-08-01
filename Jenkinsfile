// ============================================================================
// JENKINS ARCHITECTURE & DEPLOYMENT
// ============================================================================
// As you noted: Jenkins is typically installed on a Linux server (like Ubuntu).
// In a real-world enterprise environment, Jenkins uses a Master-Agent (Slave) architecture:
//
// 1. MASTER NODE (The Brains):
//    - This is the main Jenkins server.
//    - It schedules the jobs, monitors the agents, and stores the configurations.
//    - Best Practice: Never run actual heavy builds on the Master node, as it can crash it!
//
// 2. AGENT / SLAVE NODES (The Muscle):
//    - Depending on company size, you might have 2, 10, or 100 agent nodes.
//    - The Master node delegates the actual work (compiling code, building Docker images) 
//      to these agent nodes.
//    - Agents can be Ubuntu VMs, Windows machines, or even ephemeral 
//      Docker/Kubernetes containers that spin up just for the build and die afterwards.
// ============================================================================

// The 'pipeline' block is where you define what the Master tells the Agents to do.
pipeline {
    // 'agent any' means the Master can pick any available Agent node to run this job.
    // If you had specific nodes, you might write: agent { label 'ubuntu-node-1' }
    agent any

    stages {
        // A 'stage' represents a distinct phase of your pipeline (e.g., Build, Test, Deploy).
        stage('Example Stage') {
            steps {
                // The actual commands the Agent will execute.
                echo 'Hello from the Jenkins Agents!'
            }
        }
    }
}
