# waka-machine

_This is a work in progress_

Waka-machine is a machine learning attempt to see what my day will consist of as I start it such as languages that I'll be using, operating systems, and other patterns.

The projects utilizes the [brain.js neural network](https://github.com/BrainJS/brain.js) and the [wakatime api](https://wakatime.com/developers) to gather training data.

### TODO

- [x] Gather training data
- [x] Get initial output with training data
- [ ] Test coverage of all exposed utilities _in progress_
- [ ] Get this hosted on a server and dockerized
- [ ] Get Mongo.db or an alternative to store daily json
- [ ] Add functionality to automatically get the recent days coding activity and store it
- [ ] Add functionality to retrain the neural network at night after I get another day of data
