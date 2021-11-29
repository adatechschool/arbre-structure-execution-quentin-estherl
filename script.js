function ping(ip, callback) {
  if (!this.inUse) {
    this.status = "unchecked";
    this.inUse = true;
    this.callback = callback;
    this.ip = ip;
    var _that = this;
    this.img = new Image();
    this.img.onload = function () {
      _that.inUse = false;
      _that.callback("responded");
    };
    this.img.onerror = function (e) {
      if (_that.inUse) {
        _that.inUse = false;
        _that.callback("responded", e);
      }
    };
    this.start = new Date().getTime();
    this.img.src = "http://" + ip;
    this.timer = setTimeout(function () {
      if (_that.inUse) {
        _that.inUse = false;
        _that.callback("timeout");
      }
    }, 1500);
  }
}

var PingModel = function (servers) {
  var self = this;
  var myServers = [];
  ko.utils.arrayForEach(servers, function (location) {
    myServers.push({
      name: location,
      status: ko.observable("unchecked"),
    });
  });
  self.servers = ko.observableArray(myServers);
  ko.utils.arrayForEach(self.servers(), function (s) {
    s.status("checking");
    new ping(s.name, function (status, e) {
      s.status(status);
    });
  });
};

var komodel = new PingModel([
  "https://www.netflix.com/fr/",
  "https://www.codecademy.com",
  "https://www.apple.com",
  "https://www.fnac.com",
  "https://www.welcometothejungle.com/fr",
  "https://www.primevideo.com/",
  "https://adatechschool.fr",
  "https://www.pole-emploi.fr/accueil/",
  "https://www.tf1.fr/",
  "https://www.caf.fr",
  "https://www.seloger.com",
  "https://developer.mozilla.org/fr/",
  "https://www.nike.com/fr/",
  "https://www.marmiton.org/ ",
  "https://fentybeauty.com",
  "https://www.backmarket.fr",
  "https://www.romeo.com",
  "https://www.jeuxvideo.com",
  "https://www.treatwell.fr/salon/soaddict-nails/",
  "https://www.adidas.fr/",
]);

ko.applyBindings(komodel);

var startTime = new Date().getTime();
function onLoadEventHandler() {
  var latency = new Date().getTime() - startTime;
  console.log("Latency = " + latency + "ms");
}

onLoadEventHandler();
