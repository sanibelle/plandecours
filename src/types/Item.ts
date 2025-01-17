import type { Category } from "./Week.js";
import type { Property } from "./Property.ts";

export interface Item {
    id: string
    points: number
    description: string
    image: string
    name: string
    category: Category
    propertyValues: PropertyValue[]
}

export interface PropertyValue {
    value: string
    property: Property
}