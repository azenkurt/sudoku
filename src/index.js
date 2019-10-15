module.exports = function solveSudoku(matrix) {
  let vertArr = [];
  let avNumbers = fillAvArr();

    for ( let i =0; i< 9; i++ ) {
      for ( let j =0; j< 9; j++ ) {
        if ( matrix[i][j] === 0 ) {
          avNumbers[i][j] = checkLine( matrix[i][j], avNumbers[i][j], matrix[i] );          
        }
        if ( avNumbers[i][j].length === 1 ) {         
          matrix[i][j] = avNumbers[i][j][0];
        }
      }    
    };    
    for ( let i =0; i<9; i++ ) {
      let vertLine = [];
      for ( let q = 0; q< 9; q++ ) { vertLine.push( matrix[q][i]) };      
      vertArr[i] = vertLine ;      
    };    
    for ( let i =0; i< 9; i++ ) {      
      for ( let j =0; j< 9; j++ ) {
        if ( vertArr[i][j] === 0 ) {          
          avNumbers[i][j] = checkLine( vertArr[i][j], avNumbers[i][j], vertArr[i] );          
        }
        if ( avNumbers[i][j].length === 1 ) {       
          vertArr[i][j] = avNumbers[i][j][0];
        }
      }  
      vertLine = [];  
    };   
    for ( let i =0; i<9; i++ ) {
      let vertLine = [];
      for ( let q = 0; q< 9; q++ ) { vertLine.push( vertArr[q][i]) };      
      matrix[i] = vertLine ;      
    };  
  
  return matrix;
}

function fillAvArr () {
  let avNumbers = [];
  for ( let i =0; i<9; i ++) {
    avNumbers[i] = [];
  };
  for ( let i = 0; i< 9; i++ ) {
    for ( let j = 0; j< 9; j++ ) {
      avNumbers[i][j] = [1,2,3,4,5,6,7,8,9];
    }
  };
  return avNumbers; 
}

function checkLine( curVal, curAvArr, line ) {
  let r = [];  
  r = curAvArr.filter( el => ((el!=curVal) && (line.indexOf(el) === -1)) );   
  return r;
};