import { BehaviorSubject } from "rxjs";
import { ContractDoc } from "./../../models/contract";
import { Component, Input, OnInit } from "@angular/core";
import { MethodDoc } from "../../models/contract";
import { EthersService } from "../../services/ethers.service";

@Component({
  selector: "contract-method",
  templateUrl: "./method.component.html",
  styleUrls: ["./method.component.css"]
})
export class MethodComponent implements OnInit {
  @Input()
  method: MethodDoc;
  @Input()
  contract: ContractDoc;

  public code: string;
  public result: any;
  public params: any[];
  public paramColumns = ['name', 'type', 'description', 'input'];

  constructor(private ethers: EthersService) {}

  ngOnInit() {
    this.updateFile();
  }

  public execMethod() {
    console.log('exec', this.ethers);
  }

  public updateFile() {
    this.code = this.getMethodContent();
  }

  public getMethodContent() {
    const getPlaceholder = type => {
      switch (type) {
        case 'string':
          return '"Lorem Ipsum"';
        // TODO
      }
    };

    const paramNames = this.method.params.map(param => param.name).join(", ");
    const params = this.method.params
      .map(param => {
        const description = param.description
          ? `\t// ${param.name} : ${param.description}`
          : "";
        const parameter = `const ${param.name} = ${JSON.stringify(
          param.value
        ) || getPlaceholder(param.type)};`;
        return parameter + description;
      })
      .join("\n");

    let result: string;
    if (this.method.constant) {
      const call = `const result = await ${this.contract.name}Contract.${
        this.method.name
      }(${paramNames});\n`;
      const description = this.method.return.description
        ? `// ${this.method.return.description}`
        : "";
      result = call + description;
    } else {
      result = `await ${this.contract.name}Contract.${
        this.method.name
      }(${paramNames});`;
    }

    return `// Inputs
${params}
// Outputs
${result}`;
  }
}
