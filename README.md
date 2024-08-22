
// to sync w both origin/dev and upstream/dev:
git fetch upstream
git rebase upstream/dev
git push origin dev


// to check which remote branches are tracked:
git branch -vv

// to make a PR fron GitHub CLI 
gh pr create --base upstream/dev --head origin/dev --title "PR Title goes here" --body "Description of your changes goes here"


//install GH CLI (mac):
brew install gh

// install GH CLI (windows):    
winget install --id GitHub.cli


