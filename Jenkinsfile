pipeline {
  agent any
  tools {
    nodejs 'my_node'
  }
  environment {
    gitName = 'lango'
    gitEmail = 'xmun777@naver.com'
    githubCredential = 'git_cre'
    dockerHubRegistry = 'startdreamteam/developers-client'
    dockerHubRegistryCredential = 'docker_cre'
    applicationGitAddress = 'https://github.com/kcs-developers/developers-client.git'
    k8sGitHttpAddress = 'https://github.com/start-dream-team/manifest.git'
    k8sGitSshAddress = 'git@github.com:start-dream-team/manifest.git'
    REACT_APP_DEV_URL = "https://diveloper.site"
    REACT_APP_AWS_ACCESS_KEY_ID = "${env.REACT_APP_AWS_ACCESS_KEY_ID}"
    REACT_APP_AWS_ACCESS_SECRET_KEY = "${env.REACT_APP_AWS_ACCESS_SECRET_KEY}"
  }
  stages {
    stage('Checkout Github') {
      steps {
          checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: githubCredential, url: applicationGitAddress ]]])
      }
      post {
        failure {
          echo 'Application Repository clone failure'
        }
        success {
          echo 'Application Repository clone success'
        }
      }
    }
    stage('Npm Build') {
      steps {
          sh 'npm install --force'
          sh 'npm run build'
          }
      post {
        failure {
          echo 'React npm build failure'
        }
        success {
          echo 'React npm build success'
        }
      }
    }
    stage('Docker Image Build') {
      steps {
          // dockerHubRegistry 위에서 선언한 변수, 내 저장소.
          // currentBuild.number 젠킨스가 제공하는 변수. 빌드넘버를 받아옴.
          sh "docker build -t ${dockerHubRegistry}:${currentBuild.number} ."
          sh "docker build -t ${dockerHubRegistry}:latest ."
      }
      post {
        failure {
          echo 'Docker Image Build failure'
        }
        success {
          echo 'Docker Image Build success'
        }
      }
    }
    stage('Docker Image Push') {
      steps {
          // 도커 허브의 크리덴셜
          // withDockerRegistry : docker pipeline 플러그인 설치시 사용가능.
          // dockerHubRegistryCredential : environment에서 선언한 docker_cre
          withDockerRegistry(credentialsId: dockerHubRegistryCredential, url: '') {
            sh "docker push ${dockerHubRegistry}:${currentBuild.number}"
            sh "docker push ${dockerHubRegistry}:latest"
          }
      }
      post {
        failure {
          echo 'Docker Image Push failure'
          sh "docker rmi ${dockerHubRegistry}:${currentBuild.number}"
          sh "docker rmi ${dockerHubRegistry}:latest"
        }
        success {
          echo 'Docker Image Push success'
          sh "docker rmi ${dockerHubRegistry}:${currentBuild.number}"
          sh "docker rmi ${dockerHubRegistry}:latest"
          slackSend (color: '#0AC9FF', message: "SUCCESS: Docker Image Push '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
        }
      }
    }
    stage('k8s manifest file update') {
      steps {
        git credentialsId: githubCredential,
            url: k8sGitHttpAddress,
            branch: 'main'
        // 이미지 태그 변경 후 메인 브랜치에 푸시
        sh "git config --global user.email ${gitEmail}"
        sh "git config --global user.name ${gitName}"
        sh "sed -i 's@${dockerHubRegistry}:.*@${dockerHubRegistry}:${currentBuild.number}@g' deploy/client/deploy-client.yml"
        sh "chmod +x deploy/client/deploy-client.yml"
        sh "git add deploy/client/deploy-client.yml"
        sh "git status"
        sh "git commit -m 'fix:${dockerHubRegistry} ${currentBuild.number} image versioning'"
        sh "git branch -M main"
        sh "git remote remove origin"
        sh "git remote add origin ${k8sGitSshAddress}"
        sh "git push -u origin main"
      }
      post {
        failure {
          echo 'Container Deploy failure'
        }
        success {
          echo 'Container Deploy success'
        }
      }
    }
  }
}
