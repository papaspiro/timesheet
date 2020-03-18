// server/roles.js
const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
ac.grant("basic")
 .readOwn("timesheet")
 .updateOwn("timesheet")


ac.grant("worker")
 .extend("basic")
 .readAny("timesheet")


ac.grant("admin")
 .extend("basic")
 .extend("worker")
 .updateAny("timesheet")
 .deleteAny("timesheet")
 .updateAny("user")
 .deleteAny("user")
 .updateAny("worker")
 .deleteAny("worker")
 .updateAny("work")
 .deleteAny("work")
 .updateAny("workhours")
 .deleteAny("workhours")

return ac;
})();
