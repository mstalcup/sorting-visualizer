import * as utils from '../utils/utils'

export function startQuickSort(array){
    utils.disableTopButtons();
    quickSort(array, 0, array.length-1);
    utils.executeAnimations();
}

function quickSort(array, left, right){
    if(left >= right){
        return;
    }

    let pivot = array[Math.floor((left + right) / 2)];
    let partitionIndex = sortAroundPivot(array, left, right, pivot);

    quickSort(array, left, partitionIndex-1);
    quickSort(array, partitionIndex, right);
}

function sortAroundPivot(array, left, right, pivot){
    let rangeLeft = left;
    let rangeRight = right;
    utils.animations.push(function(){utils.highlightRange(rangeLeft, rangeRight);});

    while(left <= right){
        while(array[left] < pivot){
            left++;
        }
        while(array[right] > pivot){
            right--;
        }

        if(left <= right){
            // utils.totalActions++;
            swap(array, left, right);
            left++;
            right--;
        }
    }
    utils.animations.push(function(){utils.unhighlightRange(rangeLeft, rangeRight)});

    return left;
}

function swap(array, i, j){
    utils.animations.push(function(){animateSwap(i, j, document.getElementById("animationDelay").value);});
    let n = array[i];
    array[i] = array[j];
    array[j] = n;
}

function animateSwap(i, j, delay){
    let bar1 = document.querySelector("div.array").children[i];
    let bar2 = document.querySelector("div.array").children[j];
    let bar1Height = bar1.style.height;
    bar1.style.height = bar2.style.height;
    bar2.style.height = bar1Height;
    
    utils.highlightBars(bar1, bar2, delay);
}