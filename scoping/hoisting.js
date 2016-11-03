/*
Hoisting is the moving of declarations to the top of the
scope block during the compiling phase.
Hoisting applies to both variable declarations and functions.
*/

// IT IS JUST A MENTAL CONSTRUCT

a;    //  ?? undefined
b;    //  ?? undefined
var a = b;
var b = 2;
b;    // 2
a;    // ?? undefined


/*
  Q: How would this code run? a or b are not declared first.
  A: It would go through and compile before execution.
      Declarations are "hoisted" to the top of the code.
      LHS stuff happening at compile time, RHS is happening at run time.
    This is called hoisting, and can be viewed like so:
*/

var a;
var b;
a;
b;
a=b;
b=2;
b;
a;


//hoisting also happens for funtions!

var a = b();
var c = d();
a;            //  ?? undefined
c;            //  ?? undefined

function b () {
  return c;
}

var d = function () {
  return b();
};

/*
  Function expressions do not get hoised as function/variable declarations do
  View the code as:
*/

function b() {
  return c; // c returns undefined as of line a = b();
}
var a;
var c;
var d;
a = b();
c = d();
a;    // ??
c;    // ??
d = function() {
  return b();
}


/*
  How do we know that functions are hoisted before variables?
  It is possible to prove
*/

foo(); // "foo"

var foo = 2;

function foo() {
  console.log("bar");
}

function foo() {
  console.log('foo');
}

/*
CAUTION with hoisting... let does not hoist
*/
