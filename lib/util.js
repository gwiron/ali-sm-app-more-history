export default {
  flat: function (param) {
      var str = ""
      for (var key in param) {
          str += key + "=" + (param[key] != undefined ? encodeURIComponent(param[key]) : "") + "&"
      }
      return str.slice(0, -1);
  }
}
