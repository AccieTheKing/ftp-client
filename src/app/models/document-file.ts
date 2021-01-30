import { DocumentFIleExtensionEnum } from './DocumentFIleExtensionEnum';

export class DocumentFile {
  public name: string;
  public extention: string;
  public icon: string;

  constructor(name: string, extention: string, isOnServer: boolean) {
    this.name = `${name}.${extention}`;
    this.extention = extention;
    if (isOnServer) {
      // @ts-ignore
      this.icon = `https://images.acdaling.nl/${this.name}`;
    } else {
      this.icon = DocumentFIleExtensionEnum[extention];
    }

  }

}
