import DataStoreItem from './DataStoreItem';
import Objects from './Objects';
export default class DataStore extends Objects {
    constructor(className, ncmb) {
        super();
        this.className = className;
        this.ncmb = ncmb;
        this.query = {};
        this.conditions = {
            limit: 20
        };
    }
    item(fields) {
        return new DataStoreItem(this.className, this.ncmb, fields);
    }
    equalTo(key, value) {
        return this.setOperand(key, value);
    }
    notEqualTo(key, value) {
        return this.setOperand(key, value, "$ne");
    }
    lessThan(key, value) {
        return this.setOperand(key, value, "$lt");
    }
    lessThanOrEqualTo(key, value) {
        return this.setOperand(key, value, "$lte");
    }
    greaterThan(key, value) {
        return this.setOperand(key, value, "$gt");
    }
    greaterThanOrEqualTo(key, value) {
        return this.setOperand(key, value, "$gte");
    }
    in(key, values) {
        if (!Array.isArray(values))
            throw new Error('Values must be array.');
        return this.setOperand(key, values, "$in");
    }
    notIn(key, values) {
        if (!Array.isArray(values))
            throw new Error('Values must be array.');
        return this.setOperand(key, values, "$nin");
    }
    exists(key, exist) {
        if (typeof exist === "undefined")
            exist = true;
        if (typeof exist !== "boolean")
            throw new Error('Exist must be boolean.');
        return this.setOperand(key, exist, "$exists");
    }
    regularExpressionTo(key, regex) {
        if (typeof regex !== "string")
            throw new Error('Regular expression must be string');
        return this.setOperand(key, regex, "$regex");
    }
    inArray(key, values) {
        if (!Array.isArray(values))
            values = [values];
        return this.setOperand(key, values, "$inArray");
    }
    notInArray(key, values) {
        if (!Array.isArray(values))
            values = [values];
        return this.setOperand(key, values, "$ninArray");
    }
    allInArray(key, values) {
        if (!Array.isArray(values))
            values = [values];
        return this.setOperand(key, values, "$all");
    }
    setOperand(key, value, operand) {
        if (typeof key !== "string") {
            throw new Error("Key must be string.");
        }
        if (value instanceof Date) {
            value = {
                __type: "Date",
                iso: value.toJSON()
            };
        }
        if (!this.query.where)
            this.query.where = {};
        if (operand === undefined) {
            this.query.where[key] = value;
            return this;
        }
        this.query.where[key] = this.query.where[key] || {};
        this.query.where[key][operand] = value;
        return this;
    }
    limit(number) {
        this.conditions.limit = number;
        return this;
    }
    fetchAll() {
        return this.search({
            where: this.query.where,
            limit: this.conditions.limit,
            className: this.className
        })
            .then((ary) => {
            let results = [];
            for (let data of ary.results) {
                results.push(new DataStoreItem(this.className, this.ncmb, data));
            }
            return results;
        });
    }
}
//# sourceMappingURL=DataStore.js.map