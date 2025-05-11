// IP地址：/^[0-9]+(\.[0-9]+){3}$/
console.log(/^[0-9]{1,3}(\.[0-9]+){3}$/.test("127.0.0.1"));

// 元字符太多

// 正则是匹配模式，要么匹配字符，要么匹配位置。

// 1. 第一章 正则表达式字符匹配攻略
// 1.1. 两种模糊匹配

// 横向模糊匹配：一个正则可匹配的字符串的长度不是固定的
// 纵向模糊匹配：一个正则匹配的字符串，具体到某一位字符时，它可以不是某个确定的字符，可以有多种可能

// 1.2. 字符组
// []就是一个字符组

// 1.2.1.范围表示法
// [0-9] -可以表示一个范围
// [-az] 或 [az-] 或 [a\-z]。

// 1.2.2.排除字符组
// [^0-9]排除性字符组,表示匹配一个未列出的字符，而不是不要匹配，所以下面输出false
console.log(/q[^u]/.test("aq"));

// 1.2.3.常见的简写形式
// \d 表示 [0-9]。表示是一位数字。 记忆方式：其英文是 digit（数字）。
// \D 表示 [^0-9]。表示除数字外的任意字符。
// \w 表示 [0-9a-zA-Z_]。表示数字、大小写字母和下划线。 记忆方式：w 是 word 的简写，也称单词字符。
// \W 表示 [^0-9a-zA-Z_]。非单词字符。
// \s 表示 [ \t\v\n\r\f]。表示空白符，包括空格、水平制表符、垂直制表符、换行符、回车符、换页 符。记忆方式：s 是 space 的首字母，空白符的单词是 white space。
// \S 表示 [^ \t\v\n\r\f]。 非空白符。
// . 表示 [^\n\r\u2028\u2029]。通配符，表示几乎任意字符。换行符、回车符、行分隔符和段分隔符除外。 记忆方式：想想省略号 … 中的每个点，都可以理解成占位符，表示任何类似的东西。

//  [\d\D]、[\w\W]、[\s\S] 和 [^] 中任何一个匹配任意字符

// 1.3. 量词，量词是贪婪的
// {m,} 表示至少出现 m 次。逗号后面不能有空格。
// {m} 等价于 {m,m}，表示出现 m 次。
// ? 等价于 {0,1}，表示出现或者不出现。记忆方式：问号的意思表示，有吗？
// + 等价于 {1,}，表示出现至少一次。 记忆方式：加号是追加的意思，得先有一个，然后才考虑追加。
// * 等价于 {0,}，表示出现任意次，有可能不出现。记忆方式：看看天上的星星，可能一颗没有，可能零散有几颗，可能数也数不过来。

// 1.3.2. 贪婪匹配与惰性匹配

var regex = /\d{2,5}/g;
var string = "123 1234 12345 123456";
console.log(string.match(regex));
// => ["123", "1234", "12345", "12345"]
// 其是贪婪的，它会尽可能多的匹配

var regex = /\d{2,5}?/g;
var string = "123 1234 12345 123456";
console.log(string.match(regex));
// => ["12", "12", "34", "12", "34", "12", "34", "56"]
// 惰性匹配，就是尽可能少的匹配

// 通过在量词后面加个问号就能实现惰性匹配，因此所有惰性匹配情形如下：
// 惰性量词 贪婪量词
// {m,n}?  {m,n}
// {m,}?   {m,}
// ??       ?
// +?       +
// *?       *

// 1.4. 多选分支

// 多选分支：支持多个子模式任选其一
// (p1|p2|p3)，其中 p1、p2 和 p3 是子模式，用 |（管道符）分隔，表示其中任何之一。
// 分支结构也是惰性的，即当前面的匹配上了，后面的就不再尝试了。
var regex = /good|goodbye/g;
var string = "goodbye";
console.log(string.match(regex));
// => ["good"]

// 匹配字符，就是字符组、量词和分支结构的组合使用罢了。

// 匹配十六进制颜色
var regex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g;
var string = "#ffbbad #Fc01DF #FFF #ffE";
console.log(string.match(regex));
// => ["#ffbbad", "#Fc01DF", "#FFF", "#ffE"]

// 匹配时间
var regex = /([01][0-9]|[2][0-3]):[0-5][0-9]/;
console.log(regex.test("23:59"));
console.log(regex.test("02:07"));

// 在 JavaScript 中，正则表达式对象有一个 lastIndex 属性，它记录了上一次匹配结束的位置。对于带有全局标志 g 的正则表达式（如 /regex/g），每次调用 test() 方法时，正则表达式的 lastIndex 会更新为下一次搜索的起始位置。这意味着，第二次调用 test() 时，正则表达式会从 lastIndex 所指的位置开始搜索，而不是从字符串的开头。
// 如果正则表达式在第二次调用时无法从 lastIndex 所指位置找到匹配，它将返回 false，即使字符串中有其他符合条件的部分。
// lastIndex 的存在和更新只对带有 g 或 y 标志的正则表达式对象有效
// test() 通常在使用 test() 方法时，如果你不希望正则表达式的 lastIndex 属性影响后续的匹配结果，也可以不使用 g 标志。
// exec()
// match() 一种是返回所有匹配的结果，另一种是在正则表达式包含捕获组时，返回捕获组的内容。
// 返回所有匹配的结果
// 当正则表达式不包含捕获组时，match方法返回一个数组，包含所有匹配的结果。如果使用了全局标志（g），返回的数组包括所有匹配的字符串；否则，只返回第一个匹配。
const text = "The quick brown fox jumps over the lazy dog";
regex = /\b\w+\b/; // 匹配每一个单词
const words = text.match(regex);
console.log(words);
// 返回捕获组内容
// 当正则表达式包含捕获组时，如果没有使用全局标志（g），match方法返回一个数组，包含第一个匹配的完整字符串及其所有捕获组。如果使用了全局标志（g），match方法仍然只返回匹配的字符串，不会返回捕获组的内容。在这种情况下，通常使用matchAll方法来获取捕获组内容。
const htmlContent = '<div id="header">Header Content</div>';
regex = /id="([^"]+)"/; // 捕获 id 属性的值
const match = htmlContent.match(regex);
console.log(match);
// 输出: ["id="header"", "header"]
// match[0] 是整个匹配 "id="header""
// match[1] 是捕获组的内容 "header"

var regex = /id=".*"/;
// 这样数量是贪婪的，会一直匹配到下一个引号
// 改成惰性
var regex = /id=".*?"/;
// 但是正则会有回溯，效率比较低。
var regex = /id="[^"]*"/;
regexp = /id=["']([^"']+)["']/;
// id= 匹配 id= 字符串。
// ["'] 匹配引号，可能是单引号或双引号。
// ([^"']+) 是一个捕获组，匹配引号内的所有字符，直到遇到另一个引号为止。
// ["'] 匹配闭合的引号。

// 2. 第二章 正则表达式位置匹配攻略
// 2.1. 什么是位置
// 位置（锚）是相邻字符之间的位置
// 共有6个锚：
// ^ 开头
// $ 结尾
var result = "hello".replace(/^|$/g, "#");
console.log(result);
// => "#hello#"

// 多行匹配模式（即有修饰符 m）时，二者是行的概念
var result = "I\nlove\njavascript".replace(/^|$/gm, "#");
console.log(result);
/*
#I#
#love#
#javascript#
*/

// \b 单词边界(数字字母下划线组成的)
// \B 非单词边界

var result = "[JS] Lesson_01.mp4".replace(/\b/g, "#");
console.log(result);
// => "[#JS#] #Lesson_01#.#mp4#"

// (?=p) 正向先行断言，其中 p 是一个子模式，即 p 前面的位置，或者说，该位置后面的字符要匹配 p。
var result = "hello".replace(/(?=l)/g, "#");
console.log(2222, result);
// => "he#l#lo"
var result = /(?=he)^^he(?=\w)llo$\b\b$/.test("hello");
console.log(result);

// 千位符号，注意$
var result = "112345678".replace(/(?!^)(?=(\d{3})+$)/g, ",");
console.log(result);
// => "12345,678"

var string = "12345678 123456789",
  regex = /(?!\b)(?=(\d{3})+\b)/g;
// (?!\b) 说的就是 \B /\B(?=(\d{3})+\b)/g
var result = string.replace(regex, ",");
console.log(result);
// => "12,345,678 123,456,789

function format(num) {
  // $ 是一个特殊字符，用于表示变量或替换的模式。因此，如果你想在字符串中显示一个普通的美元符号 $，需要用两个连续的 $ ($$) 来表示。
  return num
    .toFixed(2)
    .replace(/\B(?=(\d{3})+\b)/g, ",")
    .replace(/^/, "$$ ");
}
console.log(format(1888));

// (?!p) 负向先行断言

// 密码长度 6-12 位，由数字、小写字符和大写字母组成，但必须至少包括 2 种字符
var regex =
  /((?=.*[0-9])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z]))^[0-9A-Za-z]{6,12}$/;
// 反过来的写法
var regex =
  /(?!^[0-9]{6,12}$)(?!^[a-z]{6,12}$)(?!^[A-Z]{6,12}$)^[0-9A-Za-z]{6,12}$/;

// 写个正则不匹配任何东西
// /.^/此正则要求只有一个字符，但该字符后面是开头

// 3. 第三章 正则表达式括号的作用
// 3.1 分组和分支结构 (ab)+  (a|b)
// 3.1.1. 分组
// /a+/ 匹配连续出现的 "a"，而要匹配连续出现的 "ab" 时，需要使用 /(ab)+/
var regex = /(ab)+/g;
var string = "ababa abbb ababab";
console.log(string.match(regex));
// => ["abab", "ab", "ababab"]
// 3.1.2. 分支结构
var regex = /^I love (JavaScript|Regular Expression)$/;
console.log(regex.test("I love JavaScript"));
console.log(regex.test("I love Regular Expression"));

// 3.2. 分组引用
var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
console.log(regex.exec(string));

// 3.2.1. 提取数据
var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
console.log(string.match(regex));

console.log(regex.test(string)); // 正则操作即可，例如
console.log(regex.exec(string));

console.log(RegExp.$1); // "2017"
console.log(RegExp.$2); // "06"
console.log(RegExp.$3); // "12"
// 3.2.2. 替换
var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
var result = string.replace(regex, "$2/$3/$1");
console.log(result);

// 3.3. 反向引用,在正则本身里引用分组
var regex = /\d{4}(-|\/|\.)\d{2}(-|\/|\.)\d{2}/;
var string1 = "2017-06-12";
var string2 = "2017/06/12";
var string3 = "2017.06.12";
var string4 = "2016-06/12";
console.log(regex.test(string1)); // true
console.log(regex.test(string2)); // true
console.log(regex.test(string3)); // true
console.log(regex.test(string4)); // true

// 假设我们想要求分割符前后一致怎么办？此时需要使用反向引用
var regex = /\d{4}(-|\/|\.)\d{2}\1\d{2}/;
var string1 = "2017-06-12";
var string2 = "2017/06/12";
var string3 = "2017.06.12";
var string4 = "2016-06/12";
console.log(regex.test(string1)); // true
console.log(regex.test(string2)); // true
console.log(regex.test(string3)); // true
console.log(regex.test(string4)); // false

// 3.3.1. 括号嵌套怎么办？
// 括号嵌套以左括号（开括号）为准
var regex = /^((\d)(\d(\d)))\1\2\3\4$/;
var string = "1231231233";
console.log(regex.test(string)); // true
console.log(RegExp.$1); // 123
console.log(RegExp.$2); // 1
console.log(RegExp.$3); // 23
console.log(RegExp.$4); // 3

// 3.3.2. \10 表示什么呢？
// \10 是表示第 10 个分组
var regex = /(1)(2)(3)(4)(5)(6)(7)(8)(9)(#) \10+/;
var string = "123456789# ######";
console.log(regex.test(string));
// => true

// 3.3.3. 引用不存在的分组会怎样？
//  引用不存在的分组,正则不会报错，只是匹配反向引用的字符本身。
// 真要匹配 \1 和 0 的话，请使用 (?:\1)0 或者 \1(?:0)。

// 3.3.4. 分组后面有量词会怎样？
// 分组后面有量词的话，分组最终捕获到的数据是最后一次的匹配。
var regex = /(\d)+/;
var string = "12345";
console.log(string.match(regex));
// => ["12345", "5", index: 0, input: "12345"]
// 从上面看出，分组 (\d) 捕获的数据是 "5"。

// 同理对于反向引用，也是这样的。
var regex = /(\d)+ \1/;
console.log(regex.test("12345 1"));
// => false
console.log(regex.test("12345 5"));
// => true

// 3.4. 非捕获括号
// 之前文中出现的括号，都会捕获它们匹配到的数据，以便后续引用，因此也称它们是捕获型分组和捕获型分支。
// 如果只想要括号最原始的功能，但不会引用它，即，既不在 API 里引用，也不在正则里反向引用。此时可以使用非捕获括号 (?:p) 和 (?:p1|p2|p3)
var regex = /(?:ab)+/g;
var string = "ababa abbb ababab";
console.log(string.match(regex));
// => ["abab", "ab", "ababab"]

var regex = /^I love (?:JavaScript|Regular Expression)$/;
console.log(regex.test("I love JavaScript"));
console.log(regex.test("I love Regular Expression"));
// => true
// => true

// 正则表达式中?=、?!、?＜=、?＜!、?:的理解与应用举例
// https://www.jb51.net/program/3178780y8.htm
// 以下零宽度断言：
// (?=pattern)：正向先行断言，表示匹配位置后面必须紧跟着满足 pattern 的字符串，但不包括这个字符串在匹配结果中。
// (?!pattern)：负向先行断言，表示匹配位置后面不能紧跟着满足 pattern 的字符串，也不包括这个字符串在匹配结果中。
// (?<=pattern)：正向后行断言，表示匹配位置前面必须是满足 pattern 的字符串，但不包括这个字符串在匹配结果中。
// (?<!pattern)：负向后行断言，表示匹配位置前面不能是满足 pattern 的字符串，也不包括这个字符串在匹配结果中。

// (?:pattern)：非捕获型分组，表示将 pattern 包含在一个分组中，但不把这个分组的匹配结果保存到分组编号中。这个分组通常用于表示可选的或重复的子表达式，或者是限制量词的作用范围，而不需要把它们的匹配结果单独提取出来。

// /(?=.*[A-Z])[A-Za-z]{5,10}/
// 当(?=)前面没有内容，或者说(?=)被放在正则开头使用时，(?=)的作用就相当于检索全部内容是否符合它的要求，如果不符合也就没必要继续向后匹配了，这就很像if判断，只有当条件为true时，才能执行后面的内容。

// 姓名脱敏
console.log("李小龙".replace(/(?<=[\u4e00-\u9fa5])[\u4e00-\u9fa5]/g, "*"));
// 手机号脱敏
console.log("12345678909".replace(/(?<=\d{3})\d(?=\d{3})/g, "*"));

// 3.5. 相关案例
// 3.5.1. 字符串 trim 方法模拟
// 第一种，匹配到开头和结尾的空白符，然后替换成空字符，效率高
function trim(str) {
  return str.replace(/^\s+|\s+$/g, "");
}
console.log(trim(" foobar "));
// 第二种，匹配整个字符串，然后用引用来提取出相应的数据：
function trim(str) {
  return str.replace(/^\s*(.*?)\s*$/g, "$1");
}
console.log(trim(" foobar "));
// => "foobar"

// 3.5.2. 将每个单词的首字母转换为大写
function titleize(str) {
  return str.toLowerCase().replace(/(?:^|\s)\w/g, function (c) {
    return c.toUpperCase();
  });
}
console.log(titleize("my name is epeli"));
// => "My Name Is Epeli"

// 3.5.3. 驼峰化
function camelize(str) {
  return str.replace(/[-_\s]+(.)?/g, function (match, c) {
    return c ? c.toUpperCase() : "";
  });
}
console.log(camelize("-moz-transform"));
// => "MozTransform"
// 其中分组 (.) 表示首字母。单词的界定是，前面的字符可以是多个连字符、下划线以及空白符。正则后面的 ? 的目的，是为了应对 str 尾部的字符可能不是单词字符，比如 str 是 '-moz-transform '。

// 3.5.4. 中划线化
function dasherize(str) {
  return str
    .replace(/([A-Z])/g, "-$1")
    .replace(/[-_\s]+/g, "-")
    .toLowerCase();
}
console.log(dasherize("MozTransform"));
// => "-moz-transform"

// 3.5.5. HTML 转义和反转义
// 将HTML特殊字符转换成等值的实体
function escapeHTML(str) {
  var escapeChars = {
    "<": "lt",
    ">": "gt",
    '"': "quot",
    "&": "amp",
    "'": "#39",
  };
  return str.replace(
    new RegExp("[" + Object.keys(escapeChars).join("") + "]", "g"),
    function (match) {
      return "&" + escapeChars[match] + ";";
    }
  );
}
console.log(escapeHTML("<div>Blah blah blah</div>"));
// => "&lt;div&gt;Blah blah blah&lt;/div&gt";
// 实体字符转换为等值的HTML。
function unescapeHTML(str) {
  var htmlEntities = {
    nbsp: " ",
    lt: "<",
    gt: ">",
    quot: '"',
    amp: "&",
    apos: "'",
  };
  return str.replace(/\&([^;]+);/g, function (match, key) {
    if (key in htmlEntities) {
      return htmlEntities[key];
    }
    return match;
  });
}
console.log(unescapeHTML("&lt;div&gt;Blah blah blah&lt;/div&gt;"));
// => "<div>Blah blah blah</div>"

// 3.5.6. 匹配成对标签
// 匹配一个开标签，可以使用正则 <[^>]+>，
// 匹配一个闭标签，可以使用 <\/[^>]+>，
// 但是要求匹配成对标签，那就需要使用反向引用
var regex = /<([^>]+)>[\d\D]*<\/\1>/;
var string1 = "<title>regular expression</title>";
var string2 = "<p>laoyao bye bye</p>";
var string3 = "<title>wrong!</p>";
console.log(regex.test(string1)); // true
console.log(regex.test(string2)); // true
console.log(regex.test(string3)); // false

// 第四章 正则表达式回溯法原理
// 4.1. 没有回溯的匹配
// 4.2. 有回溯的匹配
// 4.3. 常见的回溯形式
// 回溯法也称试探法，它的基本思想是：从问题的某一种状态（初始状态）出发，搜索从这种状态出发
// 所能达到的所有“状态”，当一条路走到“尽头”的时候（不能再前进），再后退一步或若干步，从
// 另一种可能“状态”出发，继续搜索，直到所有的“路径”（状态）都试探过。这种不断“前进”、 不断“回溯”寻找解的方法，就称作“回溯法”。

// 4.3.1 贪婪量词

// 如果当多个贪婪量词挨着存在，并相互有冲突时,先下手为强
var string = "12345";
var regex = /(\d{1,3})(\d{1,3})/;
console.log(string.match(regex));
// => ["12345", "123", "45", index: 0, input: "12345"]
// 4.3.2 惰性量词
var string = "12345";
var regex = /(\d{1,3}?)(\d{1,3})/;
console.log(string.match(regex));
// => ["1234", "1", "234", index: 0, input: "12345"]
// 虽然惰性量词不贪，但也会有回溯的现象。
var string = "12345";
var regex = /^\d{1,3}?\d{1,3}$/;
console.log(string.match(regex));
// => ["1234", "1", "234", index: 0, input: "12345"]
// 知道你不贪、很知足，但是为了整体匹配成，没办法，也只能给你多塞点了。因此最后 \d{1,3}? 匹配的字 符是 "12"，是两个数字，而不是一个。

// 4.3.3 分支结构
// 我们知道分支也是惰性的，比如 /can|candy/，去匹配字符串 "candy"，得到的结果是 "can"，因为分支会一个一个尝试，如果前面的满足了，后面就不会再试验了。
// 分支结构，可能前面的子模式会形成了局部匹配，如果接下来表达式整体不匹配时，仍会继续尝试剩下的分支。这种尝试也可以看成一种回溯。
regex = /^(?:can|candy)$/;
string = "candy";

// 贪婪量词“试”的策略是：买衣服砍价。价钱太高了，便宜点，不行，再便宜点。
// 惰性量词“试”的策略是：卖东西加价。给少了，再多给点行不，还有点少啊，再给点。
// 分支结构“试”的策略是：货比三家。这家不行，换一家吧，还不行，再换。

// 既然有回溯的过程，那么匹配效率肯定低一些。相对谁呢？相对那些 DFA 引擎, DFA 是“确定型有限自动机”的简写。
// 而 JavaScript 的正则引擎是 NFA，NFA 是“非确定型有限自动机”的简写。
// 回溯别看我匹配慢，但是我编译快啊

// 第五章 正则表达式的拆分
// 5.1. 结构和操作符
// 字符字面量、字符组、量词、锚、分组、选择分支、反向引用。

// 5.2. 注意要点
// 5.2.1 匹配字符串整体问题
// 5.2.2 量词连缀问题
// 5.2.3 元字符转义问题
// 元字符：^、$、.、*、+、?、|、\、/、(、)、[、]、{、}、=、!、:、-、,
// 不是每个字符都需要转义：跟字符组相关的元字符有 [、]、^、-
var string = "^$.*+?|\\/[]{}=!:-,";
var regex = /[\^$.*+?|\\/\[\]{}=!:\-,]/g;
console.log(string.match(regex));
// => ["^", "$", ".", "*", "+", "?", "|", "\", "/", "[", "]", "{", "}", "=", "!", ":", "-", ","]

// 5.2.3.2. 匹配 "[abc]" 和 "{3,5}"
// [abc]，是个字符组。如果要匹配字符串 "[abc]" 时，可以写成 /\[abc\]/，也可以写成 /\[abc]/

// 第六章 正则表达式的构建
// 6.1. 平衡法则
// 匹配预期的字符串 不匹配非预期的字符串
// 可读性和可维护性
// 效率

// 如果构建正则的过程中，出现空字符匹配，如下，可以改成陈列所有可能
// /^[+-]?(\d+)?(\.\d+)?$/
// /^[+-]?(\d+\.\d+|\d+|\.\d+)$/

// 6.4. 效率
// 正则表达式的运行过程
// 1. 编译；
// 2. 设定起始位置；
// 3. 尝试匹配；
// 4. 匹配失败的话，从下一位开始继续第 3 步；
// 5. 最终结果：匹配成功或失败。
var regex = /\d+/g;
console.log(regex.lastIndex, regex.exec("123abc34def"));
console.log(regex.lastIndex, regex.exec("123abc34def"));
console.log(regex.lastIndex, regex.exec("123abc34def"));
console.log(regex.lastIndex, regex.exec("123abc34def"));
// => 0 ["123", index: 0, input: "123abc34def"]
// => 3 ["34", index: 6, input: "123abc34def"]
// => 8 null
// => 0 ["123", index: 0, input: "123abc34def"]

// 6.4.1. 使用具体型字符组来代替通配符，来消除回溯
// 此时要使用具体化的字符组，来代替通配符.，以便消除不必要的字符，此时使用正则 /"[^"]*"/，即可。
// 6.4.2. 使用非捕获型分组
// 因为括号的作用之一是，可以捕获分组和分支里的数据。那么就需要内存来保存它们。
// 当我们不需要使用分组引用和反向引用时，此时可以使用非捕获分组。
// 例如，/^[-]?(\d\.\d+|\d+|\.\d+)$/ 可以修改成：/^[-]?(?:\d\.\d+|\d+|\.\d+)$/。
// 6.4.3. 独立出确定字符
// 例如，/a+/ 可以修改成 /aa*/。 因为后者能比前者多确定了字符 "a"。这样会在第四步中，加快判断是否匹配失败，进而加快移位的速度。
// 6.4.4. 提取分支公共部分
// 比如，/^abc|^def/ 修改成 /^(?:abc|def)/。 又比如， /this|that/修改成 /th(?:is|at)/。 这样做，可以减少匹配过程中可消除的重复。
// 6.4.5. 减少分支的数量，缩小它们的范围
// /red|read/ 可以修改成 /rea?d/。
// 此时分支和量词产生的回溯的成本是不一样的。但这样优化后，可读性会降低的。

// 第七章 正则表达式编程
// test、exec、match、search、split、replace
// search() 方法返回第一个匹配项的索引
// 7.1. 正则表达式的四种操作
// 验证、切分、提取、替换。
// 7.1.1. 验证，最常用test
var regex = /\d/;
var string = "abc123";
console.log(!!~string.search(regex));
// => true
var regex = /\d/;
var string = "abc123";
console.log(regex.test(string));
// => true
var regex = /\d/;
var string = "abc123";
console.log(!!string.match(regex));
// => true
var regex = /\d/;
var string = "abc123";
console.log(!!regex.exec(string));
// => true

// 7.1.2. 切分
var regex = /,/;
var string = "html,css,javascript";
console.log(string.split(regex));
// => ["html", "css", "javascript"]

var regex = /\D/;
console.log("2017/06/26".split(regex));
console.log("2017.06.26".split(regex));
console.log("2017-06-26".split(regex));
// => ["2017", "06", "26"]
// => ["2017", "06", "26"]
// => ["2017", "06", "26"]

// 7.1.3. 提取 最常用match
var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
var string = "2017-06-26";
console.log(string.match(regex));
// =>["2017-06-26", "2017", "06", "26", index: 0, input: "2017-06-26"]

var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
var string = "2017-06-26";
console.log(regex.exec(string));
// =>["2017-06-26", "2017", "06", "26", index: 0, input: "2017-06-26"]

var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
var string = "2017-06-26";
regex.test(string);
console.log(RegExp.$1, RegExp.$2, RegExp.$3);
// => "2017" "06" "26"

var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
var string = "2017-06-26";
string.search(regex);
console.log(RegExp.$1, RegExp.$2, RegExp.$3);
// => "2017" "06" "26

var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
var string = "2017-06-26";
var date = [];
string.replace(regex, function (match, year, month, day) {
  date.push(year, month, day);
});
console.log(date);
// => ["2017", "06", "26"]

// 7.1.4. 替换
var string = "2017-06-26";
var today = new Date(string.replace(/-/g, "/"));
console.log(today);
// => Mon Jun 26 2017 00:00:00 GMT+0800 (中国标准时间)

// 7.2.1. search 和 match 的参数问题
// search 和 match，会把字符串转换为正则的。
var string = "2017.06.27";
console.log(string.search("."));
// => 0
//需要修改成下列形式之一
console.log(string.search("\\."));
console.log(string.search(/\./));
// => 4
// => 4
console.log(string.match("."));
// => ["2", index: 0, input: "2017.06.27"]
//需要修改成下列形式之一
console.log(string.match("\\."));
console.log(string.match(/\./));
// => [".", index: 4, input: "2017.06.27"]
// => [".", index: 4, input: "2017.06.27"]
console.log(string.split("."));
// => ["2017", "06", "27"]
console.log(string.replace(".", "/"));
// => "2017/06.27"

// 7.2.2. match 返回结果的格式问题
// match 返回结果的格式，与正则对象是否有修饰符 g 有关。
var string = "2017.06.27";
var regex1 = /\b(\d+)\b/;
var regex2 = /\b(\d+)\b/g;
console.log(string.match(regex1));
console.log(string.match(regex2));
// => ["2017", "2017", index: 0, input: "2017.06.27"]
// => ["2017", "06", "27"]
// 没有 g，返回的是标准匹配格式，即，数组的第一个元素是整体匹配的内容，接下来是分组捕获的内容，然
// 后是整体匹配的第一个下标，最后是输入的目标字符串。
// 有 g，返回的是所有匹配的内容。
// 当没有匹配时，不管有无 g，都返回 null。

// 7.2.3. exec 比 match 更强大
// 当正则没有 g 时，使用 match 返回的信息比较多。但是有 g 后，就没有关键的信息 index 了。
// 而 exec 方法就能解决这个问题，它能接着上一次匹配后继续匹配：
var string = "2017.06.27";
var regex2 = /\b(\d+)\b/g;
console.log(regex2.exec(string));
console.log(regex2.lastIndex);
console.log(regex2.exec(string));
console.log(regex2.lastIndex);
console.log(regex2.exec(string));
console.log(regex2.lastIndex);
console.log(regex2.exec(string));
console.log(regex2.lastIndex);
// => ["2017", "2017", index: 0, input: "2017.06.27"]
// => 4
// => ["06", "06", index: 5, input: "2017.06.27"]
// => 7
// => ["27", "27", index: 8, input: "2017.06.27"]
// => 10
// => null
// => 0
// 其中正则实例 lastIndex 属性，表示下一次匹配开始的位置。
// 比如第一次匹配了 "2017"，开始下标是 0，共 4 个字符，因此这次匹配结束的位置是 3，下一次开始匹配的位置是 4

// 配合while，没有修饰符g的话，会死循环
var string = "2017.06.27";
var regex2 = /\b(\d+)\b/g;
var result;
while ((result = regex2.exec(string))) {
  console.log(result, regex2.lastIndex);
}
// => ["2017", "2017", index: 0, input: "2017.06.27"] 4
// => ["06", "06", index: 5, input: "2017.06.27"] 7
// => ["27", "27", index: 8, input: "2017.06.27"] 10

// 7.2.4. 修饰符 g，对 exec 和 test 的影响
// 正则实例的两个方法exec、test，当正则是全局匹配时，每一次匹配完成后，都会修改lastIndex。
var regex = /a/g;
console.log(regex.test("a"), regex.lastIndex);
console.log(regex.test("aba"), regex.lastIndex);
console.log(regex.test("ababc"), regex.lastIndex);
// => true 1
// => true 3
// => false 0
// 如果没有 g，自然都是从字符串第 0 个字符处开始尝试匹配

// 7.2.5. test 整体匹配时需要使用 ^ 和 $
// 7.2.6. split 相关注意事项
// 第一，它可以有第二个参数，表示结果数组的最大长度
var string = "html,css,javascript";
console.log(string.split(/,/, 2));
// =>["html", "css"]
// 第二，正则使用分组时，结果数组中是包含分隔符的：
var string = "html,css,javascript";
console.log(string.split(/(,)/));
// =>["html", ",", "css", ",", "javascript"]
// 7.2.7. replace 是很强大的
// $_ 目标字符串
// $& 匹配到的子串文本
// $+ 捕获的文本
// $` 匹配到的子串的左边文本
// $' 匹配到的子串的右边文本
// $$ 美元符号
var result = "2,3,5".replace(/(\d+),(\d+),(\d+)/, "$3=$1+$2");
console.log(result);
// => "5=2+3"

var result = "2,3,5".replace(/(\d+)/g, "$&$&$&");
console.log(result);
// => "222,333,555"

var result = "2+3=5".replace(/=/, "$&$`$&$'$&");
console.log(result);
// => "2+3=2+3=5=5"
// 要把 "2+3=5"，变成 "2+3=2+3=5=5"，其实就是想办法把 = 替换成=2+3=5=，其中，$& 匹配的是 =， $` 匹配的是 2+3，$' 匹配的是 5。因此使用 "$&$`$&$'$&" 便达成了目的。

"1234 2345 3456".replace(
  /(\d)\d{2}(\d)/g,
  function (match, $1, $2, index, input) {
    console.log([match, $1, $2, index, input]);
  }
);
// => ["1234", "1", "4", 0, "1234 2345 3456"]
// => ["2345", "2", "5", 5, "1234 2345 3456"]
// => ["3456", "3", "6", 10, "1234 2345 3456"]

// 7.2.10 属性
// global、ingnoreCase、multiline、lastIndex、source
// 在构建动态的正则表达式时，可以通过source属性，来确认构建出的正则到底是什么

// 7.2.11. 构造函数属性
// 除了$1,…,$9 之外
// RegExp.input 最近一次目标字符串 RegExp["$_"]
// RegExp.lastMatch 最近一次匹配的文本 RegExp["$&"]
// RegExp.lastParen 最近一次捕获的文本 RegExp["$+"]
// RegExp.leftContext 目标字符串中lastMatch之前的文本 RegExp["$`"]
// RegExp.rightContext 目标字符串中lastMatch之后的文本

var regex = /([abc])(\d)/g;
var string = "a1b2c3d4e5";
string.match(regex);
console.log(RegExp.input);
console.log(RegExp["$_"]);
// => "a1b2c3d4e5"
console.log(RegExp.lastMatch);
console.log(RegExp["$&"]);
// => "c3"
console.log(RegExp.lastParen);
console.log(RegExp["$+"]);
// => "3"
console.log(RegExp.leftContext);
console.log(RegExp["$`"]);
// => "a1b2"
console.log(RegExp.rightContext);
console.log(RegExp["$'"]);
// => "d4e5"

function compress(source) {
  var keys = {};
  source.replace(/([^=&]+)=([^&]*)/g, function (full, key, value) {
    keys[key] = (keys[key] ? keys[key] + "," : "") + value;
  });
  var result = [];
  for (var key in keys) {
    result.push(key + "=" + keys[key]);
  }
  return result.join("&");
}
console.log(compress("a=1&b=2&a=3&b=4"));
// => "a=1,3&b=2,4"

// 修饰符
// g
// i
// m
// s
// u
// y
