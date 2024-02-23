

export const push = (url, isMenu = false) => {
    if (isMenu) {
        uni.reLaunch({
            url,
            complete: res => {
                console.log('reLaunch', res);
            }
        })
        return
    }
    uni.navigateTo({
        url,
        complete: res => {
            console.log('push', res);
        }
    })
}

export const toast = (title, icon = "none") => {
    return new Promise((resolve, reject) => {
        uni.showToast({
            title,
            icon,
            duration: 2000,
            mask: true
        });
        setTimeout(() => {
            resolve(true)
        }, 2000)
    })
}


export const randomNum = (len) => {
    len = len || 6;
    var $chars = '0123456789';
    var maxPos = $chars.length;
    var res = '';
    for (var i = 0; i < len; i++) {
        res += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return res;
}
export const back = () => {
    uni.navigateBack({
        complete: res => {
            console.log(res);
        }
    })
}

export const delay = (time = 100) => {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            resolve(true);
            clearTimeout(timer);
        }, time);
    })
}
