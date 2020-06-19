# Readme

## install sox (sound exchange app)
brew install sox

## install dependencies
npm install

## Prepare (1)
> Add your developer token at line 5 of myVoice.ts

> Add your server URL details at line 6 of myVoice.ts

## Build
tsc -b

## Prepare (2)
> Place wav files in a folder per speaker under the data/ folder

## Run
node node_modules/ts-node/dist/bin.js src/index.ts

## Results: 
// Stored to log.csv
//Copy file to results folder for history maintainance
