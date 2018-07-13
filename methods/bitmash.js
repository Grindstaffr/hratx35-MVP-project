// Complete answer on top of last buffer passed in 
//("A" on single arg functions, 'B' on dual arg functions)
//Head MUST NEEDS be moved to the start of the buffer before 
//    the response is passed to returnMemBuffer   
//  
// All functions should reset used buffers before returning out
// All functions may use any additional buffers to perform calcualtions
// 
// DO NOT leave data in buffers, as we make the assumption that buffers
//       are empty before calling any function
// 
var registers =  {
  instruction        : [0,0,0,0,0,0,0,0,0],
  auxBufferOne       : [0,0,0,0,0,0,0,0,0],
  auxBufferTwo       : [0,0,0,0,0,0,0,0,0],
  address            : [0,0,0,0,0,0,0,0,0],
  headBufferLocation : [0,0,0,0,0,0,0,0,0], 
  memoryBufferA      : [0,0,0,0,0,0,0,0,0],
  memoryBufferB      : [0,0,0,0,0,0,0,0,0]
}

var NOT  = function () { 

    var oneNotShiftLeft = function () {
        //flip bits
        if(getCurrentHeadValue()){
            writeValAtCurrentHeadLocation(0);
        } else {
            writeValAtCurrentHeadLocation(1);
        }
        //move head left
        moveHeadLeft(); 
    };

    while (readRegisterPropertyValue(registers.auxBufferOne) <= 7){
    //we assume auxBufferOne is at 00000000 when we start;
    //therefore whe should run 
        oneNotShiftLeft();
        incrementRegisterProperty(registers.auxBufferOne);
    }
    //head should shift left until it is at [B 7]

    resetRegisterProperty(registers.auxBufferOne);

    //returnMemBufferRL will read 8 bits from right to left, inclusively
    //it will begin with current Head position
    //and end on +7, and include it.
    swapBuffers();
    return returnMemBufferL(); //<<<<<<<<<<<********************************************
    //will Leave head at ['B', 7] if started on ['A', 7]
    // will leave head at ['A', 7] if started on ['B', 7]
};

var ID   = function () {

//move head to ['A', 0] to set buffer for returnMemBufferRL 
    while (readRegisterPropertyValue(registers.auxBufferOne) <=7){
        incrementRegisterProperty(registers.auxBufferOne);
        if (getCurrentHeadValue()){
            swapBuffers();
            writeValAtCurrentHeadLocation(1);
            swapBuffers();
        } else {
            swapBuffers();
            writeValAtCurrentHeadLocation(0);
            swapBuffers();
        }
        moveHeadLeft();
    };
    resetRegisterProperty(registers.auxBufferOne);
    //send back mem buffer A as a string 
    return returnMemBufferRL(); //head left x8
};

var AND  = function () {
//might want to rewrite this to handle a single pass of MEM BUFF A
//   flip bits in aux Buff One based on current index; and clear and r/w on
//   mem buff B based on flipped bits in aux buff One
//   instead of see-sawing back and forth
    

// at aux buf one  = 0 index starts at A7
                            // ends at A6
// at aux buf one  = 1 index starts at A6
                            // ends at A5
// at aux buf one  = 2 index starts at A5
                            // ends at A4
// at aux buf one  = 3 index starts at A4
                            // ends at A3
// at aux buf one  = 4 index starts at A3
                            // ends at A2
// at aux buf one  = 5 index starts at A2
                            // ends at A1
// at aux buf one  = 6 index starts at A1
                            // ends at A0
// at aux buf one  = 7 index starts at A0
                            // ends at B7



    while (readRegisterPropertyValue(registers.auxBufferTwo) <= 7){

        incrementRegisterProperty(registers.auxBufferTwo);

        if(getCurrentHeadValue()){
            incrementRegisterProperty(registers.auxBufferOne);
        }
        swapBuffers();
        if(readRegisterPropertyValue(auxBufferOne)){
            if(getCurrentHeadValue()){
                writeValAtCurrentHeadLocation(1);
            }
        } else {
            writeValAtCurrentHeadLocation(0);
        }
        resetRegisterProperty(registers.auxBufferOne);
        swapBuffers();
        moveHeadLeft();
    }
    //should end at ('alt' 7)

    //reset our counter
    resetRegisterProperty(registers.auxBufferTwo);

    
    //will return a stringified bit sequence based on second arg
    return  returnMemBufferL(); //head -= 7
    //will Leave head at ['B', 7] if started on ['A', 7]
    // will leave head at ['A', 7] if started on ['B', 7]
};

var NAND = function () {
//see AND Note
//should also be able to handle NOT + AND
//BUT  currently AND sets the Head Location after running;
// I can set head location at start of operations to allo for better concatenation of
//operations? 

    // while (readRegisterPropertyValue(registers.auxBufferTwo) <= 7){

    //     incrementRegisterProperty(registers.auxBufferTwo);

    //     if(getCurrentHeadValue()){
    //         incrementRegisterProperty(registers.auxBufferOne);
    //     }
    //     moveHeadLeft();     //1
    //     moveHeadLeft();     //2
    //     moveHeadLeft();     //3
    //     moveHeadLeft();     //4
    //     moveHeadLeft();     //5
    //     moveHeadLeft();     //6
    //     moveHeadLeft();     //7
    //     moveHeadLeft();     //8
    //     if(readRegisterPropertyValue(auxBufferOne)){
    //         if(getCurrentHeadValue()){
    //             writeValAtCurrentHeadLocation(0);
    //         }
    //     } else {
    //         writeValAtCurrentHeadLocation(1);
    //     }
    //     resetRegisterProperty(registers.auxBufferTwo);
    //     moveHeadRight();    //1     
    //     moveHeadRight();    //2      
    //     moveHeadRight();    //3    
    //     moveHeadRight();    //4
    //     moveHeadRight();    //5
    //     moveHeadRight();    //6
    //     moveHeadRight();    //7
    // }
  
    // //reset auxBufferTwo to 0;
    // //move head to start ['B', 0]
    // while (readRegisterPropertyValue(register.auxBufferTwo) <= 7){
    //     moveHeadLeft();
    // }

    // var returnable = returnMemBufferRL();

    // setHeadLocationToStart();
    
    // return returnable;

    AND();
    return NOT();
};

var OR   = function () {

};

var NOR  = function (){

};

var XOR  = function () {

};

var NXOR = function() {

};
var returnMemBufferL = function(){
    //should start at 'a/b' 7,
    //increment eight, print, end at 'b/a' 7
    var returnString = '';

    while (readRegisterPropertyValue(register.auxBufferTwo) <= 7){
        incrementRegisterProperty(register.auxBufferTwo);
        returnString =  getCurrentHeadValue().toString() + returnString 
        moveHeadLeft();
    }

    //will end at a/b // b/a 7 
    //equivalent to swap buffer;
    return returnString

}


//convert eights bits of memory buffer to a string to send back;
//begins at the head position and moves right 8 spaces;
//to return a whole buffer, ensure the head is at index 0 in teh buffer
//   before calling returnMemBuffer;
var returnMemBufferR = function(){
    var returnString = '';
// ******* WARNING **** 
// STANDARD READ IS LEFT TO RIGHT;
// RETURN MEM BUFF R IS A RIGHT TO LEFT READ STARTING AT INDEX 0 IN A BUFFER
//    AND ENDING AT INDEX 0 IN THE OTHER BUFFER
//DO NOT CALL RETURN MEMORY BUFFER IF DATA IN AUXBUFFER2 IS NEEDED;

    while (readRegisterPropertyValue(register.auxBufferTwo) <= 7){
        incrementRegisterProperty(register.auxBufferTwo);
        returnString += getCurrentHeadValue().toString();
        moveHeadRight();
    };

    return returnString;
}


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





var swapBuffers = function() {
    //swaps [from MemBuff A to MemBuff B]
    moveHeadLeft();
    moveHeadLeft();
    moveHeadLeft();
    moveHeadLeft();
    moveHeadLeft(); 
    moveHeadLeft();
    moveHeadLeft();
    moveHeadLeft();
    return;
}

var setHeadLocationToStart = function () {
//sets Head Buffer to ['A', 7]
    if (registers.headBufferLocation[0]){
        registers.headBufferLocation[0] = 0;  
    }
    if (registers.headBufferLocation[1]){
        registers.headBufferLocation[1] = 0;
    }
    if (registers.headBufferLocation[2]){
        registers.headBufferLocation[2] = 0;
    }
    if (registers.headBufferLocation[3]){
        registers.headBufferLocation[3] = 0;
    }
    if (registers.headBufferLocation[4]){
        registers.headBufferLocation[4] = 0;
    }
    if (registers.headBufferLocation[5]){
        registers.headBufferLocation[5] = 1;
    }
    if (registers.headBufferLocation[6]){
        registers.headBufferLocation[6] = 1;
    }
    if (registers.headBufferLocation[7]){
        registers.headBufferLocation[7] = 1;
    }
    return registers.headBufferLocation
};


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

var writeValAtCurrentHeadLocation = function (num   /* 0 xor 1 */){
    var headLoc = getCurrentHeadLocation();
    if (headLoc[0] === 'A'){
        registers.memoryBufferA[headLoc[1]] = num;
    } else {
        registers.memoryBufferB[headLoc[1]] = num;
    }
    return num
}


// :::::::::::::::::::::::::
//   MOVE HEAD LEFT ::::::::
// ::::::::::::::::::::::::: 
//                                               START?
//                                                 ||
//                                                 \/
//               0    1    2    3    4    5    6    7
//    MEMBUFFA [ | | <- | <- | <- | <- | <- | <- | <- ]                                        
//               \                                 /\ 
//               |                        _________|| 
//                \______________________/___________ 
//                                      /            ||
//                 ____________________/             || 
//                /                                  \/
//    MEMBUFFB [ | | <- | <- | <- | <- | <- | <- | <- ]
//               0    1    2    3    4    5    6    7
// 
// 
// ::::::::::::::::::::::::::
//   MOVE HEAD RIGHT ::::::::
// ::::::::::::::::::::::::::
// 
//               0    1    2    3    4    5    6    7
//    MEMBUFFA [ -> | -> | -> | -> | -> | -> | -> |  |  ]                                        
//               /\                                  |
//                \_____<___<_  _______>______>______/                  
//                            \/
//                   ___>___>_/\_______<______<______                     
//                  /                                \
//                 \/                                 |
//    MEMBUFFAB [ -> | -> | -> | -> | -> | -> | -> |  |  ]
//                 0    1    2    3    4    5    6    7
//               /\
//               ||
//               START?
// 
// 
// 
// 
// 
// 

var moveHeadLeft = function ()  {
if (registers.headBufferLocation[7]){                     //xxxxxxx1
        if (registers.headBufferLocation[6]){             //xxxxxx11
            if (registers.headBufferLocation[5]){         //xxxxx111 *   head at index 7 
                if (registers.headBufferLocation[4]){     //xxxx1111 **  head at index 7 in buffer B 
                    registers.headBufferLocation[7] = 0;
                    return ['B', 6]; 
                } else {                                  //xxxx0111 **  head at index 7 in buffer A
                    registers.headBufferLocation[7] = 0;
                    return ['A', 6];
                }      
            } else {                                      //xxxxx011 *   head at index 3 
                if (registers.headBufferLocation[4]){     //xxxx1011 **  head at index 3 in buffer B 
                    registers.headBufferLocation[7] = 0;
                    return ['B', 2];    
                } else {                                  //xxxx0011 **  head at index 3 in buffer A
                    registers.headBufferLocation[7] = 0;
                    return ['A', 2];
                }
            }
        } else {                                          //xxxxxx01
            if (registers.headBufferLocation[5]){         //xxxxx101 *   head at index 5 
                if (registers.headBufferLocation[4]){     //xxxx1101 **  head at index 5 in buffer B 
                    registers.headBufferLocation[7] = 0;
                    return ['B', 4];        
                } else {                                  //xxxx0101 **  head at index 5 in buffer A
                    registers.headBufferLocation[7] = 0;
                    return ['A', 4];
                }    
            } else {                                      //xxxxx001 *   head at index 1 
                if (registers.headBufferLocation[4]){     //xxxx1001 **  head at index 1 in buffer B 
                    registers.headBufferLocation[7] = 0;
                    return ['B', 0];        
                } else {                                  //xxxx0001 **  head at index 1 in buffer A
                    registers.headBufferLocation[7] = 0;
                    return ['A', 0];
                }   
            }
        }
    } else {
        if (registers.headBufferLocation[6]){             //xxxxxx10
            if (registers.headBufferLocation[5]){         //xxxxx110 *  head at index 6 
                 if (registers.headBufferLocation[4]){    //xxxx1110 **  head at index 6 in buffer B 
                    registers.headBufferLocation[6] = 0;
                    registers.headBufferLocation[7] = 1;
                    return ['B', 5];     
                } else {                                  //xxxx0110 **  head at index 6 in buffer A
                    registers.headBufferLocation[6] = 0;
                    registers.headBufferLocation[7] = 1;
                    return ['A', 5];
                }         
            } else {                                      //xxxxx010 *  head at index 2 
                 if (registers.headBufferLocation[4]){    //xxxx1010 **  head at index 2 in buffer B 
                    registers.headBufferLocation[6] = 0;
                    registers.headBufferLocation[7] = 1;
                    return ['B', 1];     
                } else {                                  //xxxx0010 **  head at index 2 in buffer A
                    registers.headBufferLocation[6] = 0;
                    registers.headBufferLocation[7] = 1;
                    return ['A', 1];
                }       
            }
        } else {                                          //xxxxxx00 * 
            if (registers.headBufferLocation[5]){         //xxxxx100 *  head at index 4 
                 if (registers.headBufferLocation[4]){    //xxxx1100 *  head at index 4 in buffer B 
                    registers.headBufferLocation[5] = 0;
                    registers.headBufferLocation[6] = 1;
                    registers.headBufferLocation[7] = 1;
                    return ['B', 3];
                } else {                                  //xxxx0100 *  head at index 4 in buffer A
                    registers.headBufferLocation[5] = 0;
                    registers.headBufferLocation[6] = 1;
                    registers.headBufferLocation[7] = 1;
                    return ['A', 3];
                    
                }   
            } else {                                      //xxxxx000 *  head at index 0 
                if (registers.headBufferLocation[4]){     //xxxx1000 *  head at index 0 in buffer B 
                    registers.headBufferLocation[4] = 0;
                    registers.headBufferLocation[5] = 1;
                    registers.headBufferLocation[6] = 1;
                    registers.headBufferLocation[7] = 1;
                    return ['A', 7];                                  //xxxx0000 **  head at index 0 in buffer A
                } else {
                    registers.headBufferLocation[4] = 1;
                    registers.headBufferLocation[5] = 1;
                    registers.headBufferLocation[6] = 1;
                    registers.headBufferLocation[7] = 1;
                    return ['B', 7]; 
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
                    registers.headBufferLocation[4] = 0;
                    registers.headBufferLocation[5] = 0;
                    registers.headBufferLocation[6] = 0;
                    registers.headBufferLocation[7] = 0;
                    return ['A', 0];                      //xxxx1111 **  head at index 7 in buffer B  
                } else {                                  //xxxx0111 **  head at index 7 in buffer A
                    registers.headBufferLocation[4] = 1;
                    registers.headBufferLocation[5] = 0;
                    registers.headBufferLocation[6] = 0;
                    registers.headBufferLocation[7] = 0;
                    return ['B', 0];
                }      
            } else {                                      //xxxxx011 *   head at index 3 
                if (registers.headBufferLocation[4]){     //xxxx1011 **  head at index 3 in buffer B 
                    registers.headBufferLocation[5] = 1;
                    registers.headBufferLocation[6] = 0;
                    registers.headBufferLocation[7] = 0;
                    return ['B', 4];    
                } else {                                  //xxxx0011 **  head at index 3 in buffer A
                    registers.headBufferLocation[5] = 1;
                    registers.headBufferLocation[6] = 0;
                    registers.headBufferLocation[7] = 0;
                    return ['A', 4];
                }
            }
        } else {                                          //xxxxxx01
            if (registers.headBufferLocation[5]){         //xxxxx101 *   head at index 5 
                if (registers.headBufferLocation[4]){     //xxxx1101 **  head at index 5 in buffer B 
                    registers.headBufferLocation[6] = 1;
                    registers.headBufferLocation[7] = 0;
                    return ['B', 6];        
                } else {                                  //xxxx0101 **  head at index 5 in buffer A
                    registers.headBufferLocation[6] = 1;
                    registers.headBufferLocation[7] = 0;
                    return ['A', 6];
                }    
            } else {                                      //xxxxx001 *   head at index 1 
                if (registers.headBufferLocation[4]){     //xxxx1001 **  head at index 1 in buffer B 
                    headBufferLocation[6] = 1;
                    headBufferLocation[7] = 0;
                    return ['B', 2];        
                } else {                                  //xxxx0001 **  head at index 1 in buffer A
                    registers.headBufferLocation[6] = 1;
                    registers.headBufferLocation[7] = 0;
                    return ['A', 2];
                }   
            }
        }
    } else {
        if (registers.headBufferLocation[6]){             //xxxxxx10
            if (registers.headBufferLocation[5]){         //xxxxx110 *  head at index 6 
                 if (registers.headBufferLocation[4]){    //xxxx1110 **  head at index 6 in buffer B 
                    registers.headBufferLocation[7] = 1;
                    return ['B', 7];     
                } else {                                  //xxxx0110 **  head at index 6 in buffer A
                    registers.headBufferLocation[7] = 1;
                    return ['A', 7];
                }         
            } else {                                      //xxxxx010 *  head at index 2 
                 if (registers.headBufferLocation[4]){    //xxxx1010 **  head at index 2 in buffer B 
                    registers.headBufferLocation[7] = 1;
                    return ['B', 3];
                } else {                                  //xxxx0010 **  head at index 2 in buffer A
                    registers.headBufferLocation[7] = 1;
                    return ['A', 3];
                }       
            }
        } else {                                          //xxxxxx00 * 
            if (registers.headBufferLocation[5]){         //xxxxx100 *  head at index 4 
                 if (registers.headBufferLocation[4]){    //xxxx1100 *  head at index 4 in buffer B 
                    registers.headBufferLocation[7] = 1;
                    return ['B', 5];
                } else {                                    //xxxx0100 *  head at index 4 in buffer A
                    registers.headBufferLocation[7] = 1;
                    return ['A', 5];
                }   
            } else {                                      //xxxxx000 *  head at index 0 
                if (registers.headBufferLocation[4]){     //xxxx1000 *  head at index 0 in buffer B 
                    registers.headBufferLocation[7] = 1;
                    return ['B', 1];
                } else {                                  //xxxx0000 **  head at index 0 in buffer A
                    registers.headBufferLocation[7] = 1;
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

var resetRegisterProperty = function (regProp){
    regProp[7] = 0;
    regProp[6] = 0;
    regProp[5] = 0;
    regProp[4] = 0;
    regProp[3] = 0;
    regProp[2] = 0;
    regProp[1] = 0;  
    regProp[0] = 0;
    return regProp;
}






