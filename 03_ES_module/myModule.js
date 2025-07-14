//named export
export const a = 1;
export const b = 2;
export function sayHello(){
    console.log("Hello");
}

//default export
//no curly braces in import
const  obj = {
    a:1,
    b:2
}
// export default obj;
export default {
    a:1,
    b:2
};
// export default function(){
//     console.log("default hello");
// }