"use strict";
const plugins = require("./npmdocker.plugins");
let config = plugins.npmextra.dataFor({
    toolName: "npmdocker",
    defaultSettings: {},
    cwd: ""
});
exports.run = () => {
    let done = plugins.q.defer();
    done.resolve(config);
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWRvY2tlci5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUFHL0MsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7SUFDbEMsUUFBUSxFQUFDLFdBQVc7SUFDcEIsZUFBZSxFQUFFLEVBQUU7SUFDbkIsR0FBRyxFQUFFLEVBQUU7Q0FDVixDQUFDLENBQUM7QUFFUSxXQUFHLEdBQUc7SUFDYixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFBIn0=