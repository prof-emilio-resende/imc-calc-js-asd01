import HttpClient from '../http/HttpClient.js';

export default class ImcService {
    constructor() {
        this.hostname = "http://localhost:8080";
        this.xhr = new HttpClient();
        this.get = new Proxy(this.xhr.get, {
            apply: function(target, thisArg, args) {
                console.log('target');
                console.log(target);
                console.log('thisArg');
                console.log(thisArg);
                console.log('args');
                console.log(args);
                console.log('chamando...');
                return target(...args);
            }
        });

        this.post = new Proxy(this.xhr.post, {
            apply: function(target, thisArg, args) {
                console.log('target');
                console.log(target);
                console.log('thisArg');
                console.log(thisArg);
                console.log('args');
                console.log(args);
                console.log('chamando...');
                return target(...args);
            }
        });
    }

    getImcTable() {
        var path = "/imc/table";

        return this
            .get(this.hostname, path)
            .then(rawObj =>
                Object.keys(rawObj)
                    .map(key => {
                        return {
                            minValue: key,
                            description: rawObj[key]
                        }
                    })
            )
            .catch(function(err){console.error("oh, well... I don't know what to say.", err)});
    }

    calculate(person) {
        var path = "/imc/calculate";

        return this
            .post(this.hostname, path, person.toObject())
            .then(rawObj => {
                console.log(rawObj);
                console.log("-----------");
                console.log(this);
                person.imc = rawObj.imc;
                person.imcDescription = rawObj.imcDescription;
                return person;
            });
    }
}
