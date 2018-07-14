var tony = 'tony'

var parse = function(string){
  var output = ''
  for (var i = 0; i < string.length; i++){
    output += isValidChar(string[i], i)
  }
  console.log(output)
  var arg1
  var arg2
  var inst
  var count = 0;
  var index = 0;
  var reqArg2
  var parenBlockOpen = false;
  if (output[index] !== '('){
    
    return '!! INVALID EXPRESSION, NO OPEN'
  } else {
    count ++;
    index ++;
    parenBlockOpen = true
    while (count > 0){
      if(output[index] === undefined){
        return '!! INVALID EXPRESSION, NO CLOSE'
      }
      if (output[index] === '('){
        
        count ++;
        parenBlockOpen = true;
        index ++;
      };
      if (output[index] === ')'){
        count --;
        index ++;
      };
      if (output[index] === '#'){
        if (!parenBlockOpen){
          return `!! PARENTHESIS FULL AT INDEX ${index}, OPEN NEW PARENTHESIS`
        }
        var nums = ['0','1','2','3','4','5','6','7','8','9'] 
        var num  = '';
        index ++;
        while (output[index] !== ')'){
          if (nums.includes(output[index])){
            num += output[index];
            index ++;
          } else {
            return `!! INVALID CHARACTER AT POSITION ${index}`;
          }
        }
        parenBlockOpen = false
        if (!arg1){
          console.log(num)
          var num =  parseInt(num).toString(2).padStart(8, '0');
          if (num.length > 8){
            return `!! INPUT AT POSITION ${index - 1} TOO LARGE`;
          }
          arg1 = num;
        } else if (!arg2){
          console.log(num)
          var num = parseInt(num).toString(2).padStart(8, '0');
          if (num.length > 8){
            return `!! INPUT AT POSITION ${index - 1} TOO LARGE`;
          }
          arg2 = num; 
        } else if (arg1 && arg2){
          return `!! INVALID EXPRESSION, TOO MANY ARGS`;
        }
      }


      if (output[index] === ':'){
        if (!parenBlockOpen){
          return `!! PARENTHESIS FULL AT INDEX ${index}, OPEN NEW PARENTHESIS`
        }
        var nums = ['0','1'];
        var num = '';
        var start = index
        index ++;
        while (output[index] !== ')'){
          
          if (nums.includes(output[index])){
            num += output[index];
            index ++;
          } else {
            return `!! INVALID CHARACTER AT POSITION ${index}`;
          }
          if (index - start > 9){
            return `!! ARGUMENT TOO LONG`
          }
        }
        parenBlockOpen = false
        if(!arg1){
          if (num.length > 8){
            return `!! INPUT AT POSITION ${index - 1} TOO LARGE`;
          }
          arg1 = num.padStart(8,'0')
        } else if (!arg2){
          if (num.length > 8){
            return `!! INPUT AT POSITION ${index - 1} TOO LARGE`;
          }
          arg2 = num.padStart(8,'0')
        } else if (arg1 && arg2){
          return `!! INVALID EXPRESSION, TOO MANY ARGS`;
        }
        

      }


      if (output[index] === '~'){
        if (!parenBlockOpen){
          return `!! PARENTHESIS FULL AT INDEX ${index}, OPEN NEW PARENTHESIS`
        }
        index ++;
        if(!arg1){
          return `!! INVALID EXPRESSION, MISSING ARG`
        }
        if(inst){
          return `!! INVALID EXPRESSION, TOO MANY COMMANDS`
        }
        if (output[index] === '~'){
          inst = '000000000'
          index ++;
          parenBlockOpen = false;
        }
      }


      if (output[index] === '$'){
         if (!parenBlockOpen){
          return `!! PARENTHESIS FULL AT INDEX ${index}, OPEN NEW PARENTHESIS`
        }
        index ++;
        if(inst){
          return `!! INVALID EXPRESSION, TOO MANY COMMANDS`
        }
        if (output[index] === '$'){
          inst = '000000001'
          index ++;
          parenBlockOpen = false;
        }
        
      }  


      if (output[index] ===  '&'){ //AND BLOCK
        if (!parenBlockOpen){
          return `!! PARENTHESIS FULL AT INDEX ${index}, OPEN NEW PARENTHESIS`
        }
        index++;
        if(!arg1){
          return `!! INVALID EXPRESSION, MISSING ARG`
        }
        if(inst){
          return `!! INVALID EXPRESSION, TOO MANY COMMANDS`
        }
        if (output[index] === '&'){ // AND
          inst = '00000010'
          reqArg2 = true;
          index ++;
          parenBlockOpen = false;
        } 
        if (output[index] === '~'){ // NAND
          inst = '00000011'
          reqArg2 = true;
          index ++;
          parenBlockOpen = false;
        }

      }


      if(output[index] === '|'){ // OR block\]
        if (!parenBlockOpen){
          return `!! PARENTHESIS FULL AT INDEX ${index}, OPEN NEW PARENTHESIS`
        }
        index++; 
        if(!arg1){
          return `!! INVALID EXPRESSION, MISSING ARG`
        }
        if(inst){
          return `!! INVALID EXPRESSION, TOO MANY COMMANDS`
        }
        if(output[index] === '|'){ // OR
          inst = '00000100'
          reqArg2 = true;
          index ++;
          parenBlockOpen = false;
        }
        if(output[index] === '~'){ // NOR
          inst = '00000101'
          reqArg2 = true;
          index ++;
          parenBlockOpen = false;
        }
        if(output[index] === 'x'){ //XOR
          inst = '00000110'
          reqArg2 = true;
          index ++;
          parenBlockOpen = false;
        }
        if(output[index] === '^'){ //XNOR
          inst = '00000111'
          reqArg2 = true;
          index ++;
          parenBlockOpen = false;
        }
        parenBlockOpen = false;
      }


      if(output[index] === '@'){ // HEAD block
        if (!parenBlockOpen){
          return `!! PARENTHESIS FULL AT INDEX ${index}, OPEN NEW PARENTHESIS`
        }
        index++;
        if(inst){
          return `!! INVALID EXPRESSION, TOO MANY COMMANDS`
        }
        if(arg1){
          return `!! INVALID EXPRESSION, TOO MANY ARGS`
        }
        if (output[index] === '@'){ //HEADLOC
          inst = '00001000'
          index ++;
          parenBlockOpen = false;
        } 
        if (output[index] === '$'){ //HEADVAL
          inst = '00001001'
          index ++;
          parenBlockOpen = false;
        }
        if (output[index] === '0'){ //WRITE0
          inst = '00001010'
          index ++;
          parenBlockOpen = false;
        }
        if (output[index] === '1'){ //WRITE(1)
          inst = '00001011'
          index ++;
          parenBlockOpen = false;
        }
      }


      if(output[index] === '<'){// LEFT block
        if (!parenBlockOpen){
          return `!! PARENTHESIS FULL AT INDEX ${index}, OPEN NEW PARENTHESIS`
        }
        index++;
        if(inst){
          return `!! INVALID EXPRESSION, TOO MANY COMMANDS`
        }
        if(!arg1){
          return `!! INVALID EXPRESSION, MISSING ARG`
        }
        if (output[index] === '<'){ //LEFT
          inst = '11111111'
          index ++;
          parenBlockOpen = false;
        } 
      }


      if(output[index] === '>'){// RIGHT block
        if (!parenBlockOpen){
          return `!! PARENTHESIS FULL AT INDEX ${index}, OPEN NEW PARENTHESIS`
        }
        index++;
        if(inst){
          return `!! INVALID EXPRESSION, TOO MANY COMMANDS`
        }
        if(!arg1){
          return `!! INVALID EXPRESSION, MISSING ARG`
        }
        if (output[index] === '>'){ //RIGHT
          inst = '01111111'
          index ++;
          parenBlockOpen = false;
        }
        if (output[index] === '<'){ //SWAP
          inst = '01111110'
          index ++;
          parenBlockOpen = false;
        } 
      }


      if(output[index] === '!'){ // ERR block
        return output;
      }


    }
  }
  if (!inst){
    return '';
  }
  if (reqArg2){
    if(!arg2){
    return `!! INVALID EXPESSION, MISSING SECOND ARGUMENT`
    }
  }

  return {
    instruction : inst,
    argument1 : arg1,
    arguement2 : arg2
  }


}

var isValidChar = function(char, index){
  var valid = ['1','2','3','4','5','6','7','8','9','0',
               // 'a','b','c','d','e','f','g','h','i','j',
               // 'k','l','m','n','o','p','q','r','s','t',
               // 'u','v','w','x','y','z',
               // 'A','B','C','D','E','F','G','H','I','J',
               // 'K','L','M','N','O','P','Q','R','S','T',
               // 'U','V','W','X','Y','Z',
               ';','(',')','{','}','<','>','/','|','"',
               '&','^','%','$','#','+','-','=','[',']',
               ',','.',':','*','~',' ','@','x']
  if(valid.includes(char)){
    if(char === ' '){
      return '';
    }
    return char;
   
  } else if (!valid.includes(char)) {
    console.log(char)
    return `!! INVALID CHARACTER AT POSITION ${index}`
  }
}

// INT, BIN, ERR, AND, ORR, XOR, NOR, NOT, LFT, RGT, WRT, SWP, RTN 
// >> , << , !!  , #  , :  , && , || ,  ~~ ,  &~,  |~ ,   |x,   |^,      @$,       @@, @0    , @1     , $$
// R   , L , er  , int, bin, AND, OR, NOT, NAND ,  NOR,  XOR,  XNOR, HEADVAL, HEADLOC, WRITE0, WRITE1 , ID         


//  ((:10011101)~|(:01110100))
//  ((#47)&(#5))
//
//
//
//
//
//
//
//
