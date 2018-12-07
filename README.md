This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

### github
```bash
git remote add origin https://github.com/efengx/react-fengx.git

git push origin master

git add .

git status

git commit -m 'code commit'

git pull

git push

git push origin master

git subtree add --prefix=build origin gh-pages

git subtree push --prefix=build origin gh-pages

git subtree pull --prefix=build origin gh-pages

git branch -a

git branch gh-pages

git reset --hard

git checkout -b gh-pages
```

### storybook
```bash
yarn run storybook
```


### github pages config
- package.json
```json
"homepage": "https://efengx.github.io/react-fengx/",
```

### build
```bash
npm run deploy
```