// 1. 

function getFirstWord(a: string): number {
	return a.split(/ +/)[0].length;
}

// 2. 

function getUserNamings(a: { name: string, surname: string }): { fullname: string, initials: string } {
  return { 
		fullname: a.name + " " + a.surname, 
		initials: a.name[0] + "." + a.surname[0] 
	};
}

// 3. 

function getAllProductNames(a?: { products?: { name: string }[] }): string[] {
  return a?.products?.map(prod => prod?.name) || [];
}

// 4.1

// easy way is using 'as' keyword
// hard way is ?...
function hey1(a: { name: () => string, cuteness?: number, coolness?: number }): string {
    return "hey! i'm " + a.name();
}
hey1({name: () => "roma", cuteness: 100});
hey1({name: () => "vasya", coolness: 100});

// 4.2

/**
 * Abstract class Pet
 * 
 * @class
 * @abstract
 */
abstract class abstractPet {
    private _name: string;
    
    constructor(name: string) {
        this._name = name;
    }

    public name() {
        return this._name;
    }
}

/**
 * Class Dog
 * 
 * @class
 * @extends {abstractPet}
 */
class Dog extends abstractPet {
    private _cutenessLevel: number;

    constructor(name: string, cutenessLevel: number) {
        super(name);
        this._cutenessLevel = cutenessLevel;
    }
}

/**
 * Class Cat
 * 
 * @class
 * @extends {abstractPet}
 */
class Cat extends abstractPet {
    private _isVaccinated: boolean;

    constructor(name: string, isVaccinated: boolean) {
        super(name);
        this._isVaccinated = isVaccinated;
    }
}

function hey2(abstractPet: abstractPet): string {
    return "hey! i'm " + abstractPet.name();
}

let a = new Cat("myavchik", true);
let b = new Dog("gavchik", 333);
hey2(a);
hey2(b);

// 4.3

function hey3(a: { name: () => string, type: string, cuteness?: number, coolness?: number }): string {
    return "hey! i'm " + a.name() + " "
		 + (a.type === "cat" ? ("cuteness: "+a.cuteness) : ("coolness: "+a.coolness));
}

hey3({name: () => "roma", type: "cat", cuteness: 100});
hey3({name: () => "vasya", type: "dog", coolness: 100});

// 5.

// google for Record type
function stringEntries(a: string[] | Record<string, any>): string[] {
   return Array.isArray(a) ? a : Object.keys(a);
}

// 6.

async function world(a: number): Promise<string> {
    return "*".repeat(a);
}

const hello = async ():Promise<string> => {
   return await world(10);
}

hello().then(r => console.log(r)).catch(e => console.log("fail"))