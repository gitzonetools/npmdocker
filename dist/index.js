"use strict";
const plugins = require("./npmdocker.plugins");
const promisechain = require("./npmdocker.promisechain");
promisechain.run()
    .then((configArg) => {
    if (configArg.exitCode == 0) {
        plugins.beautylog.success("Allright test in docker ran through");
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBWSxPQUFPLFdBQU0scUJBQXFCLENBQUMsQ0FBQTtBQUMvQyxNQUFZLFlBQVksV0FBTSwwQkFBMEIsQ0FBQyxDQUFBO0FBSXpELFlBQVksQ0FBQyxHQUFHLEVBQUU7S0FDYixJQUFJLENBQUMsQ0FBQyxTQUE4QjtJQUNqQyxFQUFFLENBQUEsQ0FBQyxTQUFTLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7UUFDeEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMscUNBQXFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==