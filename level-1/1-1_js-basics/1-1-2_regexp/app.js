const Validator = {
    validateEmail(string) {
        const emailPattern = /(^[^.+-][a-zA-Z0-9.+-]{1,20})@([\w.!$%&'*+/=?^-]{1,15})\.([a-z]{1,5})$/g
        return emailPattern.test(string);
    },

    validatePhone(string) {
        const phonePattern = /^([\s-]*\+[\s-]*3[\s-]*8[\s-]*)?[\s-]*\(?([\s-]*0[\s-]*\d[\s-]*\d[\s-]*)\)?([\s-]*\d{1}[\s-]*\d{1}[\s-]*\d{1}[\s-]*\d{1}[\s-]*\d{1}[\s-]*\d{1}[\s-]*\d{1}[\s-]*)$/g;
        return phonePattern.test(string);
    }
}

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

const phones = [
    /* Valid */
    "+38 (099) 567 8901",
    "+38 099 5 6 7 8 9  01",
    "(09-9) 567-890-1",
    "--  (099) 567 890-1",

    /* Invalid */
    "+38 (099) 567 8901 0",
    "+38 099 a0000000",
    "38 (0989) 567 8901",
    "+48 (0989) 567 8901"
];

for (let email of emails) {
    console.log((Validator.validateEmail(email) ? "[+] " : "[-] ") + email);
}

for (let phone of phones) {
    console.log((Validator.validatePhone(phone) ? "[+] " : "[-] ") + phone);
}
