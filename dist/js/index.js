"use strict";
const game = document.getElementById('gameTable');
const overview = document.getElementById('overviewTable');
const bednickaInput = document.getElementById('bednickaInput');
const allRevealedNumber = document.getElementById('allRevealedTiles');
const originValues = [1, 5, 10, 25, 50, 100, 200, 300, 500, 750, 1000, 1500, 2000, 3000, 5000, 7500, 10000, 14000, 20000, 30000, 40000, 50000, 75000, 100000, 150000, 250000];
const shiftedValues = [];
const VALUES_NUMBER = originValues.length;
function resetBednicka() {
    const item = document.getElementById('bednickaTile');
    if (item.children.length > 0)
        item.removeChild(item.children[0]);
    for (let i = 0; i < game.children.length; i++) {
        game.children[i].classList.remove('selected');
    }
    if (bednickaInput.value !== "" && bednickaInput.valueAsNumber >= +bednickaInput.min && bednickaInput.valueAsNumber <= +bednickaInput.max) {
        item.append(game.children[+bednickaInput.value - 1].cloneNode(true));
        const input = document.getElementById('bednickaInput');
        game.children[input.valueAsNumber - 1].classList.add('selected');
    }
}
function getAllRevealedNumber() {
    let sum = 0;
    for (let i = 0; i < game.children.length; i++) {
        if (game.children[i].classList.contains('active'))
            sum++;
    }
    return sum;
}
function getSumOfAllNonActiveTiles() {
    let sum = 0;
    let sumCount = 0;
    for (let i = 0; i < game.children.length; i++) {
        if (!game.children[i].classList.contains('active')) {
            const item = game.children[i];
            sum += +item.dataset.index;
            sumCount++;
        }
    }
    return sum / sumCount;
}
function offerFormula(count, value = 0) {
    if (typeof count === "number") {
        let stringSum = "" + Math.round(getSumOfAllNonActiveTiles());
        let result = Math.round(Math.ceil(value * (+stringSum) / (10 ** (stringSum.length - 2))) * (10 ** (stringSum.length - 2)));
        document.getElementById('nabidkaCeny').innerText = `${result} OC`;
    }
    else {
        document.getElementById('nabidkaCeny').innerText = `${count}`;
    }
}
function calculateOffer() {
    let numberOfLeftTiles = VALUES_NUMBER - +allRevealedNumber.innerText;
    if (numberOfLeftTiles === 20)
        offerFormula(numberOfLeftTiles, 0.75);
    else if (numberOfLeftTiles === 15)
        offerFormula(numberOfLeftTiles, 0.79);
    else if (numberOfLeftTiles === 11)
        offerFormula(numberOfLeftTiles, 0.83);
    else if (numberOfLeftTiles === 8)
        offerFormula(numberOfLeftTiles, 0.86);
    else if (numberOfLeftTiles === 6)
        offerFormula(numberOfLeftTiles, 0.89);
    else if (numberOfLeftTiles === 5)
        offerFormula(numberOfLeftTiles, 0.91);
    else if (numberOfLeftTiles === 4)
        offerFormula(numberOfLeftTiles, 0.93);
    else if (numberOfLeftTiles === 3)
        offerFormula(numberOfLeftTiles, 0.94);
    else if (numberOfLeftTiles === 2)
        offerFormula(numberOfLeftTiles, 0.95);
    else if (numberOfLeftTiles === 1)
        offerFormula("To co je v tvé bedničce pausechamp !");
    else {
        offerFormula("... OC");
    }
}
function setUpOverviewTable() {
    for (let i in originValues) {
        let div = document.createElement('div');
        div.innerText = "" + originValues[i].toLocaleString() + " OC";
        div.classList.add('overview-tile');
        div.dataset.index = "" + originValues[i];
        overview.append(div);
    }
}
function setUpTiles() {
    bednickaInput.value = "";
    for (let i = 0; i < VALUES_NUMBER; i++) {
        let div = document.createElement('div');
        let randomValue = Math.floor(originValues.length * Math.random());
        shiftedValues.push(originValues[randomValue]);
        div.dataset.index = "" + originValues[randomValue];
        originValues.splice(randomValue, 1);
        let span1 = document.createElement('span');
        span1.innerText = "" + (i + 1);
        div.append(span1);
        let span2 = document.createElement('span');
        span2.innerText = "" + shiftedValues[shiftedValues.length - 1].toLocaleString() + " OC";
        div.append(span2);
        div.classList.add('tile');
        // Event listener for click on tiles
        div.addEventListener('click', () => {
            div.classList.toggle('active');
            for (let k = 0; k < VALUES_NUMBER; k++) {
                const item = overview.children[k];
                if (item.dataset.index === div.dataset.index) {
                    item.classList.toggle('active');
                    break;
                }
            }
            resetBednicka();
            allRevealedNumber.innerText = "" + getAllRevealedNumber();
            calculateOffer();
        });
        game.append(div);
    }
}
setUpOverviewTable();
setUpTiles();
document.getElementById('bednickaInput')?.addEventListener('input', () => {
    resetBednicka();
});
