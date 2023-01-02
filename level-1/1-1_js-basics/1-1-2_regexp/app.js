const emails = [
    /* Valid */
    "firstpart@secondpart.end",
    "fi@secondpart.end",
    "first-part@.se=cond%p.art.end",
    "first.part@se=cond%part.r",

    /* Invalid */
    "f@secondart.end",
    "first-part@.se=cond@part.end",
    "-firstpart@.se=cond%.enddeded",
    "firs_tpart@.se.en",
    "firstpart@.se.enddeded"
];

const Validator = {
    validateEmail(string) {
        const emailPattern = /\b(^[^.+-][a-zA-Z0-9.+-]{1,20})@([\w.!$%&'*+/=?^-]{1,15})\.([a-z]{1,5})\b/g
        return emailPattern.test(string);
    }
}

for (let email of emails) {
    console.log(email + ": " + Validator.validateEmail(email));
}
