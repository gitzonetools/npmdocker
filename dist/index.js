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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0NBQStDO0FBQy9DLHlEQUF5RDtBQUl6RCxZQUFZLENBQUMsR0FBRyxFQUFFO0tBQ2IsSUFBSSxDQUFDLENBQUMsU0FBOEI7SUFDakMsRUFBRSxDQUFBLENBQUMsU0FBUyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUN2RCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9