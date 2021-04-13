export default class ImcController {
    constructor() {
    }

    async getImcTable() {
        const { default: ImcService } = await import('../services/ImcService.js');
        return await new ImcService().getImcTable();
    }

    async calculateImc(person) {
        const { default: ImcService } = await import('../services/ImcService.js');
        return await new ImcService().calculate(person);
    }
}
