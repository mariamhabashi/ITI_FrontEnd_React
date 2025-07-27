//Task1
let name= "Mariam";
console.log("Your name is " + name);
let age=22;
console.log("Your age is " + age);
let isStudent=true;
console.log("Are you student? " + isStudent);

//Task2
let hight=4;
let width=5;
let area=hight*width;
console.log("The area of the rectangle is " + area);

//Task3
let score=87;
if(score>90){
    console.log("Grade A");
}
else if(score>80){
    console.log("Grade B");
}
else if(score>70){
    console.log("Grade C");
}
else if(score>60){
    console.log("Grade D");
}
else{
    console.log("Grade F");
}

//Task4
function findMax(a,b,c){
    if(a>b && a>c){
        return a;
    }
    else if(b>a && b>c){
        return b;
    }
    else{
        return c;
    }
}
console.log(findMax(2,6,89));
console.log(findMax(12,534,89));

