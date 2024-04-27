# Node.js Water Jug Solver API

This repository contains a Node.js application that solves the classic water jug problem using Express and TypeScript. The application provides a REST API that can determine the sequence of steps required to measure exactly `Z` gallons using two jugs of capacities `X` and `Y`.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (v14.x or later recommended)
- npm (usually comes with Node.js)

## Installation

To get started, clone the repository and install the dependencies.

```bash
git clone https://github.com/andresdaguilar/water-jug.git
cd water-jug
npm install
```
## Build the app

```bash
npm run build
```

## Running the app

```bash
npm start
```

## API Usage

The API has a single endpoint that accepts POST requests. You can use this endpoint to submit the capacities of two jugs and the desired amount of water you wish to measure.

Endpoint
POST localhost:3000/api/water-jug

### Payload

```bash
{
  "x_capacity": 3,
  "y_capacity": 5,
  "z_amount_wanted": 4
}
```

### Response

```bash
{
  "solution": [
    { "step": 1, "bucketX": 3, "bucketY": 0, "action": "Fill bucket X" },
    { "step": 2, "bucketX": 0, "bucketY": 3, "action": "Transfer from bucket X to Y" },
    { "step": 3, "bucketX": 3, "bucketY": 3, "action": "Fill bucket X" },
    { "step": 4, "bucketX": 1, "bucketY": 5, "action": "Transfer from bucket X to Y", "status": "Solved" }
  ]
}
```
## API Docs

```bash
localhost:3000/api-docs
```


## Solution explanation

The application uses a breadth-first search (BFS) algorithm to find the shortest path of steps required to measure exactly Z gallons. 
It considers all possible actions (fill, empty, transfer) at each state of the jugs until it finds a solution or explore all possibilities. 
This ensures that if a solution exists, it will be found in the minimum number of steps.

## Testing

```bash
npm test
```