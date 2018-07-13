var NOT  = function () {
    var oneNotShiftLeft = function () {
        if(getCurrentHeadValue()){
            memoryBufferA[getCurrentHeadLocation[1]] = 0;
        } else {
            memoryBufferA[getCurrentHeadLocation[1]] = 1;
        }
        moveHeadLeft(); 
    }
};

var ID   = function () {

};

var AND  = function () {
  
};

var NAND = function () {

};

var OR   = function () {

};

var NOR  = function (){

};

var XOR  = function () {

};

var NXOR = function() {

};


var toGate = function(){
    var a = register.instruction[7];
    var b = register.instruction[6];
    var c = register.instruction[5];
    var d = register.instruction[4];
    var e = register.instruction[3];
    var f = register.instruction[2];
    var g = register.instruction[1];
    var h = register.instruction[0];


    if (a){             //xxxxxxx1
        if (b){         //xxxxxx11
            if (c){     //xxxxx111 * 
                //CASE XNOR (2 ARGS)    
            } else {    //xxxxx011 * 
                //CASE NAND (2 ARGS)
            }
        } else {        //xxxxxx01
            if (c){     //xxxxx101 * 
                //CASE: NOR (2 ARGS)
            } else {    //xxxxx001 * 
                //CASE: ID MAP (1 ARGS)
            }
        }
    } else {
        if (b){         //xxxxxx10
            if (c){     //xxxxx110 * 
                //CASE: XOR (2 ARGS)    
            } else {    //xxxxx010 * 
                //CASE: AND (2 ARGS)
            }
        } else {        //xxxxxx00
            if (c){     //xxxxx100 * 
                //CASE: OR (2 ARGS)
            } else {    //xxxxx000 * 
                //CASE: NOT (1 ARG)
            }
        }
    }
}
var setHeadLocationToStart = function () {
    if (registers.headBufferLocation[0]){
        registers.headBufferLocation[0] = 0;
        return;  
    }
    if (registers.headBufferLocation[1]){
        registers.headBufferLocation[1] = 0;
        return;
    }
    if (registers.headBufferLocation[2]){
        registers.headBufferLocation[2] = 0;
        return;
    }
    if (registers.headBufferLocation[3]){
        registers.headBufferLocation[3] = 0;
        return;
    }
    if (registers.headBufferLocation[4]){
        registers.headBufferLocation[4] = 0;
        return;
    }
    if (registers.headBufferLocation[5]){
        registers.headBufferLocation[5] = 0;
        return;
    }
    if (registers.headBufferLocation[6]){
        registers.headBufferLocation[6] = 0;
        return;
    }
    if (registers.headBufferLocation[7]){
        registers.headBufferLocation[7] = 0;
        return;
    }
    if (registers.headBufferLocation[8]){
        registers.headBufferLocation[8] = 0;
        return;
    }
}
var getCurrentHeadValue = function () {
if (registers.headBufferLocation[7]){                     //xxxxxxx1
        if (registers.headBufferLocation[6]){             //xxxxxx11
            if (registers.headBufferLocation[5]){         //xxxxx111 *   head at index 7 
                if (registers.headBufferLocation[4]){     //xxxx1111 **  head at index 7 in buffer B 
                    return registers.memoryBufferB[7];  
                } else {                                  //xxxx0111 **  head at index 7 in buffer A
                    return registers.memoryBufferA[7];
                }      
            } else {                                      //xxxxx011 *   head at index 3 
                if (registers.headBufferLocation[4]){     //xxxx1011 **  head at index 3 in buffer B 
                    return registers.memoryBufferB[3];    
                } else {                                  //xxxx0011 **  head at index 3 in buffer A
                    return registers.memoryBufferA[3];
                }
            }
        } else {                                          //xxxxxx01
            if (registers.headBufferLocation[5]){         //xxxxx101 *   head at index 5 
                if (registers.headBufferLocation[4]){     //xxxx1101 **  head at index 5 in buffer B 
                    return registers.memoryBufferB[5];        
                } else {                                  //xxxx0101 **  head at index 5 in buffer A
                    return registers.memoryBufferA[5];
                }    
            } else {                                      //xxxxx001 *   head at index 1 
                if (registers.headBufferLocation[4]){     //xxxx1001 **  head at index 1 in buffer B 
                    return registers.memoryBufferB[1];        
                } else {                                  //xxxx0001 **  head at index 1 in buffer A
                    return registers.memoryBufferA[1];
                }   
            }
        }
    } else {
        if (registers.headBufferLocation[6]){             //xxxxxx10
            if (registers.headBufferLocation[5]){         //xxxxx110 *  head at index 6 
                 if (registers.headBufferLocation[4]){    //xxxxx111 *  head at index 6 in buffer B 
                    return registers.memoryBufferB[6];     
                } else {                                  //xxxxx011 *  head at index 6 in buffer A
                    return registers.memoryBufferA[6];
                }         
            } else {                                      //xxxxx010 *  head at index 2 
                 if (registers.headBufferLocation[4]){    //xxxxx111 *  head at index 2 in buffer B 
                    return registers.memoryBufferB[2];     
                } else {                                  //xxxxx011 *  head at index 2 in buffer A
                    return registers.memoryBufferA[2];
                }       
            }
        } else {                                          //xxxxxx00 * 
            if (registers.headBufferLocation[5]){         //xxxxx100 *  head at index 4 
                 if (registers.headBufferLocation[4]){    //xxxxx111 *  head at index 4 in buffer B 
                    return registers.memoryBufferB[4];
                } else {                                  //xxxxx011 *  head at index 4 in buffer A
                    return registers.memoryBufferA[4];
                }   
            } else {                                      //xxxxx000 *  head at index 0 
                if (registers.headBufferLocation[4]){     //xxxx1000 *  head at index 0 in buffer B 
                    return registers.memoryBufferB[0];  
                } else {                                  //xxxx0000 *  head at index 0 in buffer A
                    return registers.memoryBufferA[0];
                }   
            }
        }
    }
};
var getCurrentHeadLocation = function () {
if (registers.headBufferLocation[7]){                     //xxxxxxx1
        if (registers.headBufferLocation[6]){             //xxxxxx11
            if (registers.headBufferLocation[5]){         //xxxxx111 *   head at index 7 
                if (registers.headBufferLocation[4]){     //xxxx1111 **  head at index 7 in buffer B 
                    return ['B', 7];  
                } else {                                  //xxxx0111 **  head at index 7 in buffer A
                    return ['A', 7];
                }      
            } else {                                      //xxxxx011 *   head at index 3 
                if (registers.headBufferLocation[4]){     //xxxx1011 **  head at index 3 in buffer B 
                    return ['B',3];   
                } else {                                  //xxxx0011 **  head at index 3 in buffer A
                    return ['A',3];
                }
            }
        } else {                                          //xxxxxx01
            if (registers.headBufferLocation[5]){         //xxxxx101 *   head at index 5 
                if (registers.headBufferLocation[4]){     //xxxx1101 **  head at index 5 in buffer B 
                    return ['B',5];        
                } else {                                  //xxxx0101 **  head at index 5 in buffer A
                    return ['A',5];
                }    
            } else {                                      //xxxxx001 *   head at index 1 
                if (registers.headBufferLocation[4]){     //xxxx1001 **  head at index 1 in buffer B 
                    return ['B',1];        
                } else {                                  //xxxx0001 **  head at index 1 in buffer A
                    return ['A',1];
                }   
            }
        }
    } else {
        if (registers.headBufferLocation[6]){             //xxxxxx10
            if (registers.headBufferLocation[5]){         //xxxxx110 *  head at index 6 
                 if (registers.headBufferLocation[4]){    //xxxxx111 *  head at index 6 in buffer B 
                    return ['B',6];     
                } else {                                  //xxxxx011 *  head at index 6 in buffer A
                    return ['A',6];
                }         
            } else {                                      //xxxxx010 *  head at index 2 
                 if (registers.headBufferLocation[4]){    //xxxxx111 *  head at index 2 in buffer B 
                    return ['B',2];     
                } else {                                  //xxxxx011 *  head at index 2 in buffer A
                    return ['A',2];
                }       
            }
        } else {                                          //xxxxxx00 * 
            if (registers.headBufferLocation[5]){         //xxxxx100 *  head at index 4 
                 if (registers.headBufferLocation[4]){    //xxxxx111 *  head at index 4 in buffer B 
                    return ['B',4];
                } else {                                  //xxxxx011 *  head at index 4 in buffer A
                    return ['A',4];
                }   
            } else {                                      //xxxxx000 *  head at index 0 
                if (registers.headBufferLocation[4]){     //xxxx1000 *  head at index 0 in buffer B 
                    return ['B',0];  
                } else {                                  //xxxx0000 *  head at index 0 in buffer A
                    return ['A',0];
                }   
            }
        }
    }
};

var moveHeadLeft = function ()  {
if (registers.headBufferLocation[7]){                     //xxxxxxx1
        if (registers.headBufferLocation[6]){             //xxxxxx11
            if (registers.headBufferLocation[5]){         //xxxxx111 *   head at index 7 
                if (registers.headBufferLocation[4]){     //xxxx1111 **  head at index 7 in buffer B 
                    headBufferLocation[7] = 0;
                    return ['B', 6]; 
                } else {                                  //xxxx0111 **  head at index 7 in buffer A
                    headBufferLocation[7] = 0;
                    return ['A', 6];
                }      
            } else {                                      //xxxxx011 *   head at index 3 
                if (registers.headBufferLocation[4]){     //xxxx1011 **  head at index 3 in buffer B 
                    headBufferLocation[7] = 0;
                    return ['B', 2];    
                } else {                                  //xxxx0011 **  head at index 3 in buffer A
                    headBufferLocation[7] = 0;
                    return ['A', 2];
                }
            }
        } else {                                          //xxxxxx01
            if (registers.headBufferLocation[5]){         //xxxxx101 *   head at index 5 
                if (registers.headBufferLocation[4]){     //xxxx1101 **  head at index 5 in buffer B 
                    headBufferLocation[7] = 0;
                    return ['B', 4];        
                } else {                                  //xxxx0101 **  head at index 5 in buffer A
                    headBufferLocation[7] = 0;
                    return ['A', 4];
                }    
            } else {                                      //xxxxx001 *   head at index 1 
                if (registers.headBufferLocation[4]){     //xxxx1001 **  head at index 1 in buffer B 
                    headBufferLocation[7] = 0;
                    return ['B', 0];        
                } else {                                  //xxxx0001 **  head at index 1 in buffer A
                    headBufferLocation[7] = 0;
                    return ['A', 0];
                }   
            }
        }
    } else {
        if (registers.headBufferLocation[6]){             //xxxxxx10
            if (registers.headBufferLocation[5]){         //xxxxx110 *  head at index 6 
                 if (registers.headBufferLocation[4]){    //xxxx1110 **  head at index 6 in buffer B 
                    headBufferLocation[6] = 0;
                    headBufferLocation[7] = 1;
                    return ['B', 5];     
                } else {                                  //xxxx0110 **  head at index 6 in buffer A
                    headBufferLocation[6] = 0;
                    headBufferLocation[7] = 1;
                    return ['A', 5];
                }         
            } else {                                      //xxxxx010 *  head at index 2 
                 if (registers.headBufferLocation[4]){    //xxxx1010 **  head at index 2 in buffer B 
                    headBufferLocation[6] = 0;
                    headBufferLocation[7] = 1;
                    return ['B', 1];     
                } else {                                  //xxxx0010 **  head at index 2 in buffer A
                    headBufferLocation[6] = 0;
                    headBufferLocation[7] = 1;
                    return ['A', 1];
                }       
            }
        } else {                                          //xxxxxx00 * 
            if (registers.headBufferLocation[5]){         //xxxxx100 *  head at index 4 
                 if (registers.headBufferLocation[4]){    //xxxx1100 *  head at index 4 in buffer B 
                    headBufferLocation[5] = 0;
                    headBufferLocation[6] = 1;
                    headBufferLocation[7] = 1;
                    return ['B', 3];
                } else {                                  //xxxx0100 *  head at index 4 in buffer A
                    headBufferLocation[5] = 0;
                    headBufferLocation[6] = 1;
                    headBufferLocation[7] = 1;
                    return ['A', 3];
                    
                }   
            } else {                                      //xxxxx000 *  head at index 0 
                if (registers.headBufferLocation[4]){     //xxxx1000 *  head at index 0 in buffer B 
                    headBufferLocation[4] = 0;
                    headBufferLocation[5] = 1;
                    headBufferLocation[6] = 1;
                    headBufferLocation[7] = 1;
                    return ['A', 7]; 
                } else {
                    return ['A', 0];                                  //xxxx0000 **  head at index 0 in buffer A
                }   
            }
        }
    }
};


var moveHeadRight = function ()  {
if (registers.headBufferLocation[7]){                     //xxxxxxx1
        if (registers.headBufferLocation[6]){             //xxxxxx11
            if (registers.headBufferLocation[5]){         //xxxxx111 *   head at index 7 
                if (registers.headBufferLocation[4]){
                    return ['B', 7];                      //xxxx1111 **  head at index 7 in buffer B  
                } else {                                  //xxxx0111 **  head at index 7 in buffer A
                    headBufferLocation[4] = 1;
                    headBufferLocation[5] = 0;
                    headBufferLocation[6] = 0;
                    headBufferLocation[7] = 0;
                    return ['B', 0];
                }      
            } else {                                      //xxxxx011 *   head at index 3 
                if (registers.headBufferLocation[4]){     //xxxx1011 **  head at index 3 in buffer B 
                    headBufferLocation[5] = 1;
                    headBufferLocation[6] = 0;
                    headBufferLocation[7] = 0;
                    return ['B', 4];    
                } else {                                  //xxxx0011 **  head at index 3 in buffer A
                    headBufferLocation[5] = 1;
                    headBufferLocation[6] = 0;
                    headBufferLocation[7] = 0;
                    return ['A', 4];
                }
            }
        } else {                                          //xxxxxx01
            if (registers.headBufferLocation[5]){         //xxxxx101 *   head at index 5 
                if (registers.headBufferLocation[4]){     //xxxx1101 **  head at index 5 in buffer B 
                    headBufferLocation[6] = 1;
                    headBufferLocation[7] = 0;
                    return ['B', 6];        
                } else {                                  //xxxx0101 **  head at index 5 in buffer A
                    headBufferLocation[6] = 1;
                    headBufferLocation[7] = 0;
                    return ['A', 6];
                }    
            } else {                                      //xxxxx001 *   head at index 1 
                if (registers.headBufferLocation[4]){     //xxxx1001 **  head at index 1 in buffer B 
                    headBufferLocation[6] = 1;
                    headBufferLocation[7] = 0;
                    return ['B', 2];        
                } else {                                  //xxxx0001 **  head at index 1 in buffer A
                    headBufferLocation[6] = 1;
                    headBufferLocation[7] = 0;
                    return ['A', 2];
                }   
            }
        }
    } else {
        if (registers.headBufferLocation[6]){             //xxxxxx10
            if (registers.headBufferLocation[5]){         //xxxxx110 *  head at index 6 
                 if (registers.headBufferLocation[4]){    //xxxx1110 **  head at index 6 in buffer B 
                    headBufferLocation[7] = 1;
                    return ['B', 7];     
                } else {                                  //xxxx0110 **  head at index 6 in buffer A
                    headBufferLocation[7] = 1;
                    return ['A', 7];
                }         
            } else {                                      //xxxxx010 *  head at index 2 
                 if (registers.headBufferLocation[4]){    //xxxx1010 **  head at index 2 in buffer B 
                    headBufferLocation[7] = 1;
                    return ['B', 3];
                } else {                                  //xxxx0010 **  head at index 2 in buffer A
                    headBufferLocation[7] = 1;
                    return ['A', 3];
                }       
            }
        } else {                                          //xxxxxx00 * 
            if (registers.headBufferLocation[5]){         //xxxxx100 *  head at index 4 
                 if (registers.headBufferLocation[4]){    //xxxx1100 *  head at index 4 in buffer B 
                    headBufferLocation[7] = 1;
                    return ['B', 5];
                } else {                                    //xxxx0100 *  head at index 4 in buffer A
                    headBufferLocation[7] = 1;
                    return ['A', 5];
                }   
            } else {                                      //xxxxx000 *  head at index 0 
                if (registers.headBufferLocation[4]){     //xxxx1000 *  head at index 0 in buffer B 
                    headBufferLocation[7] = 1;
                    return ['B', 1];
                } else {                                  //xxxx0000 **  head at index 0 in buffer A
                    headBufferLocation[7] = 1;
                    return ['A', 1];
                }   
            }
        }
    }
};


//change the state of the register by incrementing a given register property
//performs a binary add one operation (will overflow register)
var incrementRegisterProperty = function (regProp){  
    var i = regProp.length-1;
    while (regProp[i] === 1 && i >= 0){
        regProp[i] = 0;
        i--;
    }
    if (regProp[i] === 0){
        regProp[i] = 1;
    }
    return regProp;
}

//change the state of the register by decrementing a given register property
//performs a binary subtract one on operation (will overflow register to reset)
var decrementRegisterProperty = function (regProp){ 
    var i = regProp.lastIndexOf(1);
    debugger;
    if (!(i === -1)) {
        regProp[i] = 0;
        i++ 
    }
    while (regProp[i] === 0 && i < regProp.length){
        regProp[i] = 1;
        i ++; 
    }
    return regProp;
}

//read the current state of a given property value
var readRegisterPropertyValue = function (regProp){ 
    var value = 0;   
    if (regProp[7]){
        value += 1;
    }
    if (regProp[6]){
        value += 2;
    }
    if (regProp[5]){
        value += 4;
    }
    if (regProp[4]){
        value += 8;
    }
    if (regProp[3]){
        value += 16;
    }
    if (regProp[2]){
        value += 32;
    }
    if (regProp[1]){
        value += 64;
    }
    if (regProp[0]){
        value += 128;
    }
    return value;
}






