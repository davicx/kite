import { continueStatement } from '@babel/types';
import { func } from 'prop-types';
import React, { useState, useRef } from 'react';

function Learning() {   
    const [items, setItems] = useState(["first"])
    const inputRef = useRef()

    //PLAYGROUND
    console.log("test")

    //THIS
    //This references 
    // method -> obj
    // function -> global (Window, global)
    const video = {

    }


    //CALL BIND APPLY
    //CALL (Attaches function to object)
    var obj = {
        num: 2
    }

    var obj2 = {
        num: 5
    }

    var addToThis = function(a) {
        return this.num + a;
    }

    //Call (input object and parameter)
    addToThis.call(obj, 3) //functionName.call(obj, functionArguments)
    //console.log(addToThis.call(obj, 3))    

    //APPLY (like call but can take array)
    var addApply = function(a,b,c) {
        return this.num + a + b + c;
    }
    var arr = [1,2,3]
    //console.log(addApply.apply(obj, arr))   

    //console.log(addApply.apply(obj, arr))  
    //console.log(addApply.apply(obj2, arr))  

    //BIND (gives a function that can run)
    var bound = addToThis.bind(obj);
    //console.log(bound(1))
    var bound = addApply.bind(obj);
    //console.log(bound(1,2,3))

    //HOISTING
    a = "a";

    const sumConst = (a,b) => a + b

    console.log("sumFunc " + sumFunc(1,2))
    console.log("sumConst " + sumConst(3,4))
    console.log(a)


    function sumFunc(a,b) {
        return a + b;
    }
    
    var a;

    





    return (
      <div className = "login">

      </div>
    );
  }

export default Learning;

