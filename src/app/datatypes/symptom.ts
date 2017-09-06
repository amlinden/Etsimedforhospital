export class Symptom {

    //Declaration and Default value
    public positive: boolean = false;

    constructor(
        public id: object,
        public name: object,
        positive?
    ) {
        this.id = id;
        this.positive = positive;
        this.name = name;
    }
}
export class Symptoms{
    constructor(
        public symptomArray? :Array<Symptom>
    ) {
        this.symptomArray = symptomArray;
    }
}