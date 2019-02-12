import { IMyApp } from '../../app'

interface CourseDetailQuery {
    courseID?: string
}

const app = getApp<IMyApp>()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        iconList: [
            {
                icon: 'emojifill',
                color: 'red',
                badge: 120,
                name: '考勤'
            },
            {
                icon: 'writefill',
                color: 'mauve',
                badge: 1,
                name: '试题作业'
            },
            {
                icon: 'selectionfill',
                color: 'cyan',
                badge: 0,
                name: '评教'
            },
            {
                icon: 'circlefill',
                color: 'olive',
                badge: 22,
                name: '配套资源'
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载，在此处做需要同步的初始化
     */
    onLoad(query?: CourseDetailQuery) {
        if (query === undefined || query.courseID === undefined) {
            // TODO: 处理确实参数
        } else {
            this.init(query.courseID)
                .then(() => {
                    // TODO: 完成初始化后
                })
                .catch(() => {
                    // TODO: 初始化出错处理
                })
        }
    },
    async init(courseID: string) {
        // TODO: 加载课程详情页
    }
})
