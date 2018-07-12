var NOT  = function () {
    if (registers.headBufferLocation[7]){             //xxxxxxx1
        if (registers.headBufferLocation[6]){         //xxxxxx11
            if (registers.headBufferLocation[5]){     //xxxxx111 *  head at index 7 in buffer A 
                  
            } else {                                  //xxxxx011 *  head at index 3 in buffer A
            
            }
        } else {                                      //xxxxxx01
            if (c){                                   //xxxxx101 *  head at index 5 in buffer A
                
            } else {                                  //xxxxx001 *  head at index 1 in buffer A
                
            }
        }
    } else {
        if (registers.headBufferLocation[6]){         //xxxxxx10
            if (registers.headBufferLocation[5]){     //xxxxx110 *  head at index 6 in buffer A
                  
            } else {                                  //xxxxx010 *  head at index 2 in buffer A
                
            }
        } else {                                      //xxxxxx00 * 
            if (c){                                   //xxxxx100 *  head at index 4 in buffer A
        
            } else {                                  //xxxxx000 *  head at index 0 in buffer A 
                
            }
        }
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


var toGate = function(instructionArray){
    var a = instructionArray[7];
    var b = instructionArray[6];
    var c = instructionArray[5];
    var d = instructionArray[4];
    var e = instructionArray[3];
    var f = instructionArray[2];
    var g = instructionArray[1];
    var h = instructionArray[0];


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
var getCurrentHeadValue = function () {
if (registers.headBufferLocation[7]){                     //xxxxxxx1
        if (registers.headBufferLocation[6]){             //xxxxxx11
            if (registers.headBufferLocation[5]){         //xxxxx111 *   head at index 7 
                if (registers.headBufferLocation[4]){     //xxxx1111 **  head at index 7 in buffer B 
                    return registers.memoryBufferB[7]  
                } else {                                  //xxxx0111 **  head at index 7 in buffer A
                    return registers.memoryBuffera[7]
                }      
            } else {                                      //xxxxx011 *   head at index 3 
                if (registers.headBufferLocation[4]){     //xxxx1011 **  head at index 3 in buffer B 
                    return registers.memoryBufferB[3]    
                } else {                                  //xxxx0011 **  head at index 3 in buffer A
                    return registers.memoryBufferA[3]
                }
            }
        } else {                                          //xxxxxx01
            if (registers.headBufferLocation[5]){         //xxxxx101 *   head at index 5 
                if (registers.headBufferLocation[4]){     //xxxx1101 **  head at index 5 in buffer B 
                    return registers.memoryBufferB[5]        
                } else {                                  //xxxx0101 **  head at index 5 in buffer A
                    return registers.memoryBufferA[5]
                }    
            } else {                                      //xxxxx001 *   head at index 1 
                if (registers.headBufferLocation[4]){     //xxxx1001 **  head at index 1 in buffer B 
                    return registers.memoryBufferB[1]        
                } else {                                  //xxxx0001 **  head at index 1 in buffer A
                    return registers.memoryBufferA[1]
                }   
            }
        }
    } else {
        if (registers.headBufferLocation[6]){             //xxxxxx10
            if (registers.headBufferLocation[5]){         //xxxxx110 *  head at index 6 
                 if (registers.headBufferLocation[4]){    //xxxxx111 *  head at index 6 in buffer B 
                    return registers.memoryBufferB[6]     
                } else {                                  //xxxxx011 *  head at index 6 in buffer A
                    return registers.memoryBufferA[6]
                }         
            } else {                                      //xxxxx010 *  head at index 2 
                 if (registers.headBufferLocation[4]){    //xxxxx111 *  head at index 2 in buffer B 
                    return registers.memoryBufferB[2]     
                } else {                                  //xxxxx011 *  head at index 2 in buffer A
                    return registers.memoryBufferA[2]
                }       
            }
        } else {                                          //xxxxxx00 * 
            if (registers.headBufferLocation[5]){         //xxxxx100 *  head at index 4 
                 if (registers.headBufferLocation[4]){    //xxxxx111 *  head at index 4 in buffer B 
                    return registers.memoryBufferB[4]
                } else {                                  //xxxxx011 *  head at index 4 in buffer A
                    return registers.memoryBufferA[4]
                }   
            } else {                                      //xxxxx000 *  head at index 0 
                if (registers.headBufferLocation[4]){     //xxxx1000 *  head at index 0 in buffer B 
                    return registers.memoryBufferB[0]  
                } else {                                  //xxxx0000 *  head at index 0 in buffer A
                    return registers.memoryBufferA[0]
                }   
            }
        }
    }
}


var moveHeadLeft = function ()  {
if (registers.headBufferLocation[7]){                     //xxxxxxx1
        if (registers.headBufferLocation[6]){             //xxxxxx11
            if (registers.headBufferLocation[5]){         //xxxxx111 *   head at index 7 
                if (registers.headBufferLocation[4]){     //xxxx1111 **  head at index 7 in buffer B 
                    headBufferLocation[7] = 0 
                } else {                                  //xxxx0111 **  head at index 7 in buffer A
                    headBufferLocation[7] = 0
                }      
            } else {                                      //xxxxx011 *   head at index 3 
                if (registers.headBufferLocation[4]){     //xxxx1011 **  head at index 3 in buffer B 
                    headBufferLocation[7] = 0    
                } else {                                  //xxxx0011 **  head at index 3 in buffer A
                    headBufferLocation[7] = 0
                }
            }
        } else {                                          //xxxxxx01
            if (registers.headBufferLocation[5]){         //xxxxx101 *   head at index 5 
                if (registers.headBufferLocation[4]){     //xxxx1101 **  head at index 5 in buffer B 
                    headBufferLocation[7] = 0        
                } else {                                  //xxxx0101 **  head at index 5 in buffer A
                    headBufferLocation[7] = 0
                }    
            } else {                                      //xxxxx001 *   head at index 1 
                if (registers.headBufferLocation[4]){     //xxxx1001 **  head at index 1 in buffer B 
                    headBufferLocation[7] = 0        
                } else {                                  //xxxx0001 **  head at index 1 in buffer A
                    headBufferLocation[7] = 0
                }   
            }
        }
    } else {
        if (registers.headBufferLocation[6]){             //xxxxxx10
            if (registers.headBufferLocation[5]){         //xxxxx110 *  head at index 6 
                 if (registers.headBufferLocation[4]){    //xxxx1110 **  head at index 6 in buffer B 
                    headBufferLocation[6] = 0
                    headBufferLocation[7] = 1     
                } else {                                  //xxxx0110 **  head at index 6 in buffer A
                    headBufferLocation[6] = 0
                    headBufferLocation[7] = 1
                }         
            } else {                                      //xxxxx010 *  head at index 2 
                 if (registers.headBufferLocation[4]){    //xxxx1010 **  head at index 2 in buffer B 
                    headBufferLocation[6] = 0
                    headBufferLocation[7] = 1     
                } else {                                  //xxxx0010 **  head at index 2 in buffer A
                    headBufferLocation[6] = 0
                    headBufferLocation[7] = 1
                }       
            }
        } else {                                          //xxxxxx00 * 
            if (registers.headBufferLocation[5]){         //xxxxx100 *  head at index 4 
                 if (registers.headBufferLocation[4]){    //xxxx1100 *  head at index 4 in buffer B 
                    headBufferLocation[5] = 0
                    headBufferLocation[6] = 1
                    headBufferLocation[7] = 1
                } else {                                  //xxxx0100 *  head at index 4 in buffer A
                    headBufferLocation[5] = 0
                    headBufferLocation[6] = 1
                    headBufferLocation[7] = 1
                    
                }   
            } else {                                      //xxxxx000 *  head at index 0 
                if (registers.headBufferLocation[4]){     //xxxx1000 *  head at index 0 in buffer B 
                    headBufferLocation[4] = 0
                    headBufferLocation[5] = 1
                    headBufferLocation[6] = 1
                    headBufferLocation[7] = 1 
                } else {                                  //xxxx0000 **  head at index 0 in buffer A
                    headBufferLocation[0] = 0
                    headBufferLocation[1] = 0
                    headBufferLocation[2] = 0
                    headBufferLocation[3] = 0
                    headBufferLocation[4] = 0
                    headBufferLocation[5] = 0
                    headBufferLocation[6] = 0
                    headBufferLocation[7] = 0
                    headBufferLocation[8] = 0
                }   
            }
        }
    }
}

var binaryAdd = function 






