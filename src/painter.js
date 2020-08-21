// 海报图
export function drawPoster(data) {
    return new Promise(function(resolve) {
        switch (data.type) {
            case 'pro':
                resolve(poster(data.item))
                break
            case 'base':
                resolve(drawBasePoster(data.item))
                break
            case 'image':
                resolve(drawImgPoster(data.item))
                break
            default:
                resolve(poster(data.item))
        }
    })
}

function poster(data) {
    return {
        width: '550px',
        height: '786px',
        background: '#f4f5f7',
        views: [
            {
                type: 'image',
                url: data.urlPoster,
                css: {
                    top: '0px',
                    left: '0px',
                    width: '550px',
                    height: '560px',
                },
            },
            {
                type: 'text',
                text: data.description+'加咖啡大范德萨范德萨范德萨范德萨范德萨范德萨范德萨发送范德萨',
                css: {
                    top: '580px',
                    left: '40px',
                    color: '#333333',
                    fontSize: '25px',
                    width: '280px',
                    lineHeight:'33px',
                    maxLines: 2
                },
            },
            {
                type: 'text',
                text: '' + data.price,
                css: {
                    top: '680px',
                    left: '70px',
                    color: '#FF5238',
                    fontSize: '45px',
                    fontWeight: 'bold',
                },
            },
            {
                type: 'text',
                text: '¥',
                css: {
                    top: '689px',
                    left: '40px',
                    color: '#FF5238',
                    fontSize: '36px',
                    textDecoration: 'line-through',
                },
            },
            {
              type: 'qrcode',
              content: data.url,
              css: {
                  bottom: '30px',
                  right: '40px',
                  color: '#000',
                  width: '170px',
                  height: '170px',
              },
          },
        ],
    }
}

function drawBasePoster(data) {
    return {
        width: '654px',
        height: '1000px',
        background: '#eee',
        views: [
            _textDecoration('overline', 0),
            _textDecoration('underline', 1),
            _textDecoration('line-through', 2),
            _textDecoration('overline underline line-through', 3, 'red'),
            {
                type: 'rect',
                css: {
                    width: '200px',
                    right: '20px',
                    top: '30px',
                    height: '100px',
                    borderRadius: '100px',
                    shadow: '10px 10px 5px #888888',
                    color: 'linear-gradient(-135deg, #fedcba 0%, rgba(18, 52, 86, 1) 20%, #987 80%)',
                },
            },
            {
                id: 'my-text-id',
                type: 'text',
                text: "fontWeight: 'bold'",
                css: [
                    {
                        top: `${startTop + 4 * gapSize}px`,
                        shadow: '10px 10px 5px #888888',
                        fontWeight: 'bold',
                    },
                    common,
                ],
            },
            {
                type: 'rect',
                css: {
                    width: '20px',
                    height: '20px',
                    color: 'red',
                    left: [`${startTop}px`, 'my-text-id'],
                    top: `${startTop + 4 * gapSize + 15}px`,
                },
            },
            {
                id: 'text-id-2',
                type: 'text',
                text: '我是把width设置为400px后，我就换行了xx行了',
                css: [
                    {
                        top: `${startTop + 5 * gapSize}px`,
                        align: 'center',
                        width: '400px',
                        background: '#538e60',
                        textAlign: 'center',
                        padding: '10px',
                    },
                    common,
                    { left: '300px' },
                ],
            },
            {
                type: 'rect',
                css: {
                    width: '20px',
                    height: '20px',
                    color: 'red',
                    left: '200px',
                    top: [`${startTop + 5 * gapSize}px`, 'text-id-2'],
                },
            },
            {
                type: 'text',
                text: '我设置了maxLines为1，看看会产生什么效果',
                css: [
                    {
                        top: `${startTop + 7 * gapSize}px`,
                        width: '500px',
                        maxLines: 1,
                    },
                    common,
                ],
            },
            _image(0),
            _des(0, '普通'),
            _image(1, 30),
            _des(1, 'rotate: 30'),
            _image(2, 30, '20px'),
            _des(2, 'borderRadius: 30px'),
            _image(3, 0, '60px'),
            _des(3, '圆形'),
            {
                type: 'image',
                url: require('./assets/images/avatar.png'),
                css: {
                    bottom: '40px',
                    left: '40px',
                    borderRadius: '50px',
                    borderWidth: '10px',
                    borderColor: 'yellow',
                    width: '100px',
                    height: '100px',
                },
            },
            {
                type: 'qrcode',
                content: 'https://github.com/sunniejs/vue_canvas_poster',
                css: {
                    bottom: '40px',
                    left: '180px',
                    color: 'red',
                    borderWidth: '10px',
                    borderColor: 'blue',
                    width: '120px',
                    height: '120px',
                },
            },
            {
                type: 'rect',
                css: {
                    bottom: '40px',
                    right: '40px',
                    color: 'radial-gradient(rgba(0, 0, 0, 0) 5%, #0ff 15%, #f0f 60%)',
                    borderRadius: '20px',
                    borderWidth: '10px',
                    width: '120px',
                    height: '120px',
                },
            },
            {
                type: 'text',
                text: 'borderWidth',
                css: {
                    bottom: '40px',
                    right: '200px',
                    color: 'green',
                    borderWidth: '2px',
                },
            },
        ],
    }
}
const startTop = 50
const startLeft = 20
const gapSize = 70
const common = {
    left: `${startLeft}px`,
    fontSize: '40px',
}

function _textDecoration(decoration, index, color) {
    return {
        type: 'text',
        text: decoration,
        css: [
            {
                top: `${startTop + index * gapSize}px`,
                color: color,
                textDecoration: decoration,
            },
            common,
        ],
    }
}

function _image(index, rotate, borderRadius) {
    return {
        type: 'image',
        url: require('./assets/images/avatar.png'),
        css: {
            top: `${startTop + 8.5 * gapSize}px`,
            left: `${startLeft + 160 * index}px`,
            width: '120px',
            height: '120px',
            shadow: '10px 10px 5px #888888',
            rotate: rotate,
            borderRadius: borderRadius,
        },
    }
}

function _des(index, content) {
    const des = {
        type: 'text',
        text: content,
        css: {
            fontSize: '22px',
            top: `${startTop + 8.5 * gapSize + 140}px`,
        },
    }
    if (index === 3) {
        des.css.right = '60px'
    } else {
        des.css.left = `${startLeft + 120 * index + 30}px`
    }
    return des
}

function drawImgPoster(data) {
    return {
        width: '654px',
        height: '1140px',
        background: '#eee',
        views: [
           {
                type: 'image',
                url: data.urlPoster,
                css: {
                    top: '150px',
                    left: '25px',
                    width: '332px',
                    height: '332px',
                },
            },
            {
                type: 'text',
                text: '未设置height、width时',
                css: {
                    right: '0px',
                    top: '60px',
                    fontSize: '30px',
                },
            },
            {
                type: 'image',
                url: require('./assets/images/avatar.png'),
                css: {
                    width: '200px',
                    height: '200px',
                    top: '430px',
                },
            },
            {
                type: 'text',
                text: "mode: 'aspectFill' 或 无",
                css: {
                    left: '210px',
                    fontSize: '30px',
                    top: '490px',
                },
            },
            {
                type: 'image',
                url: require('./assets/images/avatar.png'),
                css: {
                    width: '200px',
                    height: '200px',
                    mode: 'scaleToFill',
                    top: '650px',
                },
            },
            {
                type: 'text',
                text: "mode: 'scaleToFill'",
                css: {
                    left: '210px',
                    top: '710px',
                    fontSize: '30px',
                },
            },
            {
                type: 'image',
                url: require('./assets/images/avatar.png'),
                css: {
                    width: '200px',
                    height: 'auto',
                    top: '870px',
                },
            },
            {
                type: 'text',
                text: '设置height为auto',
                css: {
                    left: '210px',
                    top: '930px',
                    fontSize: '30px',
                },
            },
        ],
    }
}
