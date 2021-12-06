var el = function() {}

el.prototype.Config = function(options) {
    for (var key in options) {
      this[key] = options[key]
    }
}

window.EL = new el()

function getQueryStr(str, url) {
    var LocString = String(
        url != undefined ? url : window.document.location.href
    );
    var rs = new RegExp("(^|)" + str + "=([^&]*)(&|$)", "gi").exec(LocString),
        tmp;
    if ((tmp = rs)) return decodeURIComponent(tmp[2]);
    return "";
}

EL.Config({
    subToken: getQueryStr("subToken"),
    id: getQueryStr("id")
})