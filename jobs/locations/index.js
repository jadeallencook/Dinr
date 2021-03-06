const codes = require('./codes.json');
const fs = require('fs');

let zipcodes = {};
let states = [];
let reverse = {}

Object.keys(codes).forEach(code => {
    code = codes[code];
    let { state, city, zip } = code;
    state = state.toLowerCase();
    city = city.toLowerCase();
    const military = (
        state === 'ae' ||
        state === 'aa' ||
        state === 'ap'
    );
    if (!zipcodes[state] && !military) {
        zipcodes[state] = {};
        states = [...states, state];
    }
    if (!military && !zipcodes[state][city]) {
        zipcodes[state][city] = [zip];
    } else if (!military) {
        zipcodes[state][city] = [...zipcodes[state][city], zip];
    }
});

Object.keys(zipcodes).forEach(state => {
    Object.keys(zipcodes[state]).forEach(city => {
        zipcodes[state][city].forEach(code => {
            reverse[code] = `${city}:${state}`;
        });
    });
});

fs.writeFile('../../src/assets/reverse-zipcode.json', JSON.stringify(reverse), (err) => {
    if (err) {
        return console.log(err);
    } else {
        console.log('Data was saved to "dev/src/assets/reverse-zipcode.json"');
    }
}); 

fs.writeFile('../../src/assets/zipcodes.json', JSON.stringify(zipcodes), (err) => {
    if (err) {
        return console.log(err);
    } else {
        console.log('Zipcodes were saved to "dev/src/assets/zipcodes.json"');
    }
}); 

fs.writeFile('../../src/assets/states.json', JSON.stringify(states.sort()), (err) => {
    if (err) {
        return console.log(err);
    } else {
        console.log('States were saved to "dev/src/assets/states.json"');
    }
}); 
