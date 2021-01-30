# Readme

## install sox (sound exchange app)
brew install sox

## install dependencies
npm install

## Build
tsc -b

## Prepare your data
> Place wav files in a folder per speaker under the data/ folder

> Add the API-token provided by MyVoice at line 5 of myVoice.ts

## Run
node node_modules/ts-node/dist/bin.js src/index.ts

## Results: 
> Stored to log.csv

> Suggest to keep a copy file to results folder for history maintainance
