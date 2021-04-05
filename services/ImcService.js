class ImcService {
    constructor() {
        this.hostname = "http://localhost:8080";
    }

    getImcTable() {
        var path = "/imc/table";

        return HttpClient
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

        return HttpClient
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
