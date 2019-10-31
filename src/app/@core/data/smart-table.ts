
export abstract class SmartTableData {
  abstract getData(): any[];
  abstract saveData(obj: any);
  abstract delete(id);
}
