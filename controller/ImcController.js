class ImcController {
    constructor() {
        this.service = new ImcService();
    }

    async getImcTable() {
        return await this.service.getImcTable();
    }

    async calculateImc(person) {
        return await this.service.calculate(person);
    }
}
