# Readme

## install sox (sound exchange app)
brew install sox

## install dependencies
npm install

## Prepare (1)
> Add your developer token at line 5 of myVoice.ts

> Add your server URL details at line 6 of myVoice.ts

## Prepare (2)
> Each speaker should have their audio files in a folder under project root/data/{speaker}

> Each audio file should be in 16Bit, Mono, PCM WAV format

> Each file should be uniquely named 

> For Digits recordings prefix each filename with DI-

> For other recordings prefix with FS-

## Build
tsc -b

## Prepare (2)
> Place wav files in a folder per speaker under the data/ folder

## Run
node node_modules/ts-node/dist/bin.js src/index.ts

## Results: 
> Stored to log.csv

> Copy file to results folder for history maintainance
