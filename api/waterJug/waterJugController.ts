import { Request, Response } from 'express';

interface WaterJugRequest {
  x_capacity: number;
  y_capacity: number;
  z_amount_wanted: number;
}

interface JugState {
  x: number;
  y: number;
}

interface StepTest {
  newX: number;
  newY: number;
  action: string;
  queue: JugState[];
  steps: Map<string, any>;
  current: JugState;
}

export const solveWaterJug = (req: Request, res: Response) => {
  const { x_capacity, y_capacity, z_amount_wanted } = req.body as WaterJugRequest;

  // Input validations
  //Check if the input has all the required values
  if (!Number.isInteger(x_capacity) || !Number.isInteger(y_capacity) || !Number.isInteger(z_amount_wanted) ||
      x_capacity <= 0 || y_capacity <= 0 || z_amount_wanted < 0) {
    return res.status(400).json({ message: "All inputs must be positive integers." });
  }

  //Check if the values are valid
  if (z_amount_wanted > x_capacity &&z_amount_wanted > y_capacity){
    return res.status(400).json({ message: "No solution." });
  }

  // Helper function to check if a move is valid and perform it
  const stepTest =(params: StepTest) => {
    const { newX, newY, action, queue, steps, current } = params;
    const key = `${newX},${newY}`;
    if (!steps.has(key)) {
      queue.push({ x: newX, y: newY });
      steps.set(key, { x: newX, y: newY, action, parent: `${current.x},${current.y}` });
    }
  };

  // Breadth-first search (BFS) to find the solution
  const initialState: JugState = { x: 0, y: 0 };
  const queue: JugState[] = [initialState];
  const steps = new Map<string, any>();
  steps.set('0,0', { x: 0, y: 0, action: "Start", parent: null });

  while (queue.length > 0) {
    const jugState = queue.shift()!;

    // Verify if the requirement is completed
    if (jugState.x === z_amount_wanted || jugState.y === z_amount_wanted) {
      const solution = [];
      let step = steps.get(`${jugState.x},${jugState.y}`);
      while (step) {
        solution.unshift({ ...step, step: solution.length + 1 });
        step = steps.get(step.parent);
      }
      return res.json({ solution });
    }

    // Generate all possible states
    // Fill X, Fill Y
    stepTest({newX: x_capacity, newY: jugState.y, action: "Fill bucket X", queue, steps, current: jugState});
    stepTest({newX: jugState.x, newY: y_capacity, action: "Fill bucket Y", queue, steps, current: jugState});

    // Empty X, Empty Y
    stepTest({newX: 0, newY: jugState.y, action: "Empty bucket X", queue, steps, current: jugState});    
    stepTest({newX: jugState.x, newY: 0, action: "Empty bucket Y", queue, steps, current: jugState});

    // Transfer X to Y, Y to X
    const transferToY = Math.min(jugState.x, y_capacity - jugState.y);
    const transferToX = Math.min(x_capacity - jugState.x, jugState.y);
    stepTest({newX: jugState.x - transferToY, newY: jugState.y + transferToY, action: "Transfer from bucket X to Y", queue, steps, current: jugState});
    stepTest({newX: jugState.x + transferToX, newY: jugState.y - transferToX, action: "Transfer from bucket Y to X", queue, steps, current: jugState});
  }

  // If no solution found
  return res.status(404).json({ message: "No solution possible." });
};
