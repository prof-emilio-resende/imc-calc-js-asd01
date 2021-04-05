class ImcController {
    constructor() {
        this.service = new ImcService();
    }

    async getImcTable() {
        var tblObj = await this.service.getImcTable();
        if (tblObj) {
            var tbl = document.querySelector('#imcTable');
            tbl.innerHTML = '';

            Object.keys(tblObj).sort().forEach(k => {
                var newRow = tbl.insertRow(-1);
                var keyCell = newRow.insertCell(0);
                var keyText = document.createTextNode(tblObj[k]['minValue']);
                keyCell.appendChild(keyText);
                var newCell = newRow.insertCell(1);
                var valText = document.createTextNode(tblObj[k]['description']);
                newCell.appendChild(valText);
            });
        } else {
            // if there's a problem, we'll tell the user
            alert("Sorry, can't load the table");
        }
    }

    async calculateImc(person) {
        var response = await this.service.calculate(person);

        document
            .querySelector("#imc")
            .innerHTML = `<strong>${response.imc} - ${response.imcDescription}</strong>`;
    }
}
