const $siteList = $('.siteList')
const $lastList = $siteList.find('li.last')
const net = localStorage.getItem('net')
const netObject = JSON.parse(net)
const hashMap = netObject || [
    {logo: 'https://github.com/favicon.ico', url: 'https://github.com'},
    {logo: 'https://www.bilibili.com/favicon.ico', url: 'https://www.bilibili.com'},
    {logo: 'https://bk.tw.lvfukeji.com/favicon.ico', url: 'https://bk.tw.lvfukeji.com'},
    {logo: 'https://www.zhihu.com/favicon.ico', url: 'https://www.zhihu.com'}
]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`
        <li>
            <div class="site">
                <div class="logo">
                    <img src=${node.logo} alt="">
                </div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($lastList)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

$('.addButton')
    .on('click', () => {
        let url = window.prompt('请输入要添加的网址')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        hashMap.push({
            logo: url + '/favicon.ico',
            url: url
        })
        render()
    })

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('net', string)
}