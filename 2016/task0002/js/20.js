/**
 *事件委托
 * @param {Object} e
 * @param {Object} ele
 * @param {Object} Fn
 */
function evtDelegate(e, ele, Fn) {
    var event = e || window.event,
        target = e.target || e.srcElement;
    if (target.tagName.toLowerCase() == ele) {
        Fn(target);
    }
}
/**
 *数组去重
 * @param {Array} arr要去重的的数组
 */
var unique = function(arr) {
    var h = {},
        r = []; // n为hash表，r为临时数组
    for (var i = 0, len = arr.length; i < len; i++) {
        // 如果hash表中没有当前项
        if (!h[arr[i]]) {
            // 存入hash表
            h[arr[i]] = true;
            // 把当前数组的当前项push到临时数组里面
            r.push(arr[i]);
        }
    }
    return r;
}
/**
 * 加入dom
 * @param {Object} parentNode父节点对象
 * @param {Object} childNode子节点对象
 * @param {Object} childClass需要附加子节点的class
 * @param {Object} content附加子节点的内容
 */
function addDom(parentNode, childNode, childClass, content) {
    //大于10时，先删除第一个
    childNode.length == 10 && parentNode.removeChild(childNode[0]);
    var newEle = document.createElement('span');
    newEle.setAttribute('class', childClass);
    newEle.innerHTML = content;
    parentNode.appendChild(newEle);
}
/**
 *事件委托做鼠标悬浮显示删除等
 * @param {Object} obj 父元素
 * @param {String} childTag 子元素标签
 */
function floatDelete(obj, childTag) {
    obj.onmouseover = function(e) {
        evtDelegate(e, childTag, function(target) {
            target.style.backgroundColor = "#CD4A48";
            target.innerHTML = "删除" + target.innerHTML;
        })
    }
    obj.onmouseout = function(e) {
        evtDelegate(e, childTag, function(target) {
            target.style.backgroundColor = "CornflowerBlue";
            target.innerHTML = target.innerHTML.replace("删除", '');
        })
    }
    obj.onclick = function(e) {
        evtDelegate(e, childTag, function(target) {
            target.remove();
        })
    }
}
/**
 *tag框中keyup执行事件
 * @param {Object} e event对象
 */
function tagIpHandler(e) {
    var tagRst = document.getElementById("tagRst"),
        cls = document.getElementsByClassName('tag-content'),
        current = e.target.value;
    var event = e || window.event,
        keyCode = event.keyCode || event.which;
    //32 188 13
    if (keyCode == 32 || keyCode == 188 || keyCode == 13) { //遇到用户输入空格，逗号，回车时
        var userData = current.split(/[\s,\r]/).filter(function(ele) {
            if (ele.length == 0 || ele == null) {
                return false;
            } else {
                return true;
            }
        });
        var afterUnique = unique(userData);
        if (afterUnique.length != 0 && afterUnique.length == userData.length) {
            addDom(tagRst, cls, "tag-content", afterUnique[afterUnique.length - 1]);
        }
    }
}
var interest = [];
/**
 *确认兴趣爱好handler
 */
function confirmInterest() {
    var interestRst = document.getElementById("interestRst"),
        childNode = document.getElementsByClassName('interest-content'),
        textaInput = document.getElementById("textaInput");
    var arr = textaInput.value.split(/\n|\s+|\,|\，|\、|\;|\；/).filter(function(ele) {
        if (ele.length == 0 || ele == null) {
            return false;
        } else {
            return true;
        }
    });
    interestRst.innerHTML = "";
    var finalArr = unique(interest.concat(arr));
    for (var i = 0; i < finalArr.length; i++) {
        addDom(interestRst, childNode, 'interest-content', arr[i]);
    }
}

function init() {
    var tagWrap = document.getElementById("tagRst"),
        btnInter = document.getElementById("confirm");
    floatDelete(tagWrap, 'span');
    tagIp.onkeyup = function(e) {
        tagIpHandler(e);
    }
    btnInter.onclick = confirmInterest;
}
init();