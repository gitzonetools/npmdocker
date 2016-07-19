"use strict";
const plugins = require("./npmdocker.plugins");
const promisechain = require("./npmdocker.promisechain");
promisechain.run()
    .then((configArg) => {
    if (configArg.exitCode == 0) {
        plugins.beautylog.success("container ended all right!");
    }
    else {
        plugins.beautylog.error("container ended with error!");
        process.exit(1);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBWSxPQUFPLFdBQU0scUJBQXFCLENBQUMsQ0FBQTtBQUMvQyxNQUFZLFlBQVksV0FBTSwwQkFBMEIsQ0FBQyxDQUFBO0FBSXpELFlBQVksQ0FBQyxHQUFHLEVBQUU7S0FDYixJQUFJLENBQUMsQ0FBQyxTQUE4QjtJQUNqQyxFQUFFLENBQUEsQ0FBQyxTQUFTLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7UUFDeEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEIsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=