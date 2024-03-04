node {
    def nodejsHome = tool 'NodeJs 18.17.0'
    env.PATH = "${nodejsHome}/bin:${env.PATH}"

    try {
      stage('ssh-test') {
        sshagent (credentials: ['79ac0389-d078-4099-81e5-96bff12a2672']) {
          sh "ssh -o StrictHostKeyChecking=no ${env.TARGET_HOST} 'uptime'"
        }
      }
      stage('git pull origin dev') {
        sshagent (credentials: ['79ac0389-d078-4099-81e5-96bff12a2672']) {
          sh """
            ssh -o StrictHostKeyChecking=no ${env.TARGET_HOST} '
            cd projectP/patkid-place
            git fetch
            git pull origin ${env.BRANCH_NAME}
          '
          """
        }
      }
      stage('docker-build') {
        sshagent (credentials: ['79ac0389-d078-4099-81e5-96bff12a2672']) {
          sh """
            ssh -o StrictHostKeyChecking=no ${env.TARGET_HOST} '
            cd projectP/patkid-place
            sudo docker compose --env-file ./src/config/docker/.env.${env.BRANCH_NAME} build
          '
          """
        }
      }
      stage('test-unit') {
        sshagent (credentials: ['79ac0389-d078-4099-81e5-96bff12a2672']) {
          sh """
            ssh -o StrictHostKeyChecking=no ${env.TARGET_HOST} '
            cd projectP/patkid-place
            sudo docker compose -f docker-compose-test.yaml --env-file ./src/config/docker/.env.test run backend npm run test
          '
          """
        }
      }
      stage('start nest') {
        sshagent (credentials: ['79ac0389-d078-4099-81e5-96bff12a2672']) {
          sh """
            ssh -o StrictHostKeyChecking=no ${env.TARGET_HOST} '
            cd projectP/patkid-place
            sudo docker compose --env-file ./src/config/docker/.env.${env.BRANCH_NAME} up -d
          '
          """
        }
      }
    } catch (env) {
        echo 'error = ' + env
        throw env
    }
}