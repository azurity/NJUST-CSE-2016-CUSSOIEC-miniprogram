import { IMyApp } from '../../app'
const app = getApp<IMyApp>()
Page({
    data:{
        iconList: [{
            icon: 'emojifill',
            color: 'red',
            badge: 120,
            name: '考勤'
          }, {
            icon: 'writefill',
            color: 'mauve',
            badge: 1,
            name: '试题作业'
          }, {
            icon: 'selectionfill',
            color: 'cyan',
            badge: 0,
            name: '评教'
          }, {
            icon: 'circlefill',
            color: 'olive',
            badge: 22,
            name: '配套资源'
          }]

    },
    onLoad(){

    }



});
