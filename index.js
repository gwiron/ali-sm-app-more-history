/*
 * @Author: saohui 
 * @Date: 2017-10-14 09:39:36 
 * @Last Modified by:   saohui 
 * @Last Modified time: 2017-10-14 09:39:36 
 */
import util from './lib/util'

const app = getApp()
const history = app.globalData.history

function FactoryHistory ( pageObj ) {
    let isBack = true
    const ret = {
        ...pageObj
        ,onLoad ( query ) {
            if ( getCurrentPages().length == 5 ) {
                const router = '/'+ this.route +'?'+ util.flat( query )
                history.push( router )
            }
            pageObj.onLoad && pageObj.onLoad.bind( this )( query )
        }
        ,onHide () {
            // 底部切换 tab
            isBack = false
        }
        ,onUnload () {
            pageObj.onUnload && pageObj.onUnload.bind( this )()

            if ( !isBack ) {
                isBack = true
                return 
            }
            
            if ( getCurrentPages().length == 5 ) {
                return
            }

            history.pop()
            const router = history.pop()
            
            if ( router ) {
                my.navigateTo({
                    url: router
                })
            }
        }

        /*
         * 页面跳转使用 go
         * this.go( router )
         * @router => string, object
         *  string => '/page/index/index'
         *  object => {
         *      url: '/page/index/index'
         *  }
         */
        ,go ( router ) {
            isBack = false
            let ret = {}
            if ( typeof router == 'object' ) {
                ret = router
            } else if ( typeof router == 'string') {
                ret.url = router
            }

            if ( getCurrentPages().length == 5 ) {
                my.redirectTo( ret )
            } else {
                my.navigateTo( ret )
            }
        }
        /*
         * 重定向的时候使用
         */
        ,goRedirectTo ( router ) {
            if ( getCurrentPages().length == 5 ) {
                history.pop()
                this.go( router )
            }
        }

        /**
         * 在标签中使用
         * <view onTap="handleGo" data-url="/page/index/index" data-redirect="true"></view>
         */
        ,handleGo ( e ) {
            const { url, redirect } = e.currentTarget.dataset
            const router = url
            if ( redirect == 'true' ) {
                this.goRedirectTo( router )
            } else {
                this.go( router )
            }
        }
    }
    return ret
}
export default FactoryHistory