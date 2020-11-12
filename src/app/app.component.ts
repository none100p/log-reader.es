import { Component } from "@angular/core";
import { log } from "../assets/log";

@Component({
  selector: "app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "log-reader";
  result: Map<string, number>;
  total = 0;

  constructor() {
    this.parse();
  }

  parse(): void {
    // cleanup some unnecessary strings which can accidentally come into log
    let cleanLog = log.replace('Linting "bi-box2"...\n', "");
    cleanLog = cleanLog.replace('Linting "bi-box2-e2e"...\n', "");
    cleanLog = cleanLog.replace(
      "Lint warnings found in the listed files.\n",
      ""
    );
    cleanLog = cleanLog.replace(
      " Lint errors found in the listed files.\n",
      ""
    );
    cleanLog = cleanLog.replace("error Command failed with exit code 1.\n", "");
    cleanLog = cleanLog.replace(
      "info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.\n",
      ""
    );

    const splitLog = cleanLog.split("\n");
    this.result = new Map();
    let splitLine;

    splitLog.forEach(line => {
      splitLine = line.split(":");
      if (splitLine.length > 1) {
        const current = parseInt(splitLine[1], 10);
        this.result.set(
          splitLine[0],
          (this.result.get(splitLine[0]) | 0) + current
        );
        this.total += current;
      }
    });
  }
}
