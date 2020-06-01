import * as utils from '../utils/utils'

export function startMergeSort(array){
    utils.disableTopButtons();
    mergeSort(array);
    utils.executeAnimations();
}

function mergeSort(array){
    if(array.length <= 1){
        return array;
    }

    let middleIndex = Math.ceil(array.length / 2);
    let leftArray = array.slice(0, middleIndex);
    let rightArray = array.slice(middleIndex, array.length);

    return mergeSortedArrays(mergeSort(leftArray), mergeSort(rightArray));
}

function mergeSortedArrays(array1, array2) {
    let i = 0;
    let j = 0;
    let mergedArray = [];

    let firstElement = array1[0];

    utils.animations.push(function(){
        array1.forEach(function(el){el.classList.add("highlight");});
        array2.forEach(function(el){el.classList.add("highlight");});
    });

    while(i < array1.length || j < array2.length){
        if(i > array1.length-1){
            mergedArray.push(array2[j]);
            j++;
        }
        else if(j > array2.length-1){
            mergedArray.push(array1[i]);
            i++;
        }
        else{
            let bar1 = array1[i];
            let bar2 = array2[j];
            utils.animations.push(function(){
                utils.highlightBars(bar1, bar2, document.getElementById("animationDelay").value);
            });
            if(bar1.offsetHeight < bar2.offsetHeight){
                // utils.totalActions++;
                mergedArray.push(bar1);
                i++;
            }
            else{
                mergedArray.push(bar2);
                j++;
            }
        }
    }

    let arrayContainer = document.querySelector(".array");
    arrayContainer.insertBefore(mergedArray[0], firstElement);
    for(let i = 1; i < mergedArray.length-1; i++){
        utils.animations.push(function(){
            arrayContainer.insertBefore(mergedArray[i], mergedArray[i-1].nextSibling);
        });
    }
    utils.animations.push(function(){
        array1.forEach(function(el){el.classList.remove("highlight");});
        array2.forEach(function(el){el.classList.remove("highlight");});
    });
    return mergedArray;
}