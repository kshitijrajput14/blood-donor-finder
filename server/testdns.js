const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.blood-donor-finder-clus.bmmegoj.mongodb.net",
  (err, records) => {
    if (err) {
      console.error("DNS Error:", err);
    } else {
      console.log(records);
    }
  }
);