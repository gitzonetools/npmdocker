"use strict";
const plugins = require("./npmdocker.plugins");
//modules
const ConfigModule = require("./npmdocker.config");
const DockerModule = require("./npmdocker.docker");
exports.run = () => {
    let done = plugins.q.defer();
    ConfigModule.run()
        .then(DockerModule.run)
        .then(done.resolve);
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtZG9ja2VyLnByb21pc2VjaGFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWRvY2tlci5wcm9taXNlY2hhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUFHL0MsU0FBUztBQUNULE1BQVksWUFBWSxXQUFNLG9CQUFvQixDQUFDLENBQUE7QUFDbkQsTUFBWSxZQUFZLFdBQU0sb0JBQW9CLENBQUMsQ0FBQTtBQUV4QyxXQUFHLEdBQUc7SUFDYixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLFlBQVksQ0FBQyxHQUFHLEVBQUU7U0FDYixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQztTQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQSJ9