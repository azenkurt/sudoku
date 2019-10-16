module.exports = function solveSudoku(matrix) { 
  let avInHLines = [];
  let avInVLines = [];
  for ( let i = 0; i<9; i++ ) {
    avInHLines[i] = [1,2,3,4,5,6,7,8,9];
    avInVLines[i] = [1,2,3,4,5,6,7,8,9];
  }   
  let avInCells = [ 
    [1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]
  ]; 
  for ( let qqq = 0; qqq < 1000; qqq ++ ) {      
    for ( let i=0; i<9; i++ ) {
        for ( let j = 0; j<9; j++ ) {            
            if (matrix[i][j] === 0 ) {                
                avInCells = checkInMatrixCells(matrix, avInCells );
                avInHLines = checkInHLine (matrix,avInHLines);
                avInVLines = checkInVLine(matrix,avInVLines);
                mm = breakCell( avInCells );
                let c0 = crossing ( avInHLines[i], avInVLines[j] );
                let c1 = crossing ( c0, mm[ Math.floor(i/3)][ Math.floor(j/3)] );
                if ( c1.length === 1 ) {                          
                    matrix[i][j] = c1[0];
                }
            }
        }
    }    
  };   
  return matrix;
}

function checkInCell ( miniMatrix, avInCellArr ) {
  let q = [];
  for ( let i = 0; i<3; i++ ) {
      for ( let j = 0; j<3; j++ ) {
          q.push ( miniMatrix[i][j] );
      }
  };
  return avInCellArr.filter( el => q.indexOf( el ) === -1 )
};
function checkInMatrixCells (matrix, avInCells) {
  let minMat = [ [],[],[],[],[],[],[],[],[] ];      
  let ind = 0; 
  for ( let i =0; i <7; i += 3 ) {
      for ( let j =0; j < 7; j += 3 ) {
          minMat = [
              [ matrix[i][j], matrix[i][j+1], matrix[i][j+2] ],
              [ matrix[i+1][j], matrix[i+1][j+1], matrix[i+1][j+2] ],
              [ matrix[i+2][j], matrix[i+2][j+1], matrix[i+2][j+2] ]
          ];
          avInCells[ind] = checkInCell ( minMat, avInCells[ind] ) ;
          ind += 1;
      }
  }
  return avInCells;    
};
function checkInHLine (matrix, avInHLines ) {
  for ( let i =0; i < 9; i++ ) {
      avInHLines[i] = avInHLines[i].filter ( el => matrix[i].indexOf( el ) === -1 );
  }   
  return avInHLines;
};
function checkInVLine ( matrix,avInVLines ) {
  for ( let i = 0; i<9; i++ ) {
      let vv = [];
      for ( let j = 0; j<9; j++ ) {
          vv.push( matrix[j][i] );
      }
      avInVLines[i] = avInVLines[i].filter ( el => vv.indexOf( el ) === -1 );
      vv.push;
  }   
  return avInVLines; 
};
function crossing ( arr0, arr1 ) {
 let aa = [];
 for ( let i =0; i< arr0.length; i++ ) {
     if ( arr1.indexOf( arr0[i] ) != -1 ) aa.push( arr0[i] )
 }
 return aa;
};
function breakCell ( cell ) {
  let mm = [ [],[],[],[],[],[],[],[],[] ];
  mm[0][0] = cell[0];
  mm[0][1] = cell[1];
  mm[0][2] = cell[2];
  mm[1][0] = cell[3];
  mm[1][1] = cell[4];
  mm[1][2] = cell[5];
  mm[2][0] = cell[6];
  mm[2][1] = cell[7];
  mm[2][2] = cell[8]; 
  return mm;
}

