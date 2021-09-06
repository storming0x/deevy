declare module "leche" {
  export type DataValue = Array<any>;
  export type DataObject = {
    [key: string]: DataValue;
  };

  export function withData(data: DataObject, fn: any): void;
}
