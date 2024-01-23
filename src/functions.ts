export const sayHello = ({firstName, lastName, age} : {
    firstName: string;
    lastName: string;
    age?: number; // ? means optional
}) => {
    console.log(`Hello ${firstName});
}