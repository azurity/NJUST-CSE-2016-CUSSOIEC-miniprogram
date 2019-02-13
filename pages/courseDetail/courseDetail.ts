import { IMyApp } from '../../app'

interface CourseDetailQuery {
    courseID?: string
    name?: string
    teacher?: string
    location?: string
}

const app = getApp<IMyApp>()

Page({
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
        ],
        info: {},
        isLiving: true, //是否正在直播
        videoList: []
    },

    tapCourse() {},

    /**
     * 生命周期函数--监听页面加载，在此处做需要同步的初始化
     */
    onLoad(query?: CourseDetailQuery) {
        /*let obj = {
            courseID: 'qw123',
            active: [2, 3, 4],
            position: [
                {
                    dayOfWeek: 0,
                    indexOfDay: [0, 1, 2]
                }
            ],
            info: {
                name: '高等数学',
                teacher: '祖冲之',
                location: 'III-105'
            }
        }*/
        let videos = [
            {
                date: '2019-1-12',
                videos: [
                    {
                        videoID: 'v001',
                        name: '1.函数及其特性',
                        iswatch: false,
                        url: ''
                    }
                ]
            },
            {
                date: '2019-1-13',
                videos: [
                    {
                        videoID: 'v002',
                        name: '2.极限的概念、性质和运算法则',
                        iswatch: true,
                        url: ''
                    }
                ]
            },
            {
                date: '2019-1-14',
                videos: [
                    {
                        videoID: 'v003',
                        name: '3.两个重要极限',
                        iswatch: true,
                        url: ''
                    },
                    {
                        videoID: 'v004',
                        name: '4.极限存在准则',
                        iswatch: false,
                        url: ''
                    }
                ]
            },
            {
                date: '2019-1-15',
                videos: [
                    {
                        videoID: 'v005',
                        name: '5.无穷小量和无穷大量',
                        iswatch: false,
                        url: ''
                    }
                ]
            }
        ]
        this.setData({
            info: {
                courseID: 'qwe',
                name: '高等数学',
                teacher: '祖冲之',
                location: 'III-105'
            },
            videoList: videos
        })
        /*if (query === undefined 
            || query.courseID === undefined
            || query.name === undefined
            || query.teacher === undefined
            || query.location === undefined) {
            // TODO: 处理确实参数
        } else {
            this.init(query.courseID)
                .then(() => {
                    // TODO: 完成初始化后
                })
                .catch(() => {
                    // TODO: 初始化出错处理
                })
        }*/
    },

    async init(courseID: string) {
        // TODO: 加载课程详情页
    }
})
