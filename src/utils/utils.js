export function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  } else {
    return null
  }
}

export const getLocalStorage = (...args) => {
  const storage = {}
  args.forEach(arg => {
    storage[arg] = window.localStorage.getItem(arg) || null
  })
  return storage
}

export const setLocalStorage = data => {
  Object.keys(data).forEach(prop => {
    const el = data[prop]
    window.localStorage.setItem(prop, el)
  })
}

export const removeLocalStorage = (...args) => {
  args.forEach(arg => {
    window.localStorage.removeItem(arg)
  })
}

export const tdist = {
  210184: ['沈北新区', '210100'],
  210185: ['其它区', '210100'],
  420381: ['丹江口市', '420300'],
  420383: ['其它区', '420300'],
  420382: ['城区', '420300'],
  210182: ['浑南新区', '210100'],
  140800: ['运城市', '140000'],
  210183: ['张士开发区', '210100'],
  140802: ['盐湖区', '140800'],
  210181: ['新民市', '210100'],
  140829: ['平陆县', '140800'],
  210203: ['西岗区', '210200'],
  140828: ['夏县', '140800'],
  210202: ['中山区', '210200'],
  140830: ['芮城县', '140800'],
  210200: ['大连市', '210000'],
  140825: ['新绛县', '140800'],
  140824: ['稷山县', '140800'],
  140827: ['垣曲县', '140800'],
}

tdist.getLev1 = function() {
  for (var t = [], e = 1; e < 100; e++) {
    var i = '0000'
    i = e < 10 ? '0' + e + i : e + i
    var n = this[i]
    'undefined' != typeof n &&
      t.push({
        id: i,
        text: n[0],
      })
  }
  return t
}

tdist.getLev2 = function(t) {
  if ('' == t) return []
  for (var e = [], i = 1; i < 100; i++) {
    var n = t.substr(0, 2)
    n += i < 10 ? '0' + i + '00' : i + '00'
    var r = this[n]
    'undefined' != typeof r &&
      e.push({
        id: n,
        text: r[0],
      })
  }
  return e
}

tdist.getLev3 = function(t) {
  if ('' == t) return []
  for (var e = [], i = 1; i < 100; i++) {
    var n = t.substr(0, 4)
    n += i < 10 ? '0' + i : i
    var r = this[n]
    'undefined' != typeof r &&
      e.push({
        id: n,
        text: r[0],
      })
  }
  return e
}

// tdist.getParent = function(t) {
//   var e = this[t][1];
//   return this[e]
// }

// tdist.getLev1Html = function(t) {
//   var e = "请选择";
//   t && (e = t);
//   for (var i = this.getLev1(), n = ["<option value=''>" + e + "</option>"], r = 0, o = i.length; r < o; r++) {
//       var v = i[r];
//       n.push('<option value="' + v.id + '">' + v.text + "</option>")
//   }
//   return n.join("")
// }

// tdist.getLev2Html = function(t, e) {
//   var i = "请选择";
//   e && (i = e);
//   for (var n = this.getLev2(t), r = ["<option value=''>" + i + "</option>"], o = 0, v = n.length; o < v; o++) {
//       var u = n[o];
//       r.push('<option value="' + u.id + '">' + u.text + "</option>")
//   }
//   return r.join("")
// }

// tdist.getLev3Html = function(t) {
//   for (var e = this.getLev3(t), i = ["<option value=''>请选择</option>"], n = 0, r = e.length; n < r; n++) {
//       var o = e[n];
//       i.push('<option value="' + o.id + '">' + o.text + "</option>")
//   }
//   return i.join("")
// }
