node{
    stage('cloning git'){
        
        git branch:'main',credentialsId:'satya', url:"https://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@github.com/1centroxy/jkas_frontend_ng.git"
    }
    stage('install dependencies') {
        sh 'sudo npm install -g @angular/cli'
        sh 'sudo npm install'
        sh 'sudo npm i ng2-completer --save-dev'
        echo 'modules installed'
        
    }
    
    stage('build') {
        sh 'sudo ng build --prod --aot --vendor-chunk --common-chunk --delete-output-path --build-optimizer'
        sh 'sudo npm run build-locale'
        echo 'build completed'

    }
     stage('deploy') {
        sh "sudo rm -rf /usr/share/nginx/html/dist"
        sh "sudo cp -r /var/lib/jenkins/workspace/jkas-angular-app/dist  /usr/share/nginx/html/"
    }
    stage('Notify') {
        office365ConnectorSend message: 'Jkas-frontend-ng', status: 'Successfully Deployed', webhookUrl: 'https://centroxyweb.webhook.office.com/webhookb2/e11133d2-c97f-4d7f-bf34-1ca56031ec52@094737d4-5bce-418d-89e0-0ee3815f1ad7/JenkinsCI/c2127c5865eb41b9a6f7e0d9870f2745/dd98fbd0-9e02-44d6-b50e-05b13dfa2c8f'
    }
}
