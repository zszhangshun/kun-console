/**
 * @param {string} method//get set
 * @param {object} params//{"user/{repository}":""}
 * @param {string} tokenkey//
 * @returns {token}//get
 * @private
 */
export function tokenCollec (method, params = {}, tokenkey = 'RepositoryToken') {
  const getCahceTokens = () =>
    JSON.parse(localStorage.getItem(tokenkey) || '{}')
  const setTokens = () => {
    const newToken = Object.assign(getCahceTokens(), params)
    localStorage.setItem(tokenkey, JSON.stringify(newToken))
  }
  const getToken = () => {
    return getCahceTokens()[params]
  }
  switch (method) {
    case 'get':
      return getToken()
    case 'set':
      setTokens()
      break
  }
}

export function toMillisecond (value) {
  let datetime = 0
  if (value.includes('m')) {
    datetime = value.slice(0, -1) * 60
  } else if (value.includes('h')) {
    datetime = value.slice(0, -1) * 3600
  } else if (value.includes('d')) {
    datetime = value.slice(0, -1) * 3600 * 24
  } else if (value.includes('s')) {
    datetime = value.slice(0, -1)
  }
  return datetime * 1000
}

export function toInterval (Millisecond) {
  if (!(typeof Millisecond === 'number')) {
    throw new Error('toInterval接收的类型不是一个数字')
  }
  let interval = '1m'
  if (Millisecond > 3600 * 24 * 1000) {
    interval = '1d'
  } else if (Millisecond > 2 * 3600 * 1000) {
    interval = '1h'
  }
  return interval
}
export function checkName (name) {
  return !/^[a-zA-Z0-9-]{1,63}$/.test(name)
}

export function canaryName (name) {
  return !/^[a-z]([-a-z0-9]*[a-z0-9])?$/.test(name)
}
export function isChart (name) {
  return !/[a-z]/.test(name)
}
// 域名名称正则

export function checkDomain (name) {
  const checkDomainName = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/
  return (rule, value, callback) => {
    if (value === '') {
      callback(new Error(`请输入${name}名称 `))
    } else if (!checkDomainName.test(value)) {
      callback(new Error(`名称不符合正则规则  ${checkDomainName}`))
    } else {
      callback()
    }
  }
}
export function checkCanary (name, len) {
  return (rule, value, callback) => {
    if (value === '') {
      callback(new Error(`请输入${name}名称 `))
    } else if (canaryName(value)) {
      callback(new Error('名称不符合正则规则  ^[a-z]([-a-z0-9]*[a-z0-9])?$'))
    } else if (value.length > len) {
      callback(new Error(`名称长度不能超过${len}个字符`))
    } else {
      callback()
    }
  }
}
function mGetDate (date) {
  const year = date.getFullYear()
  // 获取上个月月份
  const month = date.getMonth()
  const d = new Date(year, month, 0)
  return d.getDate()
}
export function toDayLimits (time) {
  // 当前时间天数
  const day = time.getDate()
  // 上个月天数
  const lasetMonthdays = mGetDate(time)
  return [day, day + lasetMonthdays - 1]
}
export function msToDate (time) {
  let datetime = new Date(time)
  let year = datetime.getFullYear()
  let month = datetime.getMonth()
  let date = datetime.getDate()
  let hour = datetime.getHours()
  let minute = datetime.getMinutes()
  let second = datetime.getSeconds()
  let result =
    year +
    '-' +
    (month + 1 >= 10 ? month + 1 : '0' + (month + 1)) +
    '-' +
    (date + 1 <= 10 ? '0' + date : date) +
    ' ' +
    (hour + 1 <= 10 ? '0' + hour : hour) +
    ':' +
    (minute + 1 <= 10 ? '0' + minute : minute) +
    ':' +
    (second + 1 <= 10 ? '0' + second : second)
  return result
}

// 比较eq()
var toString = Object.prototype.toString
function isFunction (obj) {
  return toString.call(obj) === '[object Function]'
}
export function eq (a, b, aStack, bStack) {
  // === 结果为 true 的区别出 +0 和 -0
  if (a === b) return a !== 0 || 1 / a === 1 / b

  // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
  if (a == null || b == null) return false

  // 判断 NaN
  // eslint-disable-next-line no-self-compare
  if (a !== a) return b !== b

  // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
  var type = typeof a
  if (type !== 'function' && type !== 'object' && typeof b !== 'object') return false

  // 更复杂的对象使用 deepEq 函数进行深度比较
  return deepEq(a, b, aStack, bStack)
};

function deepEq (a, b, aStack, bStack) {
  // a 和 b 的内部属性 [[class]] 相同时 返回 true
  var className = toString.call(a)
  if (className !== toString.call(b)) return false

  switch (className) {
    case '[object RegExp]':
    case '[object String]':
      return '' + a === '' + b
    case '[object Number]':
      // eslint-disable-next-line no-self-compare
      if (+a !== +a) return +b !== +b
      return +a === 0 ? 1 / +a === 1 / b : +a === +b
    case '[object Date]':
    case '[object Boolean]':
      return +a === +b
  }

  var areArrays = className === '[object Array]'
  // 不是数组
  if (!areArrays) {
    // 过滤掉两个函数的情况
    if (typeof a !== 'object' || typeof b !== 'object') return false

    var aCtor = a.constructor
    var bCtor = b.constructor
    // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
    if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
      return false
    }
  }

  aStack = aStack || []
  bStack = bStack || []
  var length = aStack.length

  // 检查是否有循环引用的部分
  while (length--) {
    if (aStack[length] === a) {
      return bStack[length] === b
    }
  }

  aStack.push(a)
  bStack.push(b)

  // 数组判断
  if (areArrays) {
    length = a.length
    if (length !== b.length) return false

    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack)) return false
    }
  } else {
  // 对象判断
    var keys = Object.keys(a)
    var key
    length = keys.length

    if (Object.keys(b).length !== length) return false
    while (length--) {
      key = keys[length]
      if (!(b.hasOwnProperty(key) && eq(a[key], b[key], aStack, bStack))) return false
    }
  }

  aStack.pop()
  bStack.pop()
  return true
}
