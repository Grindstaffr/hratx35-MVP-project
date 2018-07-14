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
  instruction        : [0,0,0,0,0,0,0,0],
  auxBufferOne       : [0,0,0,0,0,0,0,0],
  auxBufferTwo       : [0,0,0,0,0,0,0,0],
  address            : [0,0,0,0,0,0,0,0],
  headBufferLocation : [0,0,0,0,0,1,1,1], 
  memoryBufferA      : [0,0,0,0,0,0,0,0],
  memoryBufferB      : [0,0,0,0,0,0,0,0]
}

var INST = registers.instruction;
var AUX1 = registers.auxBufferOne;
var AUX2 = registers.auxBufferTwo;
var ADDR = registers.address;
var HEAD = registers.headBufferLocation;
var MEMA = registers.memoryBufferA;
var MEMB = registers.memoryBufferB;

var NOT  = function () { 

    while (PROPVAL(AUX1) <= 7){
    //we assume AUX1 is at 00000000 when we start;
    //therefore whe should run 
        if(HEADVAL()){
            WRITE(0);
        } else {
            WRITE(1);
        }
        //move head left
        LEFT(); 
        PROPINC(AUX1);
    } // these while loops teminate on [a/b//b/a 7]
    //head should shift left until it is at [B 7]

    PROPRESET(AUX1);
    PROPRESET(AUX2);

  
    SWAP();
    //move head from A7 to B7  ooorrrr B7 to A7

    //will Leave head at ['B', 7] if started on ['A', 7]
    // will leave head at ['A', 7] if started on ['B', 7]
    //SWAP();
    return RTRN();
};

var ID   = function () {

    // console.log(MEMA);
    // console.log(memoryBufferB);
    // console.log(HEADLOC())
     
    return RTRN(); //head left x8
};

var AND  = function () {
//might want to rewrite this to handle a single pass of MEM BUFF A
//   flip bits in aux Buff One based on current index; and clear and r/w on
//   mem buff B based on flipped bits in aux buff One
//   instead of see-sawing back and forth
    PROPRESET(AUX2)

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

    while (PROPVAL(AUX2) <= 7){

        PROPINC(AUX2);

        if(HEADVAL()){
            PROPINC(AUX1);
        }
        SWAP();

        if(PROPVAL(AUX1)){
            if(HEADVAL()){
                WRITE(1);
            } else {
                WRITE(0);
            }
            PROPDEC(AUX1);
        } else {
            WRITE(0);
        }
        
        SWAP();
        LEFT();
    }
    //should end at ('alt' 7)

    //reset our counter
    PROPRESET(AUX2);
    PROPRESET(AUX1);

    
    //will return a stringified bit sequence based on second arg
    return  RTRN(); //head -= 7
    //will Leave head at ['B', 7] if started on ['A', 7]
    // will leave head at ['A', 7] if started on ['B', 7]
};

var NAND = function () {
    AND();
    SWAP();
    return NOT();
};

var OR   = function () {
    NOT();
    NOT();
    AND();
    SWAP();
    return NOT();
     // RTRN()
};

var NOR  = function (){
    NOT();
    NOT();
    return AND();
};

var XOR  = function () {
 
    while (PROPVAL(AUX2) <= 7){
        PROPINC(AUX2);
        
        if (HEADVAL()){
            PROPINC(AUX1);
        }

        SWAP();
        
        
        if (PROPVAL(AUX1)){
            if (HEADVAL()){
                WRITE(0);
            } else {
                WRITE(1);
            }
            PROPDEC(AUX1);
        } else {
            if (HEADVAL()){
                WRITE(1);
            } else {    
                WRITE(0);
            }
        }

        SWAP();
        
        LEFT();
    }
    PROPRESET(AUX2)
    return RTRN();  
};

var XNOR = function() {
    XOR();
    SWAP();
    return NOT();

};
var RTRN = function(){
    //should start at 'a/b' 7,
    //increment eight, print, end at 'b/a' 7
    var returnString = '';

    while (PROPVAL(AUX2) <= 7){
    
        PROPINC(AUX2);
        returnString =  HEADVAL().toString() + returnString 
        LEFT();
    }

    PROPRESET(AUX2)

    //will end at a/b // b/a 7 
    //equivalent to swap buffer;
    return returnString

}


//convert eights bits of memory buffer to a string to send back;
//begins at the head position and moves right 8 spaces;
//to return a whole buffer, ensure the head is at index 0 in teh buffer
//   before calling returnMemBuffer;
var returnMemBufferR = function(){
    // var returnString = '';
// ******* WARNING **** 
// STANDARD READ IS LEFT TO RIGHT;
// RETURN MEM BUFF R IS A RIGHT TO LEFT READ STARTING AT INDEX 0 IN A BUFFER
//    AND ENDING AT INDEX 0 IN THE OTHER BUFFER
//DO NOT CALL RETURN MEMORY BUFFER IF DATA IN AUXBUFFER2 IS NEEDED;

    // while (PROPVAL(register.AUX2) <= 7){
    //     PROPINC(register.AUX2);
    //     returnString += HEADVAL().toString();
    //     RIGHT();
    // };

    // return returnString;
}


var RUN = function(){
    var PROG = PROPVAL(INST);
    if (PROG === 128) {
        return NOT();
    }
    if (PROG === 129) {
        return ID();
    }
    if (PROG === 2) {
        return AND();
    }
    if (PROG === 3) {
        return NAND();
    }
    if (PROG === 4) {
        return OR();
    }
    if (PROG === 5) {
        return NOR();
    }
    if (PROG === 6) {
        return XOR();
    }
    if (PROG === 7) {
        return XNOR();
    }
    if (PROG === 136) {
        return HEADLOC();
    }
    if (PROG === 137) {
        return HEADVAL();
    }
    if (PROG === 138) {
        return WRITE(0);
    }
    if (PROG === 139) {
        return WRITE(1);
    }
    if (PROG === 255) {
        return LEFT();
    }
    if (PROG === 254) {
        return RIGHT();
    }
    if(PROG === 253) {
        return SWAP();
    }
}





var SWAP = function() {
    //swaps [from MemBuff A to MemBuff B]
    LEFT();
    LEFT();
    LEFT();
    LEFT();
    LEFT(); 
    LEFT();
    LEFT();
    LEFT();
    return;
}

var HEADRESET = function () {
//sets Head Buffer to ['A', 7]
    if (HEAD[0]){
        HEAD[0] = 0;  
    }
    if (HEAD[1]){
        HEAD[1] = 0;
    }
    if (HEAD[2]){
        HEAD[2] = 0;
    }
    if (HEAD[3]){
        HEAD[3] = 0;
    }
    if (HEAD[4]){
        HEAD[4] = 0;
    }
    if (HEAD[5]){
        HEAD[5] = 1;
    }
    if (HEAD[6]){
        HEAD[6] = 1;
    }
    if (HEAD[7]){
        HEAD[7] = 1;
    }
    return HEAD
};


var HEADVAL = function () {
if (HEAD[7]){                     //xxxxxxx1
        if (HEAD[6]){             //xxxxxx11
            if (HEAD[5]){         //xxxxx111 *   head at index 7 
                if (HEAD[4]){     //xxxx1111 **  head at index 7 in buffer B 
                    return MEMB[7];  
                } else {                                  //xxxx0111 **  head at index 7 in buffer A
                    return MEMA[7];
                }      
            } else {                                      //xxxxx011 *   head at index 3 
                if (HEAD[4]){     //xxxx1011 **  head at index 3 in buffer B 
                    return MEMB[3];    
                } else {                                  //xxxx0011 **  head at index 3 in buffer A
                    return MEMA[3];
                }
            }
        } else {                                          //xxxxxx01
            if (HEAD[5]){         //xxxxx101 *   head at index 5 
                if (HEAD[4]){     //xxxx1101 **  head at index 5 in buffer B 
                    return MEMB[5];        
                } else {                                  //xxxx0101 **  head at index 5 in buffer A
                    return MEMA[5];
                }    
            } else {                                      //xxxxx001 *   head at index 1 
                if (HEAD[4]){     //xxxx1001 **  head at index 1 in buffer B 
                    return MEMB[1];        
                } else {                                  //xxxx0001 **  head at index 1 in buffer A
                    return MEMA[1];
                }   
            }
        }
    } else {
        if (HEAD[6]){             //xxxxxx10
            if (HEAD[5]){         //xxxxx110 *  head at index 6 
                 if (HEAD[4]){    //xxxxx111 *  head at index 6 in buffer B 
                    return MEMB[6];     
                } else {                                  //xxxxx011 *  head at index 6 in buffer A
                    return MEMA[6];
                }         
            } else {                                      //xxxxx010 *  head at index 2 
                 if (HEAD[4]){    //xxxxx111 *  head at index 2 in buffer B 
                    return MEMB[2];     
                } else {                                  //xxxxx011 *  head at index 2 in buffer A
                    return MEMA[2];
                }       
            }
        } else {                                          //xxxxxx00 * 
            if (HEAD[5]){         //xxxxx100 *  head at index 4 
                 if (HEAD[4]){    //xxxxx111 *  head at index 4 in buffer B 
                    return MEMB[4];
                } else {                                  //xxxxx011 *  head at index 4 in buffer A
                    return MEMA[4];
                }   
            } else {                                      //xxxxx000 *  head at index 0 
                if (HEAD[4]){     //xxxx1000 *  head at index 0 in buffer B 
                    return MEMB[0];  
                } else {                                  //xxxx0000 *  head at index 0 in buffer A
                    return MEMA[0];
                }   
            }
        }
    }
};
var HEADLOC = function () {
if (HEAD[7]){                     //xxxxxxx1
        if (HEAD[6]){             //xxxxxx11
            if (HEAD[5]){         //xxxxx111 *   head at index 7 
                if (HEAD[4]){     //xxxx1111 **  head at index 7 in buffer B 
                    return ['B', 7];  
                } else {                                  //xxxx0111 **  head at index 7 in buffer A
                    return ['A', 7];
                }      
            } else {                                      //xxxxx011 *   head at index 3 
                if (HEAD[4]){     //xxxx1011 **  head at index 3 in buffer B 
                    return ['B',3];   
                } else {                                  //xxxx0011 **  head at index 3 in buffer A
                    return ['A',3];
                }
            }
        } else {                                          //xxxxxx01
            if (HEAD[5]){         //xxxxx101 *   head at index 5 
                if (HEAD[4]){     //xxxx1101 **  head at index 5 in buffer B 
                    return ['B',5];        
                } else {                                  //xxxx0101 **  head at index 5 in buffer A
                    return ['A',5];
                }    
            } else {                                      //xxxxx001 *   head at index 1 
                if (HEAD[4]){     //xxxx1001 **  head at index 1 in buffer B 
                    return ['B',1];        
                } else {                                  //xxxx0001 **  head at index 1 in buffer A
                    return ['A',1];
                }   
            }
        }
    } else {
        if (HEAD[6]){             //xxxxxx10
            if (HEAD[5]){         //xxxxx110 *  head at index 6 
                 if (HEAD[4]){    //xxxxx111 *  head at index 6 in buffer B 
                    return ['B',6];     
                } else {                                  //xxxxx011 *  head at index 6 in buffer A
                    return ['A',6];
                }         
            } else {                                      //xxxxx010 *  head at index 2 
                 if (HEAD[4]){    //xxxxx111 *  head at index 2 in buffer B 
                    return ['B',2];     
                } else {                                  //xxxxx011 *  head at index 2 in buffer A
                    return ['A',2];
                }       
            }
        } else {                                          //xxxxxx00 * 
            if (HEAD[5]){         //xxxxx100 *  head at index 4 
                 if (HEAD[4]){    //xxxxx111 *  head at index 4 in buffer B 
                    return ['B',4];
                } else {                                  //xxxxx011 *  head at index 4 in buffer A
                    return ['A',4];
                }   
            } else {                                      //xxxxx000 *  head at index 0 
                if (HEAD[4]){     //xxxx1000 *  head at index 0 in buffer B 
                    return ['B',0];  
                } else {                                  //xxxx0000 *  head at index 0 in buffer A
                    return ['A',0];
                }   
            }
        }
    }
};

var WRITE = function (num   /* 0 xor 1 */){
    var headloc = HEADLOC();
    if (headloc[0] === 'A'){
        MEMA[headloc[1]] = num;
    } else {
        MEMB[headloc[1]] = num;
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

var LEFT = function ()  {
if (HEAD[7]){                     //xxxxxxx1
        if (HEAD[6]){             //xxxxxx11
            if (HEAD[5]){         //xxxxx111 *   head at index 7 
                if (HEAD[4]){     //xxxx1111 **  head at index 7 in buffer B 
                    HEAD[7] = 0;
                    return ['B', 6]; 
                } else {                                  //xxxx0111 **  head at index 7 in buffer A
                    HEAD[7] = 0;
                    return ['A', 6];
                }      
            } else {                                      //xxxxx011 *   head at index 3 
                if (HEAD[4]){     //xxxx1011 **  head at index 3 in buffer B 
                    HEAD[7] = 0;
                    return ['B', 2];    
                } else {                                  //xxxx0011 **  head at index 3 in buffer A
                    HEAD[7] = 0;
                    return ['A', 2];
                }
            }
        } else {                                          //xxxxxx01
            if (HEAD[5]){         //xxxxx101 *   head at index 5 
                if (HEAD[4]){     //xxxx1101 **  head at index 5 in buffer B 
                    HEAD[7] = 0;
                    return ['B', 4];        
                } else {                                  //xxxx0101 **  head at index 5 in buffer A
                    HEAD[7] = 0;
                    return ['A', 4];
                }    
            } else {                                      //xxxxx001 *   head at index 1 
                if (HEAD[4]){     //xxxx1001 **  head at index 1 in buffer B 
                    HEAD[7] = 0;
                    return ['B', 0];        
                } else {                                  //xxxx0001 **  head at index 1 in buffer A
                    HEAD[7] = 0;
                    return ['A', 0];
                }   
            }
        }
    } else {
        if (HEAD[6]){             //xxxxxx10
            if (HEAD[5]){         //xxxxx110 *  head at index 6 
                 if (HEAD[4]){    //xxxx1110 **  head at index 6 in buffer B 
                    HEAD[6] = 0;
                    HEAD[7] = 1;
                    return ['B', 5];     
                } else {                                  //xxxx0110 **  head at index 6 in buffer A
                    HEAD[6] = 0;
                    HEAD[7] = 1;
                    return ['A', 5];
                }         
            } else {                                      //xxxxx010 *  head at index 2 
                 if (HEAD[4]){    //xxxx1010 **  head at index 2 in buffer B 
                    HEAD[6] = 0;
                    HEAD[7] = 1;
                    return ['B', 1];     
                } else {                                  //xxxx0010 **  head at index 2 in buffer A
                    HEAD[6] = 0;
                    HEAD[7] = 1;
                    return ['A', 1];
                }       
            }
        } else {                                          //xxxxxx00 * 
            if (HEAD[5]){         //xxxxx100 *  head at index 4 
                 if (HEAD[4]){    //xxxx1100 *  head at index 4 in buffer B 
                    HEAD[5] = 0;
                    HEAD[6] = 1;
                    HEAD[7] = 1;
                    return ['B', 3];
                } else {                                  //xxxx0100 *  head at index 4 in buffer A
                    HEAD[5] = 0;
                    HEAD[6] = 1;
                    HEAD[7] = 1;
                    return ['A', 3];
                    
                }   
            } else {                                      //xxxxx000 *  head at index 0 
                if (HEAD[4]){     //xxxx1000 *  head at index 0 in buffer B 
                    HEAD[4] = 0;
                    HEAD[5] = 1;
                    HEAD[6] = 1;
                    HEAD[7] = 1;
                    return ['A', 7];                                  //xxxx0000 **  head at index 0 in buffer A
                } else {
                    HEAD[4] = 1;
                    HEAD[5] = 1;
                    HEAD[6] = 1;
                    HEAD[7] = 1;
                    return ['B', 7]; 
                }   
            }
        }
    }
};


var RIGHT = function ()  {
if (HEAD[7]){                     //xxxxxxx1
        if (HEAD[6]){             //xxxxxx11
            if (HEAD[5]){         //xxxxx111 *   head at index 7 
                if (HEAD[4]){
                    HEAD[4] = 0;
                    HEAD[5] = 0;
                    HEAD[6] = 0;
                    HEAD[7] = 0;
                    return ['A', 0];                      //xxxx1111 **  head at index 7 in buffer B  
                } else {                                  //xxxx0111 **  head at index 7 in buffer A
                    HEAD[4] = 1;
                    HEAD[5] = 0;
                    HEAD[6] = 0;
                    HEAD[7] = 0;
                    return ['B', 0];
                }      
            } else {                                      //xxxxx011 *   head at index 3 
                if (HEAD[4]){     //xxxx1011 **  head at index 3 in buffer B 
                    HEAD[5] = 1;
                    HEAD[6] = 0;
                    HEAD[7] = 0;
                    return ['B', 4];    
                } else {                                  //xxxx0011 **  head at index 3 in buffer A
                    HEAD[5] = 1;
                    HEAD[6] = 0;
                    HEAD[7] = 0;
                    return ['A', 4];
                }
            }
        } else {                                          //xxxxxx01
            if (HEAD[5]){         //xxxxx101 *   head at index 5 
                if (HEAD[4]){     //xxxx1101 **  head at index 5 in buffer B 
                    HEAD[6] = 1;
                    HEAD[7] = 0;
                    return ['B', 6];        
                } else {                                  //xxxx0101 **  head at index 5 in buffer A
                    HEAD[6] = 1;
                    HEAD[7] = 0;
                    return ['A', 6];
                }    
            } else {                                      //xxxxx001 *   head at index 1 
                if (HEAD[4]){     //xxxx1001 **  head at index 1 in buffer B 
                    HEAD[6] = 1;
                    HEAD[7] = 0;
                    return ['B', 2];        
                } else {                                  //xxxx0001 **  head at index 1 in buffer A
                    HEAD[6] = 1;
                    HEAD[7] = 0;
                    return ['A', 2];
                }   
            }
        }
    } else {
        if (HEAD[6]){             //xxxxxx10
            if (HEAD[5]){         //xxxxx110 *  head at index 6 
                 if (HEAD[4]){    //xxxx1110 **  head at index 6 in buffer B 
                    HEAD[7] = 1;
                    return ['B', 7];     
                } else {                                  //xxxx0110 **  head at index 6 in buffer A
                    HEAD[7] = 1;
                    return ['A', 7];
                }         
            } else {                                      //xxxxx010 *  head at index 2 
                 if (HEAD[4]){    //xxxx1010 **  head at index 2 in buffer B 
                    HEAD[7] = 1;
                    return ['B', 3];
                } else {                                  //xxxx0010 **  head at index 2 in buffer A
                    HEAD[7] = 1;
                    return ['A', 3];
                }       
            }
        } else {                                          //xxxxxx00 * 
            if (HEAD[5]){         //xxxxx100 *  head at index 4 
                 if (HEAD[4]){    //xxxx1100 *  head at index 4 in buffer B 
                    HEAD[7] = 1;
                    return ['B', 5];
                } else {                                    //xxxx0100 *  head at index 4 in buffer A
                    HEAD[7] = 1;
                    return ['A', 5];
                }   
            } else {                                      //xxxxx000 *  head at index 0 
                if (HEAD[4]){     //xxxx1000 *  head at index 0 in buffer B 
                    HEAD[7] = 1;
                    return ['B', 1];
                } else {                                  //xxxx0000 **  head at index 0 in buffer A
                    HEAD[7] = 1;
                    return ['A', 1];
                }   
            }
        }
    }
};


//change the state of the register by incrementing a given register property
//performs a binary add one operation (will overflow register)
var PROPINC = function (regProp){  
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
var PROPDEC = function (regProp){ 
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
var PROPVAL = function (regProp){ 
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

var PROPRESET = function (regProp){
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

var RESETAUX = function () {
    PROPRESET(AUX1);
    PROPRESET(AUX2);
    return 1;
}






