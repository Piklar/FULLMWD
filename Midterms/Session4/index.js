// FROM NATE KASI NAWALA KO SAKIN :(((
// ARRAY
let grade1 = 80;
let grade2 = 80;
let grade3 = 80;
let grade4 = 80;
let grade5 = 80;
console.log(grade1);

let grades = [90,91,88,100];
console.log(grades);

let mixedArray = ["John", 16, true, null];
console.log(mixedArray);

// ROBINS
let robins = ["Dick Grayson", "Jason Todd", "Damien Wayne"];
console.log(robins[0]);
console.log(robins[1]);
console.log(robins[2]);
console.log(robins[3]);

// UPDATE
robins[1] = "Red Hood";
console.log(robins);

// ADD
robins[3] = "Tim Drake";
console.log(robins);

// ADD TO THE END
robins[robins.length] = "Barbara Gordon";
console.log(robins);

// UPDATE THE LAST
robins[robins.length-1] = "Carrie Kelley";
console.log(robins);

// ARRAYS THEM OUT
for(let x= 0; x < robins.length; x++){
    console.log(robins[x]);
}



// 
let friends =[];

function showFriends(){
    console.log(friends);
}

function addFriend(name){

    for(let x = 0; x <= friends.length; x++){
        if(friends[x] == name.toUpperCase()){
            console.log("You are already friends with "+ name);
        }else{
            friends[friends.length] = name.toUpperCase();
            console.log("Friend request sent to " + name);
            break;
        }
    }
}