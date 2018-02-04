# ubuntu-initializr
Web-app, that generate the installation bash-scripts for Ubuntu 14.04.

# Getting Started

If you want to help - here is [Trello](https://trello.com/b/wLJq9INy/ununtu-initializer) board, 
[Telegram](https://t.me/joinchat/DBQGnBDcEGVVxbwRWVmxGw) and [Slack](https://join.slack.com/t/ubuntuinitializer/shared_invite/enQtMzA1ODkwMzE0MzI1LTA5Y2ZlNzc3MzQwODFhOWU1NWY1MTI5ZmE1YmU2MDNkYTNjNjhlMDA5OGY1NDkyNzdhODk1ZmIxNmE4ZGFiNDg) channels.
 
1. Install global dependencies:
```
npm install -g pm2 node-inspect
```

2. Install required dependencies:
```
cd server
yarn
```

3. Run node server:
```
cd server
yarn start
```

4. Go to [localhost:8080](http://localhost:8080/)

# Debug

1. Install Chrome DevTools Ext [Node.js V8 --inspector Manager (NiM)](https://chrome.google.com/webstore/detail/nodejs-v8-inspector-manag/gnhhdgbaldcilmgcpfddgdbkhjohddkj)

1. Run node server in debug mode:
```
cd server
yarn start:debug
```
