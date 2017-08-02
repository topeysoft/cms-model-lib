import { GridDefinitionItem } from "./grid-definition-item";

export class GridDefinition {
    /**
     *
     */
    constructor() {
        this.xl=new GridDefinitionItem
        this.lg=new GridDefinitionItem
        this.md=new GridDefinitionItem
        this.sm=new GridDefinitionItem
        this.xs=new GridDefinitionItem
        this.pt=new GridDefinitionItem
    }
    xs?: GridDefinitionItem = new GridDefinitionItem;
    sm?: GridDefinitionItem = new GridDefinitionItem;
    md?: GridDefinitionItem = new GridDefinitionItem;
    lg?: GridDefinitionItem = new GridDefinitionItem;
    xl?: GridDefinitionItem = new GridDefinitionItem;
    pt?: GridDefinitionItem = new GridDefinitionItem;
}