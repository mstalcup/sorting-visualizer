export function resetArray(size, minValue, maxValue){
    document.querySelector(".array").classList.remove("sorted");
    return getRandomArray(size, minValue, maxValue);
}

function getRandomArray(size, minValue, maxValue){
    const array = [];
    for(let i = 0; i < size; i++){
        array.push(getRandomNumber(minValue, maxValue));
    }
    return array;
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function highlightRange(left, right){
    for(let i = left; i <= right; i++){
        document.querySelector("div.array").children[i].classList.add("highlight");
    }
}
export function unhighlightRange(left, right){
    for(let i = left; i <= right; i++){
        document.querySelector("div.array").children[i].classList.remove("highlight");
    }
}

export function highlightBars(bar1, bar2, delay){
    if(!bar1 || !bar2 || !bar1.classList || !bar2.classList){
        return;
    }
    bar1.classList.add("viewing");
    bar2.classList.add("viewing");

    setTimeout(function(){
        bar1.classList.remove("viewing");
        bar2.classList.remove("viewing");
    }, delay);
}

export function getArrayOfHeightsFromNodeList(nodeList){
    let heightArray = [];
    nodeList.forEach(function(node){
        heightArray.push(node.offsetHeight);
    });
    return heightArray;
}

document.addEventListener("DOMContentLoaded", function(event) { 
    document.getElementById("animationDelay").addEventListener("change", function(event){
        document.querySelector("#delayText").textContent = event.target.value;
    });
});

export let animations = [];
export let executingAnimations = false;

export function executeAnimations(){
    if(!executingAnimations){
        executingAnimations = true;
        executeFunctionsWithTimeout();
    }
}

function executeFunctionsWithTimeout(){
    setTimeout(function(){
        if(animations && animations.length > 0){
            animations.shift()();
            executeFunctionsWithTimeout();
        }
        else{
            document.querySelector(".array").classList.add("sorted");
            executingAnimations = false;
            enableTopButtons();
        }
    }, document.getElementById("animationDelay").value);
}

export function disableTopButtons(){
    console.log("disabled buttons");
    disableOrEnableTopButtons(true);
}
export function enableTopButtons(){
    console.log("enabled buttons");
    disableOrEnableTopButtons(false);
}
function disableOrEnableTopButtons(disable){
    document.querySelectorAll(".top button").forEach(function(element){
        element.disabled = !!disable;
    });
}

export default {
    resetArray,
    highlightRange,
    unhighlightRange,
    highlightBars,
    getArrayOfHeightsFromNodeList,
    animations,
    executingAnimations,
    executeAnimations,
    disableTopButtons,
    enableTopButtons
};
