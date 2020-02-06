import {DocumentFIleExtensionEnum} from './DocumentFIleExtensionEnum';

export class DocumentFile {
  public name: string;
  public extention: string;
  public icon: string;

  constructor(name: string, extention: string) {
    this.name = `${name}.${extention}`;
    this.extention = extention;
    this.icon = DocumentFIleExtensionEnum[extention];
  }

}
