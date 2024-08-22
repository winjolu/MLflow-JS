
// to sync w both origin/dev and upstream/dev:
git fetch upstream
git rebase upstream/dev
git push origin dev


// to check which remote branches are tracked:
git branch -vv

// to make a PR fron GitHub CLI 
    // login to GH CLI (if you're not):
    gh auth login

    // make PR:
    gh pr create --base upstream/dev --head origin/dev --title "PR Title goes here" --body "Description of your changes goes here"


// install GH CLI (mac):
brew install gh

// install GH CLI (windows):    
winget install --id GitHub.cli

// linux (debian):

    //add the repository:
    curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
    sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null

    // update package list:
    sudo apt update

    // install GH CLI:
    sudo apt install gh

// test text


