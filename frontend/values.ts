export type ValueType = "null" | "number"

export interface RuntimeVal {
    type: ValueType;
}

export interface NullValue extends RuntimeVal {
    type: "null";
    value: "null"
}

export interface NumberValue extends RuntimeVal{
    type: "number";
    value: number
}