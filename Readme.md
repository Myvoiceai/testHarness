# Readme

## install sox (sound exchange app)
brew install sox

## install dependencies
npm install

## Build
tsc -b

## Prepare
> Place wav files in a folder per speaker under the data/ folder

> Add your developer token at line 5 of myVoice.ts

> Add your server URL details at line 6 of myVoice.ts

## Run
node node_modules/ts-node/dist/bin.js src/index.ts

## Results: 
// Stored to log.csv
//Copy file to results folder for history maintainance
