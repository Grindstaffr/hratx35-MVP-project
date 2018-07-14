var tony = 'tony'

module.exports.parse = function(string){
  var output = ''
  for (var i = 0; i < string.length; i++){
    output + valid(string[i], i)
  }
  for (var i = 0; i < output.length; i++){
    
  }




}

module.exports.isValidChar = function(char, index){
  var valid = ['1','2','3','4','5','6','7','8','9','0',
               'a','b','c','d','e','f','g','h','i','j',
               'k','l','m','n','o','p','q','r','s','t',
               'u','v','w','x','y','z',
               'A','B','C','D','E','F','G','H','I','J',
               'K','L','M','N','O','P','Q','R','S','T',
               'U','V','W','X','Y','Z',
               ';','(',')','{','}','<','>','/','|','"',
               '&','^','%','$','#','+','-','=','[',']',
               ',','.',':','*','~',' ']
  if(valid.includes(char)){
    return char;
  } else {
    return `ERR: INVALID CHARACTER AT POSITION ${index}`
  }
}

// INT, BIN, ERR, AND, ORR, XOR, NOR, NOT, LFT, RGT, WRT, SWP, RTN 

module.exports.isSavedWord = function(char, index){
  var  


}