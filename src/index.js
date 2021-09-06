module.exports = function solveSudoku(matrix) {
  // your solution
  const size = 9;
  const boxSize = 3;

  const findEmpty = (matrix) => {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if(matrix[i][j] === 0) {
                return [i,j];
            }
        }
    }
    return null;
}

  const check = (num, pos, matrix) => {
      const [r,c] = pos;
// Check rows
      for (let i = 0; i < size; i++) {
          if (matrix[i][c] === num && i !== r) {
              return false;
          }
      }
// Check cols
      for (let i = 0; i < size; i++) {
          if (matrix[r][i] === num && i !== c) {
              return false;
          }
      }

      const boxRow = Math.floor( r/boxSize ) * boxSize;
      const boxCol = Math.floor( c/boxSize ) * boxSize;

      for (let i = boxRow; i < boxRow + boxSize; i++) {
          for (let j = boxCol; j < boxCol + boxSize; j++) {
              if (matrix[i][j] === num && i !== r && j !== c) {
                  return false;
              }
          }
      }
      return true;
  }

  const solveMatrix = () => { 
    const currPos = findEmpty(matrix);

    if (currPos === null) {
        return true;
    }
    for (let i = 1; i < size + 1; i++) {
        const currNum = i;
        const isValid = check(currNum, currPos, matrix);

        if (isValid) {
             const [x,y] = currPos;
             matrix[x][y] = currNum;

            if(solveMatrix()) {
                 return true;
            }

             matrix[x][y] = 0;
         }
     }

    return false;
   
  }

  solveMatrix();
  return matrix;
}
