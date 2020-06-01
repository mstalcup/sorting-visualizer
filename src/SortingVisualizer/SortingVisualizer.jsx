import React from 'react';
import './SortingVisualizer.css';
import * as utils from '../utils/utils'
import {startQuickSort} from '../sortingAlgorithms/quickSort'
import {startMergeSort} from '../sortingAlgorithms/mergeSort'

export class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: []
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = utils.resetArray(200, 5, 700);

        this.setState(state => ({
            array: array
        }));
    }

    quickSort() {
        let heightArray = utils.getArrayOfHeightsFromNodeList(document.querySelectorAll(".array .array-bar"));
        startQuickSort(heightArray);
    }

    mergeSort() {
        startMergeSort(Array.prototype.slice.call(document.querySelectorAll(".array .array-bar")));
    }

    render() {
        return (
            <div className="container">
                <div className="top">
                    <button className="reset-array" onClick={() => this.resetArray()}>
                        Generate New Array
                    </button>
                    <button className="sort-button" onClick={() => this.quickSort()}>
                        Quick Sort
                    </button>
                    <button className="sort-button" onClick={() => this.mergeSort()}>
                        Merge Sort
                    </button>
                    <span>Animation Speed:</span>
                    <input type="range" id="animationDelay" defaultValue="500" min="5" max="1000" />
                    <span id="delayText">500</span>ms
                </div>
                <div className="array-container">
                    <div className="array">
                        {this.state.array.map((value, index) => (
                            <div className="array-bar" 
                                style={{height: `${value}px`}} 
                                key={index}>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="progress-container">
                    <div className="progress-bar">
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default SortingVisualizer;