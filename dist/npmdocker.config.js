"use strict";
const plugins = require("./npmdocker.plugins");
let config = plugins.npmextra.dataFor({
    toolName: "npmdocker",
    defaultSettings: {
        baseImage: "hosttoday/ht-docker-node:npmts",
        command: "npm test"
    }
});
exports.run = () => {
    let done = plugins.q.defer();
    done.resolve(config);
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWRvY2tlci5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUFTL0MsSUFBSSxNQUFNLEdBQVcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7SUFDMUMsUUFBUSxFQUFDLFdBQVc7SUFDcEIsZUFBZSxFQUFFO1FBQ2IsU0FBUyxFQUFDLGdDQUFnQztRQUMxQyxPQUFPLEVBQUMsVUFBVTtLQUNyQjtDQUNKLENBQUMsQ0FBQztBQUVRLFdBQUcsR0FBRztJQUNiLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUEifQ==