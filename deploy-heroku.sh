yarn build

cp -r build deploy-heroku
cd deploy-heroku


# uncomment to login to heroku
# heroku login


# init git and commit update build folder
git init
git add .
git commit -m"Autodeployment commit"

# add heroku as git remote
heroku git:remote -a partypokerweb

# push commit to heroku with -f because we reinitialize git every single time
git push -f heroku master

# open application in browser
heroku open

# remove build and git folders
rm -rf build
rm -rf .git
