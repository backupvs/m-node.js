const csv = `44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575,#некоммент

#
46.49,36.58,#Бердянськ,121692,
49.15,28.41,Вінниця,356665,
#45.40,34.29,Джанкой,43343,`

function makeReplacer(csv) {
    const top = csv
        .split("\n")
        .filter(line => /^\d+.\d+\,\d+.\d+\,[а-яієґ\s]+\,\d+\,/gi.test(line))
        .map(line => {
            line = line.split(",");
            return { x: line[0], y: line[1], name: line[2], population: line[3] };
        })
        .sort((a, b) => b.population - a.population)
        .slice(0, 10)
        .reduce((obj, entry, index) => Object.assign(obj, { [entry.name]: {
            population: entry.population,
            rating: index + 1
        }}), {});

    return function(text) {
        const regexp = new RegExp(Object.keys(top).join("|"), "g");
        return text.replace(regexp, match => 
            `${match} (${top[match].rating} місце в ТОП-10 найкрупніших міст України, населення ${top[match].population} чоловік)`);
    }
}

const replaceWithTop = makeReplacer(csv);

let text = `Протягом 2018 - 2020 рр. до міста Вінниця були приєднані села:
Десна, Стадниця, Малі та Великі Крушлинці, Гавришівка, Вінницькі Хутори
та утворено адміністративну одиницю - Вінницьку міську територіальну громаду.`;

text = replaceWithTop(text);
console.log(text);
