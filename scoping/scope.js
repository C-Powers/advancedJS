//TODO: Basic Scope
/*

scope: where to look for things

-what are the things? Variables
-who is doing the looking?
-at least in es5, the smallest scope is the function
*/

var foo = "bar";

function bar() {
  var foo = "baz";
}

function baz(fo) {
  foo="bam";
  bam="yay";
  //  compiler checks in local scope baz to see if
  //    bam was defined. It wasnt.
  //    It then goes to the next outside scope
  //    (in this case the global)
  //    and the global says "no", but Ill make one
  //  This is an example of global scope leakage.
}

/*

compiler first goes through the code,
  and looks at all the var/function declarations.


*/

var foo = "bar";

function bar() {
  var foo = "baz";

  function baz(foo) {
    foo = "bam";
    bam = "yay";
  }
  baz();
}

bar();  /* compiler: "i have a RHS reference to a variable called bar"
            local variable foo found, first come first served
            baz(): "scope of bar, i have an RHS reference to a variable named baz"
              baz executed: "I have a LHS for a variable named foo", a: "yes, in the scope of baz (it's a function parameter)"
                            "Hey scope of baz, I have a LHS for a variable named bam", a: no
                              "Hey scope of bar..." a: no
                                "Hey global..." a: yes, i just made it
        */
foo;    // Q: "hey global scope, i have an RHS reference to a variable named foo" A:"bar"
bam;    // Q: "hey global scope, i have an RHS..... variable named bam" A:"yay"
baz();  // Q: "hey global scope...." A: No -> reference error


/*
  bar() is a RHS reference, because it is not a LHS...
    it's not being assigned, it's being used.

*/

/*================================================= */
//TODO: function scope. Function declarations vs Function expressions. Block Scope.
/*================================================= */

var foo = function bar() { //this is a function expression! Is the function keyword the first word in the statement? no
  var foo = "baz";

  function baz(foo) {
    foo = bar;
    foo;    //  function
  }
  baz();
};

foo();
bar();    // Reference Error

/*
  expressions are often used as anonymous functions.
    Our example is a named function expression.
    Function expressions do not get declared in the outer scope.
    Only declared in local scope.
    tldr: function declarations are declared in outer scope.
          function expressions are decared in local scope.

    why anon functions are bad:
      1) Cannot reference self inside of function, ie, no this binding
      2) Difficult to debug, only 'anonymous function' returned when referencing error
        names are used in debug stack trace
      3) Self documents code
*/

// block scope ----
//  variable only exists in catch clause

var foo;

try {
  foo.length;
} catch (err) {
  console.log(err); // TypeError
}

console.log(err); // ReferenceError



/*================================================= */
//TODO: Lexical scope
/*================================================= */

//lexical: refers to the parsing stage called 'lexing'.
  //lexing means essentially "compiling scope". Compiler decides what the scope is


//eval == evil
var bar = "bar";

function foo(str) {
  eval(str); // CHEATING! Modifies current lexical scope of foo during runtime
              //    Compiler assumes that it cannot optimize the lookups, and the code runs slower
  console.log(bar) // 42
}

foo("var bar = 42;");

/*================================================= */
//TODO: function scope
/*================================================= */

//IIFE pattern

var foo = "foo";

(function() {
  var foo = "foo2";
  console.log(foo); //  "foo2"
})();
//  this makes it a function expression (because function isnt the first character/command)
//  then we execute it immediately
//  creates a local function scope

console.log(foo); //  "foo"

/*
IIFE's are great ways to privatize some functions.
You can wrap all your code in an IIFE
*/

var foo = "foo";

(function(bar) {

  var foo = bar;
  console.log(foo); //  "foo"
})(foo);

console.log(foo); //  "foo"
